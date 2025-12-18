import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
            Məxfilik Siyasəti
          </h1>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Ümumi Məlumat</h2>
              <p className="text-gray-600 leading-relaxed">
                Adora Fashion, istifadəçilərinin məxfiliyyətinə hörmət edir və şəxsi məlumatların qorunmasına ciddi yanaşır.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Toplanan Məlumatlar</h2>
              <p className="text-gray-600 leading-relaxed">
                Biz sizdən aşağıdakı məlumatları toplaya bilərik: ad, e-poçt ünvanı, telefon nömrəsi, ünvan və sifariş məlumatları.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Məlumatların İstifadəsi</h2>
              <p className="text-gray-600 leading-relaxed">
                Toplanan məlumatlar sifarişlərinizin emalı, müştəri xidməti, marketinq kampaniyaları və qanuni öhdəliklərin yerinə yetirilməsi üçün istifadə olunur.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cookie-lər</h2>
              <p className="text-gray-600 leading-relaxed">
                Veb-saytımız sizə daha yaxşı xidmət göstərmək üçün cookie-lərdən istifadə edir. Cookie-ləri istənilən vaxt brauzerinizdən silə bilərsiniz.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Məlumatların Qorunması</h2>
              <p className="text-gray-600 leading-relaxed">
                Şəxsi məlumatlarınızı qorumaq üçün müasir təhlükəsizlik tədbirləri tətbiq edirik.
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

