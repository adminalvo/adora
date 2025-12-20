import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutSuccess() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    const order = router.query.order as string;
    if (order) {
      setOrderNumber(order);
    }
  }, [router.query]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sifariş Təsdiqləndi!</h1>
            {orderNumber && (
              <p className="text-lg text-gray-700 mb-2">
                Sifariş nömrəniz: <span className="font-bold text-black">{orderNumber}</span>
              </p>
            )}
            <p className="text-gray-600 mb-8 text-lg">
              Sifarişiniz qəbul edildi. Tezliklə sizinlə əlaqə saxlayacağıq.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Ana Səhifəyə Qayıt
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Əlaqə
              </button>
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
