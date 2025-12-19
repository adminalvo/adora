import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Terms() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-12">
            İstifadə Şərtləri
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">1. Qəbul</h2>
              <p className="text-gray-700 leading-relaxed">
                Bu veb-saytı istifadə etməklə siz bu istifadə şərtlərini qəbul etmiş olursunuz. 
                Əgər bu şərtlərlə razı deyilsinizsə, lütfən veb-saytı istifadə etməyin.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. Sifarişlər</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bütün sifarişlər mövcudluğa əsasən qəbul edilir. Qiymətlər xəbərdarlıq olmadan dəyişdirilə bilər. 
                Sifariş verdikdən sonra sizə təsdiq e-poçtu göndəriləcək.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Məhsulun stokda olmaması halında, sizə dərhal məlumat veriləcək və alternativ təkliflər təqdim ediləcək.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. Ödəniş</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ödənişlər təhlükəsiz ödəniş sistemləri vasitəsilə həyata keçirilir. Qəbul edilən ödəniş üsulları:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Nəğd ödəniş (çatdırılma zamanı)</li>
                <li>Bank kartı ilə ödəniş</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Bütün ödənişlər təhlükəsiz şifrələmə ilə qorunur.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Qaytarma və Dəyişdirmə</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Məhsulları alındıqdan sonra 14 gün ərzində qaytara və ya dəyişdirə bilərsiniz. 
                Qaytarma üçün aşağıdakı şərtlər tətbiq olunur:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Məhsul orijinal vəziyyətdə olmalıdır</li>
                <li>Etiketlər və paketləmə materialları saxlanılmalıdır</li>
                <li>İstifadə edilmiş məhsullar qaytarıla bilməz</li>
                <li>Çatdırılma xərcləri müştəriyə aiddir</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Çatdırılma</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Çatdırılma müddətləri və xərcləri sifariş zamanı göstərilir. 
                Çatdırılma müddətləri təxminidir və gözlənilməz hallarda dəyişə bilər.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Çatdırılma zamanı məhsulun zədələnməsi halında, dərhal bizimlə əlaqə saxlayın.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. Məhsul Keyfiyyəti</h2>
              <p className="text-gray-700 leading-relaxed">
                Bütün məhsullarımız keyfiyyətli materiallardan hazırlanır və diqqətlə yoxlanılır. 
                Əgər məhsulda keyfiyyət problemi görsəniz, dərhal bizimlə əlaqə saxlayın və problem həll ediləcək.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Məxfilik</h2>
              <p className="text-gray-700 leading-relaxed">
                Şəxsi məlumatlarınızın qorunması bizim üçün çox vacibdir. Məxfilik siyasətimiz haqqında 
                ətraflı məlumat üçün <a href="/privacy" className="text-black underline">Məxfilik Siyasəti</a> səhifəsinə baxın.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Məsuliyyətin Məhdudlaşdırılması</h2>
              <p className="text-gray-700 leading-relaxed">
                Veb-saytımızda göstərilən məlumatlar ümumi məlumatdır və dəyişdirilə bilər. 
                Məhsul təsvirləri və şəkilləri təxminidir və faktiki məhsuldan fərqlənə bilər.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">9. Əlaqə</h2>
              <p className="text-gray-700 leading-relaxed">
                İstifadə şərtləri ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın:
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
