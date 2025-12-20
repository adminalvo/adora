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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'messages' | 'orders' | 'categories'>('dashboard');
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

  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalMessages: 0,
    unreadMessages: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!authLoading) {
      // Check if admin password is set in sessionStorage
      const adminAuth = sessionStorage.getItem('admin_auth');
      if (adminAuth === '202505') {
        setIsAdmin(true);
      } else {
        setShowPasswordModal(true);
      }
    }
  }, [authLoading]);

  const handleAdminLogin = () => {
    if (adminPassword === '202505') {
      sessionStorage.setItem('admin_auth', '202505');
      setIsAdmin(true);
      setShowPasswordModal(false);
      setAdminPassword('');
    } else {
      alert('Yanlış şifrə');
    }
  };

  if (showPasswordModal) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-4">
            <div className="bg-white rounded-lg shadow-xl border border-black p-8">
              <h2 className="text-2xl font-bold text-black mb-6 text-center">Admin Girişi</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Şifrə</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                    className="w-full px-4 py-3 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Admin şifrəsi"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleAdminLogin}
                  className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Giriş Et
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="w-full border border-black text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Geri
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAdmin) {
    return null;
  }

  useEffect(() => {
    if (user && isAdmin) {
      loadData();
      loadStats();
    }
  }, [user, activeTab, isAdmin]);

  const loadStats = async () => {
    try {
      const supabase = createClient();
      
      // Total products
      const { count: productsCount } = await (supabase
        .from('products') as any)
        .select('*', { count: 'exact', head: true });

      // Total orders
      const { count: ordersCount } = await (supabase
        .from('orders') as any)
        .select('*', { count: 'exact', head: true });

      // Total messages
      const { count: messagesCount } = await (supabase
        .from('contact_messages') as any)
        .select('*', { count: 'exact', head: true });

      // Unread messages
      const { count: unreadCount } = await (supabase
        .from('contact_messages') as any)
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);

      // Pending orders
      const { count: pendingCount } = await (supabase
        .from('orders') as any)
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Total revenue (delivered orders)
      const { data: revenueData } = await (supabase
        .from('orders') as any)
        .select('total_amount')
        .eq('status', 'delivered');

      const totalRevenue = revenueData?.reduce((sum: number, order: any) => 
        sum + parseFloat(order.total_amount || 0), 0) || 0;

      setStats({
        totalProducts: productsCount || 0,
        totalOrders: ordersCount || 0,
        totalMessages: messagesCount || 0,
        unreadMessages: unreadCount || 0,
        pendingOrders: pendingCount || 0,
        totalRevenue,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      
      if (activeTab === 'products') {
        let productsQuery = (supabase
          .from('products') as any)
          .select('*')
          .order('created_at', { ascending: false });

        if (searchQuery) {
          productsQuery = productsQuery.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
        }

        const { data: productsData, error: productsError } = await productsQuery;

        if (productsError) throw productsError;
        setProducts((productsData || []) as Product[]);

        const { data: categoriesData, error: categoriesError } = await (supabase
          .from('categories') as any)
          .select('*')
          .order('name');

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
      } else if (activeTab === 'orders') {
        let query = (supabase
          .from('orders') as any)
          .select('*, order_items(*)')
          .order('created_at', { ascending: false });

        if (statusFilter !== 'all') {
          query = query.eq('status', statusFilter);
        }

        if (searchQuery) {
          query = query.or(`order_number.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
        }

        const { data: ordersData, error: ordersError } = await query;

        if (ordersError) throw ordersError;
        setOrders(ordersData || []);
      } else if (activeTab === 'categories') {
        const { data: categoriesData, error: categoriesError } = await (supabase
          .from('categories') as any)
          .select('*')
          .order('name');

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
      } else if (activeTab === 'messages') {
        let query = (supabase
          .from('contact_messages') as any)
          .select('*')
          .order('created_at', { ascending: false });

        if (searchQuery) {
          query = query.or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,message.ilike.%${searchQuery}%`);
        }

        if (statusFilter === 'unread') {
          query = query.eq('is_read', false);
        } else if (statusFilter === 'read') {
          query = query.eq('is_read', true);
        }

        const { data: messagesData, error: messagesError } = await query;

        if (messagesError) throw messagesError;
        setMessages((messagesData || []) as ContactMessage[]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Məlumat yüklənərkən xəta baş verdi');
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
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
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
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-black px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Admin Paneli</h1>
              <p className="text-gray-300 mt-1">Məhsulları və mesajları idarə edin</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'dashboard'
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setActiveTab('products');
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'products'
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Məhsullar
                </button>
                <button
                  onClick={() => {
                    setActiveTab('categories');
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'categories'
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Kateqoriyalar
                </button>
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === 'orders'
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sifarişlər
                  {stats.pendingOrders > 0 && (
                    <span className="ml-2 bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {stats.pendingOrders}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('messages');
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className={`px-6 py-4 font-medium text-sm transition-colors relative whitespace-nowrap ${
                    activeTab === 'messages'
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Mesajlar
                  {stats.unreadMessages > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {stats.unreadMessages}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'dashboard' ? (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Ümumi Məhsullar</p>
                          <p className="text-3xl font-bold text-black">{stats.totalProducts}</p>
                        </div>
                        <div className="bg-black rounded-full p-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Ümumi Sifarişlər</p>
                          <p className="text-3xl font-bold text-black">{stats.totalOrders}</p>
                        </div>
                        <div className="bg-black rounded-full p-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Gəlir (Çatdırılan)</p>
                          <p className="text-3xl font-bold text-black">{stats.totalRevenue.toFixed(2)} ₼</p>
                        </div>
                        <div className="bg-black rounded-full p-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Gözləyən Sifarişlər</p>
                          <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
                        </div>
                        <div className="bg-orange-100 rounded-full p-3">
                          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Ümumi Mesajlar</p>
                          <p className="text-3xl font-bold text-black">{stats.totalMessages}</p>
                        </div>
                        <div className="bg-black rounded-full p-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Oxunmamış Mesajlar</p>
                          <p className="text-3xl font-bold text-red-600">{stats.unreadMessages}</p>
                        </div>
                        <div className="bg-red-100 rounded-full p-3">
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sürətli Əməliyyatlar</h3>
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            setActiveTab('products');
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
                          className="w-full bg-black hover:bg-gray-800 text-white font-semibold px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Yeni Məhsul Əlavə Et</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('categories');
                            setEditingCategory(null);
                            setCategoryForm({
                              name: '',
                              slug: '',
                              description: '',
                              image_url: '',
                            });
                            setShowCategoryModal(true);
                          }}
                          className="w-full border border-black hover:bg-gray-50 text-black font-semibold px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Yeni Kateqoriya Əlavə Et</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Son Fəaliyyətlər</h3>
                      <div className="space-y-3">
                        {stats.pendingOrders > 0 && (
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="bg-orange-100 rounded-full p-2">
                                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{stats.pendingOrders} gözləyən sifariş</p>
                                <p className="text-xs text-gray-500">Dərhal baxılmalıdır</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setActiveTab('orders')}
                              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                            >
                              Bax →
                            </button>
                          </div>
                        )}
                        {stats.unreadMessages > 0 && (
                          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="bg-red-100 rounded-full p-2">
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{stats.unreadMessages} oxunmamış mesaj</p>
                                <p className="text-xs text-gray-500">Yeni mesajlar var</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setActiveTab('messages')}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Bax →
                            </button>
                          </div>
                        )}
                        {stats.pendingOrders === 0 && stats.unreadMessages === 0 && (
                          <p className="text-sm text-gray-500 text-center py-4">Hələ yeni fəaliyyət yoxdur</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'products' ? (
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
                      className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
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
                        {products.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                            Hələ məhsul yoxdur
                          </td>
                        </tr>
                      ) : (
                        products.map((product) => (
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
                                product.is_active && product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {product.is_active && product.stock > 0 ? 'Aktiv' : 'Stokda yox'}
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
                                className="text-black hover:text-gray-700 mr-4"
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
                        ))
                      )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : activeTab === 'orders' ? (
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Sifarişlər</h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Sifariş nömrəsi, ad, email ilə axtar..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          loadData();
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                      />
                      <select
                        value={statusFilter}
                        onChange={(e) => {
                          setStatusFilter(e.target.value);
                          loadData();
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                      >
                        <option value="all">Bütün Statuslar</option>
                        <option value="pending">Gözləyir</option>
                        <option value="processing">Hazırlanır</option>
                        <option value="shipped">Göndərildi</option>
                        <option value="delivered">Çatdırıldı</option>
                        <option value="cancelled">Ləğv edildi</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6 bg-white">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">Sifariş #{order.order_number}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                order.status === 'pending' ? 'bg-gray-100 text-gray-800' :
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
                            <p className="text-2xl font-bold text-black mb-2">{parseFloat(order.total_amount).toFixed(2)} ₼</p>
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
                      className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
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
                            className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
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
              ) : activeTab === 'messages' ? (
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800">İletişim Mesajları</h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Ad, email, mesaj ilə axtar..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          loadData();
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                      />
                      <select
                        value={statusFilter}
                        onChange={(e) => {
                          setStatusFilter(e.target.value);
                          loadData();
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                      >
                        <option value="all">Hamısı</option>
                        <option value="unread">Oxunmamış</option>
                        <option value="read">Oxunmuş</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                            className={`border rounded-lg p-6 ${!message.is_read ? 'bg-gray-50 border-gray-300' : 'bg-white border-gray-200'}`}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Təsvir</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stok</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kateqoriya</label>
                <select
                  value={productForm.category_id}
                  onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
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
                  className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Şəkil URL</label>
                <input
                  type="url"
                  value={categoryForm.image_url}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                  className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
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
