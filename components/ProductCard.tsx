'use client';

import { useRouter } from 'next/router';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
      <div className="relative h-64 bg-gray-100 cursor-pointer" onClick={handleCardClick}>
        {(product.image || product.image_url) ? (
          <Image
            src={product.image || product.image_url || ''}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl">👗</span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-colors z-10 ${
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
        {(!product.stock || product.stock === 0) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">Stokda Yox</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 
          className="text-xl font-semibold text-gray-800 mb-2 cursor-pointer hover:text-black transition-colors"
          onClick={handleCardClick}
        >
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-black">{product.price.toFixed(2)} ₼</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            disabled={!product.stock || product.stock === 0}
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Səbətə At
          </button>
        </div>
      </div>
    </div>
  );
}

