import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutSuccess() {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sifarişiniz Qəbul Edildi!</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Sifarişiniz uğurla qeydə alındı. Tezliklə sizinlə əlaqə saxlayacağıq.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Ana Səhifəyə Qayıt
              </button>
              <button
                onClick={() => router.push('/favorites')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
              >
                Favorilərə Bax
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
