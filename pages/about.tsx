import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'next-i18next';

export default function About() {
  const { t } = useTranslation('common');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
            {t('about.title')}
          </h1>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('about.description')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Missiyamız</h3>
                <p className="text-gray-600">
                  Hər kəsin öz üslubunu ifadə edə biləcəyi keyfiyyətli və münasib qiymətli geyimlər təqdim etmək.
                </p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Vizyonumuz</h3>
                <p className="text-gray-600">
                  Regionun ən etibarlı və sevilən moda markası olmaq.
                </p>
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

