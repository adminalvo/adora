import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only throw error in production or when actually using Supabase
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string | null;
          address: string | null;
          city: string | null;
          postal_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          postal_code?: string | null;
        };
        Update: {
          email?: string;
          name?: string;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          postal_code?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          category_id: string | null;
          stock: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          category_id?: string | null;
          stock?: number;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          category_id?: string | null;
          stock?: number;
          is_active?: boolean;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          product_id: string;
          quantity?: number;
        };
        Update: {
          quantity?: number;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          product_id: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          order_number: string;
          full_name: string;
          email: string;
          phone: string;
          address: string;
          city: string;
          postal_code: string | null;
          payment_method: string;
          total_amount: number;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string | null;
          order_number: string;
          full_name: string;
          email: string;
          phone: string;
          address: string;
          city: string;
          postal_code?: string | null;
          payment_method: string;
          total_amount: number;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
        };
        Update: {
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name: string;
          product_price: number;
          quantity: number;
          subtotal: number;
          created_at: string;
        };
        Insert: {
          order_id: string;
          product_id?: string | null;
          product_name: string;
          product_price: number;
          quantity: number;
          subtotal: number;
        };
      };
    };
  };
};
