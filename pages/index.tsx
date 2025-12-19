'use client';

import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerSlider from '@/components/BannerSlider';
import ProductCard from '@/components/ProductCard';
import { useTranslation } from 'next-i18next';
import { Product } from '@/types';
import { createClient } from '@/lib/supabaseClient';

export default function Home() {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [selectedCategory, searchQuery]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      
      let query = (supabase
        .from('products') as any)
        .select('*, categories(name, slug)')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Transform data to match Product type
      const transformedProducts = (data || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: parseFloat(p.price),
        image: p.image_url,
        image_url: p.image_url,
        category: p.categories?.name || '',
        category_id: p.category_id,
        stock: p.stock,
        is_active: p.is_active,
        created_at: p.created_at,
        updated_at: p.updated_at,
      }));

      setProducts(transformedProducts);
    } catch (err: any) {
      console.error('Error loading products:', err);
      setError('Məhsullar yüklənərkən xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await (supabase
        .from('categories') as any)
        .select('*')
        .order('name');

      if (fetchError) throw fetchError;
      setCategories(data || []);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category_id !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Banner Slider */}
        <BannerSlider />

        {/* Search and Filter Section */}
        <section className="bg-white py-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Məhsul axtar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div className="w-full md:w-auto">
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Bütün Kateqoriyalar</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {searchQuery ? `Axtarış: "${searchQuery}"` : selectedCategory 
                  ? categories.find(c => c.id === selectedCategory)?.name || 'Məhsullar'
                  : 'Məhsullarımız'}
              </h2>
              {filteredProducts.length > 0 && (
                <span className="text-gray-600">
                  {filteredProducts.length} məhsul tapıldı
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {searchQuery || selectedCategory ? 'Məhsul tapılmadı' : 'Hələ məhsul yoxdur'}
                </h3>
                <p className="text-gray-600 mb-8">
                  {searchQuery || selectedCategory 
                    ? 'Başqa axtarış termini və ya kateqoriya seçin'
                    : 'Admin panelindən məhsul əlavə edin'}
                </p>
                {(searchQuery || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                    className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Filtrləri Təmizlə
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
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
