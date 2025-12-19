'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabaseClient';

export default function Account() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadProfile();
      if (activeTab === 'orders') {
        loadOrders();
      }
    }
  }, [user, activeTab]);

  const loadProfile = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await (supabase
        .from('users') as any)
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfileForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          postal_code: data.postal_code || '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await (supabase
        .from('orders') as any)
        .select('*, order_items(*)')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const supabase = createClient();
      const { error } = await (supabase
        .from('users') as any)
        .update({
          name: profileForm.name,
          phone: profileForm.phone || null,
          address: profileForm.address || null,
          city: profileForm.city || null,
          postal_code: profileForm.postal_code || null,
        })
        .eq('id', user?.id);

      if (error) throw error;
      alert('Profil uğurla yeniləndi');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Profil yenilənərkən xəta baş verdi');
    } finally {
      setSaving(false);
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-black text-white px-8 py-6">
              <h1 className="text-3xl font-bold">Hesabım</h1>
              <p className="text-gray-300 mt-1">Şəxsi məlumatlarınızı idarə edin</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-4 font-medium text-sm transition-colors ${
                    activeTab === 'profile'
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-6 py-4 font-medium text-sm transition-colors ${
                    activeTab === 'orders'
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sifarişlərim
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'profile' ? (
                <form onSubmit={handleSaveProfile} className="max-w-2xl space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email dəyişdirilə bilməz</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="+994 XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Ünvan</label>
                    <textarea
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Şəhər</label>
                      <input
                        type="text"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Poçt Kodu</label>
                      <input
                        type="text"
                        value={profileForm.postal_code}
                        onChange={(e) => setProfileForm({ ...profileForm, postal_code: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => router.push('/')}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-black hover:bg-gray-50 transition-colors"
                    >
                      Ləğv et
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {saving ? 'Saxlanılır...' : 'Yadda Saxla'}
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold text-black mb-6">Sifarişlərim</h2>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Hələ sifarişiniz yoxdur</h3>
                      <p className="text-gray-600 mb-6">İlk sifarişinizi vermək üçün məhsullarımıza baxın</p>
                      <button
                        onClick={() => router.push('/')}
                        className="bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Alış-verişə Başla
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-black">Sifariş #{order.order_number}</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {new Date(order.created_at).toLocaleDateString('az-AZ', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded text-sm font-semibold ${
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
                          
                          {order.order_items && order.order_items.length > 0 && (
                            <div className="mb-4">
                              {order.order_items.map((item: any) => (
                                <div key={item.id} className="flex justify-between text-sm mb-2">
                                  <span className="text-gray-700">{item.product_name} x {item.quantity}</span>
                                  <span className="font-medium">{parseFloat(item.subtotal).toFixed(2)} ₼</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                            <span className="text-gray-600">Ümumi məbləğ:</span>
                            <span className="text-xl font-bold text-black">{parseFloat(order.total_amount).toFixed(2)} ₼</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'az', ['common'])),
    },
  };
};
