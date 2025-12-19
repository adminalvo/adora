import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export default function About() {
  const { t } = useTranslation('common');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-black text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {t('about.title')}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Kaliteli bir butiğiz
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold text-black mb-6">Hekayəmiz</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Adora Fashion, Ziya Haciyev tərəfindən qurulmuş kaliteli bir butikdir. 
                  Bizim məqsədimiz, hər bir müştərimizin öz üslubunu ifadə edə biləcəyi 
                  keyfiyyətli və zərif geyimlər təqdim etməkdir.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Biz, moda dünyasında zəriflik və keyfiyyətin birləşdiyi bir yer yaratmaq 
                  üçün çalışırıq. Hər bir məhsulumuz diqqətlə seçilir və ən yüksək keyfiyyət 
                  standartlarına uyğun olaraq təqdim edilir.
                </p>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                  alt="Fashion Store"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-black rounded-full p-3 mr-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-black">Missiyamız</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Hər kəsin öz üslubunu ifadə edə biləcəyi keyfiyyətli və zərif geyimlər təqdim etmək. 
                  Müştərilərimizin gözəlliyini və özünə inamını artırmaq üçün ən yaxşı məhsulları seçmək.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-black rounded-full p-3 mr-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-black">Vizyonumuz</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Regionun ən etibarlı və sevilən moda butiği olmaq. Keyfiyyətli 
                  məhsullar və mükəmməl xidmət ilə moda dünyasında lider mövqe tutmaq.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-black mb-12">Dəyərlərimiz</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-black rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Keyfiyyət</h3>
                <p className="text-gray-600">
                  Hər bir məhsulumuz ən yüksək keyfiyyət standartlarına uyğun olaraq seçilir və təqdim edilir.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-black rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Müştəri Məmnuniyyəti</h3>
                <p className="text-gray-600">
                  Müştərilərimizin məmnuniyyəti bizim ən böyük prioritetimizdir. Hər addımda sizin üçün buradayıq.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-black rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Zəriflik</h3>
                <p className="text-gray-600">
                  Moda dünyasında ən son trendləri izləyərək, zərif və keyfiyyətli məhsullar təqdim edirik.
                </p>
              </div>
            </div>
          </div>
        </section>

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
