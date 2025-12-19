'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { createClient } from '@/lib/supabaseClient';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string | number) => void;
  isFavorite: (productId: string | number) => boolean;
  toggleFavorite: (product: Product) => void;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadFavoritesFromSupabase();
    } else {
      loadFavoritesFromLocalStorage();
    }
  }, [user]);

  const loadFavoritesFromSupabase = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: favoritesData, error } = await (supabase
        .from('favorites') as any)
        .select('*, products(*)')
        .eq('user_id', user?.id);

      if (error) throw error;

      if (favoritesData) {
        const transformedFavorites: Product[] = favoritesData.map((f: any) => ({
          id: f.products.id,
          name: f.products.name,
          description: f.products.description,
          price: parseFloat(f.products.price),
          image: f.products.image_url,
          image_url: f.products.image_url,
          category_id: f.products.category_id,
          stock: f.products.stock,
          is_active: f.products.is_active,
        }));
        setFavorites(transformedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from Supabase:', error);
      loadFavoritesFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadFavoritesFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
    setLoading(false);
  };

  const addToFavorites = async (product: Product) => {
    if (favorites.some((p) => String(p.id) === String(product.id))) {
      return;
    }

    setFavorites((prev) => [...prev, product]);

    if (user) {
      try {
        const supabase = createClient();
        const { error } = await (supabase.from('favorites') as any).insert({
          user_id: user.id,
          product_id: product.id,
        });
        
        if (error) throw error;
      } catch (error) {
        console.error('Error adding to favorites in Supabase:', error);
        setFavorites((prev) => prev.filter((p) => String(p.id) !== String(product.id)));
      }
    }
  };

  const removeFromFavorites = async (productId: string | number) => {
    setFavorites((prev) => prev.filter((p) => String(p.id) !== String(productId)));

    if (user) {
      try {
        const supabase = createClient();
        const { error } = await (supabase
          .from('favorites') as any)
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', String(productId));
        
        if (error) throw error;
      } catch (error) {
        console.error('Error removing from favorites in Supabase:', error);
      }
    }
  };

  const isFavorite = (productId: string | number) => {
    return favorites.some((p) => String(p.id) === String(productId));
  };

  const toggleFavorite = async (product: Product) => {
    if (isFavorite(product.id)) {
      await removeFromFavorites(product.id);
    } else {
      await addToFavorites(product);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
