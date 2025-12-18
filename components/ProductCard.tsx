'use client';

import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
      <div className="relative h-64 bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
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
          onClick={() => toggleFavorite(product)}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-colors ${
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
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-yellow-600">{product.price.toFixed(2)} ₼</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Səbətə At
          </button>
        </div>
      </div>
    </div>
  );
}
