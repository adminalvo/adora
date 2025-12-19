import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-12">
            Məxfilik Siyasəti
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">1. Ümumi Məlumat</h2>
              <p className="text-gray-700 leading-relaxed">
                Adora Fashion, istifadəçilərinin məxfiliyyətinə hörmət edir və şəxsi məlumatların qorunmasına ciddi yanaşır. 
                Bu məxfilik siyasəti, veb-saytımızı ziyarət etdiyiniz zaman topladığımız məlumatlar və bu məlumatların 
                necə istifadə olunduğu haqqında məlumat verir.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. Toplanan Məlumatlar</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Biz sizdən aşağıdakı məlumatları toplaya bilərik:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Ad və soyad</li>
                <li>E-poçt ünvanı</li>
                <li>Telefon nömrəsi</li>
                <li>Ünvan və çatdırılma məlumatları</li>
                <li>Sifariş məlumatları</li>
                <li>Ödəniş məlumatları (təhlükəsiz ödəniş sistemləri vasitəsilə)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. Məlumatların İstifadəsi</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Toplanan məlumatlar aşağıdakı məqsədlər üçün istifadə olunur:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Sifarişlərinizin emalı və çatdırılması</li>
                <li>Müştəri xidməti və dəstəyi</li>
                <li>Marketinq kampaniyaları (yalnız razılıq verilərsə)</li>
                <li>Qanuni öhdəliklərin yerinə yetirilməsi</li>
                <li>Veb-saytın təkmilləşdirilməsi</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Cookie-lər</h2>
              <p className="text-gray-700 leading-relaxed">
                Veb-saytımız sizə daha yaxşı xidmət göstərmək üçün cookie-lərdən istifadə edir. Cookie-lər, 
                veb-saytın işləməsi, performansının yaxşılaşdırılması və sizə daha uyğun məzmun təqdim edilməsi 
                üçün lazımdır. Cookie-ləri istənilən vaxt brauzerinizdən silə bilərsiniz.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Məlumatların Qorunması</h2>
              <p className="text-gray-700 leading-relaxed">
                Şəxsi məlumatlarınızı qorumaq üçün müasir təhlükəsizlik tədbirləri tətbiq edirik. Bütün məlumatlar 
                şifrələnmiş formada saxlanılır və yalnız yetkili işçilər tərəfindən müştəri xidməti məqsədləri üçün 
                istifadə olunur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. Məlumatların Paylaşılması</h2>
              <p className="text-gray-700 leading-relaxed">
                Şəxsi məlumatlarınızı üçüncü tərəflərlə paylaşmırıq, istisna olaraq çatdırılma xidmətləri və 
                ödəniş sistemləri kimi xidmət təminatçıları ilə. Bu təminatçılar da məlumatlarınızı qorumaq 
                üçün müqavilə ilə məhdudlaşdırılmışdır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Hüquqlarınız</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Siz aşağıdakı hüquqlara maliksiniz:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Şəxsi məlumatlarınız haqqında məlumat almaq</li>
                <li>Yanlış məlumatların düzəldilməsini tələb etmək</li>
                <li>Məlumatlarınızın silinməsini tələb etmək</li>
                <li>Məlumatların istifadəsinə etiraz etmək</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Əlaqə</h2>
              <p className="text-gray-700 leading-relaxed">
                Məxfilik siyasəti ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın:
              </p>
              <p className="text-gray-700 mt-2">
                Email: info@adorafashion.az<br />
                Telefon: +994 70 780 08 18
              </p>
            </section>

            <section>
              <p className="text-sm text-gray-500 mt-8">
                Son yenilənmə: {new Date().toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' })}
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
