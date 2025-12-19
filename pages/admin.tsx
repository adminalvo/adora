'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabaseClient';
import { Product } from '@/types';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'messages' | 'orders' | 'categories'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
    stock: '',
    is_active: true,
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, activeTab]);

  const loadData = async () => {
    try {
      const supabase = createClient();
      
      if (activeTab === 'products') {
        const { data: productsData, error: productsError } = await (supabase
          .from('products') as any)
          .select('*')
          .order('created_at', { ascending: false });

        if (productsError) throw productsError;
        setProducts((productsData || []) as Product[]);

        const { data: categoriesData, error: categoriesError } = await (supabase
          .from('categories') as any)
          .select('*')
          .order('name');

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
      } else {
        const { data: messagesData, error: messagesError } = await (supabase
          .from('contact_messages') as any)
          .select('*')
          .order('created_at', { ascending: false });

        if (messagesError) throw messagesError;
        setMessages((messagesData || []) as ContactMessage[]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const supabase = createClient();
      
      const productData = {
        name: productForm.name,
        description: productForm.description || null,
        price: parseFloat(productForm.price),
        image_url: productForm.image_url || null,
        category_id: productForm.category_id || null,
        stock: parseInt(productForm.stock) || 0,
        is_active: productForm.is_active,
      };

      if (editingProduct) {
        const { error } = await (supabase
          .from('products') as any)
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
      } else {
        const { error } = await (supabase
          .from('products') as any)
          .insert(productData);

        if (error) throw error;
      }

      setShowProductModal(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category_id: '',
        stock: '',
        is_active: true,
      });
      loadData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Məhsul saxlanarkən xəta baş verdi');
    }
  };

  const handleDeleteProduct = async (id: string | number) => {
    if (!confirm('Bu məhsulu silmək istədiyinizə əminsiniz?')) return;

    try {
      const supabase = createClient();
      const { error } = await (supabase
        .from('products') as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Məhsul silinərkən xəta baş verdi');
    }
  };

  const handleMarkMessageRead = async (id: string, isRead: boolean) => {
    try {
      const supabase = createClient();
      const table = (supabase.from('contact_messages') as any);
      const { error } = await table.update({ is_read: !isRead }).eq('id', id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Bu mesajı silmək istədiyinizə əminsiniz?')) return;

    try {
      const supabase = createClient();
      const { error } = await (supabase
        .from('contact_messages') as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Yüklənir...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Admin Paneli</h1>
              <p className="text-yellow-100 mt-1">Məhsulları və mesajları idarə edin</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'products'
                      ? 'text-yellow-600 border-b-2 border-yellow-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Məhsullar
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'categories'
                      ? 'text-yellow-600 border-b-2 border-yellow-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Kateqoriyalar
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'orders'
                      ? 'text-yellow-600 border-b-2 border-yellow-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sifarişlər
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`px-6 py-4 font-medium text-sm transition-colors relative whitespace-nowrap ${
                    activeTab === 'messages'
                      ? 'text-yellow-600 border-b-2 border-yellow-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mesajlar
                  {unreadCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'products' ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Məhsullar</h2>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setProductForm({
                          name: '',
                          description: '',
                          price: '',
                          image_url: '',
                          category_id: '',
                          stock: '',
                          is_active: true,
                        });
                        setShowProductModal(true);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Yeni Məhsul</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Məhsul</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qiymət</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Əməliyyatlar</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {(product.image || product.image_url) && (
                                  <img className="h-10 w-10 rounded-lg object-cover mr-3" src={product.image || product.image_url || ''} alt={product.name} />
                                )}
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  {product.description && (
                                    <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price} ₼</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {product.stock > 0 ? 'Aktiv' : 'Stokda yox'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => {
                                  setEditingProduct(product);
                                  setProductForm({
                                    name: product.name,
                                    description: product.description || '',
                                    price: product.price.toString(),
                                    image_url: product.image || product.image_url || '',
                                    category_id: product.category_id || '',
                                    stock: product.stock.toString(),
                                    is_active: product.is_active ?? (product.stock > 0),
                                  });
                                  setShowProductModal(true);
                                }}
                                className="text-yellow-600 hover:text-yellow-900 mr-4"
                              >
                                Düzəlt
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Sil
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : activeTab === 'orders' ? (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sifarişlər</h2>
                  
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6 bg-white">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">Sifariş #{order.order_number}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {order.status === 'pending' ? 'Gözləyir' :
                                 order.status === 'processing' ? 'Hazırlanır' :
                                 order.status === 'shipped' ? 'Göndərildi' :
                                 order.status === 'delivered' ? 'Çatdırıldı' :
                                 'Ləğv edildi'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600"><strong>Müştəri:</strong> {order.full_name}</p>
                            <p className="text-sm text-gray-600"><strong>Email:</strong> {order.email}</p>
                            <p className="text-sm text-gray-600"><strong>Telefon:</strong> {order.phone}</p>
                            <p className="text-sm text-gray-600"><strong>Ünvan:</strong> {order.address}, {order.city}</p>
                            <p className="text-sm text-gray-600"><strong>Ödəniş:</strong> {order.payment_method === 'cash' ? 'Nəğd' : 'Kart'}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(order.created_at).toLocaleString('az-AZ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-yellow-600 mb-2">{parseFloat(order.total_amount).toFixed(2)} ₼</p>
                            <select
                              value={order.status}
                              onChange={async (e) => {
                                try {
                                  const supabase = createClient();
                                  const { error } = await (supabase
                                    .from('orders') as any)
                                    .update({ status: e.target.value })
                                    .eq('id', order.id);
                                  if (error) throw error;
                                  loadData();
                                } catch (error) {
                                  console.error('Error updating order status:', error);
                                }
                              }}
                              className="px-3 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="pending">Gözləyir</option>
                              <option value="processing">Hazırlanır</option>
                              <option value="shipped">Göndərildi</option>
                              <option value="delivered">Çatdırıldı</option>
                              <option value="cancelled">Ləğv edildi</option>
                            </select>
                          </div>
                        </div>
                        {order.order_items && order.order_items.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">Məhsullar:</h4>
                            <div className="space-y-2">
                              {order.order_items.map((item: any) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                  <span>{item.product_name} x {item.quantity}</span>
                                  <span>{parseFloat(item.subtotal).toFixed(2)} ₼</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {orders.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        Hələ sifariş yoxdur
                      </div>
                    )}
                  </div>
                </div>
              ) : activeTab === 'categories' ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Kateqoriyalar</h2>
                    <button
                      onClick={() => {
                        setEditingCategory(null);
                        setCategoryForm({
                          name: '',
                          slug: '',
                          description: '',
                          image_url: '',
                        });
                        setShowCategoryModal(true);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Yeni Kateqoriya</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <div key={category.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                        {category.description && (
                          <p className="text-gray-600 mb-4">{category.description}</p>
                        )}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingCategory(category);
                              setCategoryForm({
                                name: category.name,
                                slug: category.slug,
                                description: category.description || '',
                                image_url: category.image_url || '',
                              });
                              setShowCategoryModal(true);
                            }}
                            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
                          >
                            Düzəlt
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm('Bu kateqoriyanı silmək istədiyinizə əminsiniz?')) return;
                              try {
                                const supabase = createClient();
                                const { error } = await (supabase
                                  .from('categories') as any)
                                  .delete()
                                  .eq('id', category.id);
                                if (error) throw error;
                                loadData();
                              } catch (error) {
                                console.error('Error deleting category:', error);
                                alert('Kateqoriya silinərkən xəta baş verdi');
                              }
                            }}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {categories.length === 0 && (
                      <div className="col-span-full text-center py-12 text-gray-500">
                        Hələ kateqoriya yoxdur
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">İletişim Mesajları</h2>
                  
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`border rounded-lg p-6 ${!message.is_read ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'}`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                              {!message.is_read && (
                                <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">Yeni</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{message.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(message.created_at).toLocaleString('az-AZ')}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleMarkMessageRead(message.id, message.is_read)}
                              className={`px-3 py-1 rounded text-sm ${
                                message.is_read
                                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                  : 'bg-green-200 text-green-700 hover:bg-green-300'
                              }`}
                            >
                              {message.is_read ? 'Oxunmamış kimi işarələ' : 'Oxundu'}
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              className="px-3 py-1 bg-red-200 text-red-700 rounded text-sm hover:bg-red-300"
                            >
                              Sil
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </div>
                    ))}
                    
                    {messages.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        Hələ mesaj yoxdur
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? 'Məhsulu Düzəlt' : 'Yeni Məhsul'}
                </h3>
                <button
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleProductSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Məhsul Adı</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Təsvir</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qiymət (₼)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stok</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Şəkil URL</label>
                <input
                  type="url"
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya</label>
                <select
                  value={productForm.category_id}
                  onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="">Kateqoriya seçin</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={productForm.is_active}
                  onChange={(e) => setProductForm({ ...productForm, is_active: e.target.checked })}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">Aktiv</label>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors"
                >
                  {editingProduct ? 'Yadda saxla' : 'Əlavə et'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingCategory ? 'Kateqoriyanı Düzəlt' : 'Yeni Kateqoriya'}
                </h3>
                <button
                  onClick={() => {
                    setShowCategoryModal(false);
                    setEditingCategory(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const supabase = createClient();
                const categoryData = {
                  name: categoryForm.name,
                  slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-'),
                  description: categoryForm.description || null,
                  image_url: categoryForm.image_url || null,
                };

                if (editingCategory) {
                  const { error } = await (supabase
                    .from('categories') as any)
                    .update(categoryData)
                    .eq('id', editingCategory.id);
                  if (error) throw error;
                } else {
                  const { error } = await (supabase.from('categories') as any).insert(categoryData);
                  if (error) throw error;
                }

                setShowCategoryModal(false);
                setEditingCategory(null);
                setCategoryForm({
                  name: '',
                  slug: '',
                  description: '',
                  image_url: '',
                });
                loadData();
              } catch (error) {
                console.error('Error saving category:', error);
                alert('Kateqoriya saxlanarkən xəta baş verdi');
              }
            }} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya Adı</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="avtomatik yaradılacaq"
                />
                <p className="text-xs text-gray-500 mt-1">Boş buraxsanız, ad əsasında avtomatik yaradılacaq</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Təsvir</label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Şəkil URL</label>
                <input
                  type="url"
                  value={categoryForm.image_url}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryModal(false);
                    setEditingCategory(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-colors"
                >
                  {editingCategory ? 'Yadda saxla' : 'Əlavə et'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
