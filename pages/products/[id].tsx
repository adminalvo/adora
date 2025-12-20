import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/types';
import { createClient } from '@/lib/supabaseClient';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import Image from 'next/image';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error: fetchError } = await (supabase
        .from('products') as any)
        .select('*, categories(name, slug)')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (fetchError) throw fetchError;

      if (data) {
        setProduct({
          id: data.id,
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          image: data.image_url,
          image_url: data.image_url,
          category: data.categories?.name || '',
          category_id: data.category_id,
          stock: data.stock,
          is_active: data.is_active,
          created_at: data.created_at,
          updated_at: data.updated_at,
        });
      } else {
        setError('Məhsul tapılmadı');
      }
    } catch (err: any) {
      console.error('Error loading product:', err);
      setError('Məhsul yüklənərkən xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Show success message
      alert(`${quantity} ədəd ${product.name} səbətə əlavə edildi`);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Yüklənir...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Məhsul Tapılmadı</h1>
            <p className="text-gray-600 mb-8">{error || 'Axtardığınız məhsul mövcud deyil'}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Ana Səhifəyə Qayıt
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-6 text-gray-600 hover:text-yellow-600 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Geri</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-96 lg:h-[600px] bg-gray-100">
                {product.image || product.image_url ? (
                  <Image
                    src={product.image || product.image_url || ''}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-9xl">👗</span>
                  </div>
                )}
                <button
                  onClick={() => product && toggleFavorite(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-colors ${
                    isFavorite(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                  aria-label={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg className="w-6 h-6" fill={isFavorite(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-6">
                {product.category && (
                  <button
                    onClick={() => router.push(`/categories/${product.category?.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="inline-block bg-gray-100 hover:bg-gray-200 text-black text-sm font-medium px-3 py-1 rounded-full mb-4 transition-colors"
                  >
                    {product.category}
                  </button>
                )}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <span className="text-5xl font-bold text-black">{product.price.toFixed(2)} ₼</span>
              </div>

              {product.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Məhsul Haqqında</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">{product.description}</p>
                </div>
              )}

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stok Vəziyyəti:</span>
                  <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `Stokda: ${product.stock} ədəd` : 'Stokda yox'}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-lg font-medium text-gray-900 mb-4">Miqdar Seçin</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-14 h-14 rounded-lg border-2 border-black hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black flex items-center justify-center transition-all font-bold text-xl"
                  >
                    −
                  </button>
                  <span className="text-3xl font-bold w-20 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 999, quantity + 1))}
                    disabled={quantity >= (product.stock || 999)}
                    className="w-14 h-14 rounded-lg border-2 border-black hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black flex items-center justify-center transition-all font-bold text-xl"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Ümumi: {(product.price * quantity).toFixed(2)} ₼</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.stock || product.stock === 0}
                  className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Səbətə Əlavə Et</span>
                </button>

                {(!product.stock || product.stock === 0) && (
                  <p className="text-center text-red-600 font-medium">Bu məhsul hazırda stokda yoxdur</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'az', ['common'])),
    },
  };
};
