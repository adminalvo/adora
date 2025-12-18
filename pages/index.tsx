import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerSlider from '@/components/BannerSlider';
import ProductCard from '@/components/ProductCard';
import { useTranslation } from 'next-i18next';
import { Product } from '@/types';

export default function Home() {
  const { t } = useTranslation('common');

  // Sample products - In a real app, these would come from an API
  const products: Product[] = [
    {
      id: 1,
      name: 'Elegant Evening Dress',
      description: 'Gözəl axşam paltarı, xüsusi tədbirlər üçün ideal',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1566479179817-27860e0b5e4e?w=800&q=80',
      category: 'Dresses',
      stock: 10,
    },
    {
      id: 2,
      name: 'Casual Summer Blouse',
      description: 'Rahat yay bluzu, günlük istifadə üçün',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80',
      category: 'Blouses',
      stock: 15,
    },
    {
      id: 3,
      name: 'Classic Business Suit',
      description: 'Klassik iş kostyumu, peşəkar görünüş',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      category: 'Suits',
      stock: 8,
    },
    {
      id: 4,
      name: 'Stylish Winter Coat',
      description: 'Zərif qış palto, isti və moda',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
      category: 'Coats',
      stock: 12,
    },
    {
      id: 5,
      name: 'Elegant Skirt',
      description: 'Zərif yubka, ofis və günlük istifadə',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      category: 'Skirts',
      stock: 20,
    },
    {
      id: 6,
      name: 'Designer Handbag',
      description: 'Dizayner çanta, hər üçün uyğun',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
      category: 'Accessories',
      stock: 25,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Banner Slider */}
        <BannerSlider />

        {/* Products Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Məhsullarımız
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
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

