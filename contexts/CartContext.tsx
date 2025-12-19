'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/types';
import { createClient } from '@/lib/supabaseClient';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCartFromSupabase();
    } else {
      // Fallback to localStorage for guests
      loadCartFromLocalStorage();
    }
  }, [user]);

  const loadCartFromSupabase = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: cartItems, error } = await (supabase
        .from('cart_items') as any)
        .select('*, products(*)')
        .eq('user_id', user?.id);

      if (error) throw error;

      if (cartItems) {
        const transformedItems: CartItem[] = cartItems.map((ci: any) => ({
          product: {
            id: ci.products.id,
            name: ci.products.name,
            description: ci.products.description,
            price: parseFloat(ci.products.price),
            image: ci.products.image_url,
            image_url: ci.products.image_url,
            category_id: ci.products.category_id,
            stock: ci.products.stock,
            is_active: ci.products.is_active,
          } as Product,
          quantity: ci.quantity,
        }));
        setItems(transformedItems);
      }
    } catch (error) {
      console.error('Error loading cart from Supabase:', error);
      loadCartFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // Save to localStorage for guests
    if (!user && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, user]);

  const syncCartToSupabase = async () => {
    if (!user) return;

    try {
      const supabase = createClient();
      
      // Clear existing cart items
      await (supabase.from('cart_items') as any).delete().eq('user_id', user.id);

      // Insert new cart items
      if (items.length > 0) {
        const cartItemsToInsert = items.map((item) => ({
          user_id: user.id,
          product_id: item.product.id,
          quantity: item.quantity,
        }));

        const { error } = await (supabase.from('cart_items') as any).insert(cartItemsToInsert);
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error syncing cart to Supabase:', error);
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    const existingItem = items.find((item) => String(item.product.id) === String(product.id));
    const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    // Update local state
    if (existingItem) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          String(item.product.id) === String(product.id)
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } else {
      setItems((prevItems) => [...prevItems, { product, quantity }]);
    }

    // Sync to Supabase if user is logged in
    if (user) {
      try {
        const supabase = createClient();
        
        if (existingItem) {
          const { error } = await (supabase
            .from('cart_items') as any)
            .update({ quantity: newQuantity })
            .eq('user_id', user.id)
            .eq('product_id', product.id);
          
          if (error) throw error;
        } else {
          const { error } = await (supabase.from('cart_items') as any).insert({
            user_id: user.id,
            product_id: product.id,
            quantity,
          });
          
          if (error) throw error;
        }
      } catch (error) {
        console.error('Error adding to cart in Supabase:', error);
      }
    }
  };

  const removeFromCart = async (productId: string | number) => {
    setItems((prevItems) => prevItems.filter((item) => String(item.product.id) !== String(productId)));

    if (user) {
      try {
        const supabase = createClient();
        const { error } = await (supabase
          .from('cart_items') as any)
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', String(productId));
        
        if (error) throw error;
      } catch (error) {
        console.error('Error removing from cart in Supabase:', error);
      }
    }
  };

  const updateQuantity = async (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        String(item.product.id) === String(productId) ? { ...item, quantity } : item
      )
    );

    if (user) {
      try {
        const supabase = createClient();
        const { error } = await (supabase
          .from('cart_items') as any)
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', String(productId));
        
        if (error) throw error;
      } catch (error) {
        console.error('Error updating cart quantity in Supabase:', error);
      }
    }
  };

  const clearCart = async () => {
    setItems([]);

    if (user) {
      try {
        const supabase = createClient();
        const { error } = await (supabase.from('cart_items') as any).delete().eq('user_id', user.id);
        if (error) throw error;
      } catch (error) {
        console.error('Error clearing cart in Supabase:', error);
      }
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
