import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Terms() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
            İstifadə Şərtləri
          </h1>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Qəbul</h2>
              <p className="text-gray-600 leading-relaxed">
                Bu veb-saytı istifadə etməklə siz bu istifadə şərtlərini qəbul etmiş olursunuz.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Sifarişlər</h2>
              <p className="text-gray-600 leading-relaxed">
                Bütün sifarişlər mövcudluğa əsasən qəbul edilir. Qiymətlər xəbərdarlıq olmadan dəyişdirilə bilər.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Ödəniş</h2>
              <p className="text-gray-600 leading-relaxed">
                Ödənişlər təhlükəsiz ödəniş sistemləri vasitəsilə həyata keçirilir.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Qaytarma və Dəyişdirmə</h2>
              <p className="text-gray-600 leading-relaxed">
                Məhsulları alındıqdan sonra 14 gün ərzində qaytara və ya dəyişdirə bilərsiniz.
              </p>
            </section>
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

