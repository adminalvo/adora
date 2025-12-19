'use client';

import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Səbət</h1>
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Səbətiniz boşdur</h2>
              <p className="text-gray-600 mb-8">Məhsul əlavə etmək üçün ana səhifəyə qayıdın</p>
              <button
                onClick={() => router.push('/')}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Alış-verişə Davam Et
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Səbət</h1>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Səbəti Təmizlə
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="bg-white rounded-xl shadow-lg p-6 flex gap-6">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {(item.product.image || item.product.image_url) ? (
                      <Image
                        src={item.product.image || item.product.image_url || ''}
                        alt={item.product.name}
                        width={128}
                        height={128}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-4xl">👗</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.product.name}</h3>
                    <p className="text-gray-600 mb-4">{item.product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-yellow-600">
                          {(item.product.price * item.quantity).toFixed(2)} ₼
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 hover:text-red-700 p-2"
                          aria-label="Remove"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sifariş Xülasəsi</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Məhsul sayı:</span>
                    <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Məbləğ:</span>
                    <span>{getTotalPrice().toFixed(2)} ₼</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Ümumi:</span>
                      <span className="text-yellow-600">{getTotalPrice().toFixed(2)} ₼</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 rounded-lg transition-colors text-lg"
                >
                  Sifarişi Tamamla
                </button>
              </div>
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
