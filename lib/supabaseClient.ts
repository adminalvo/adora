import { createBrowserClient } from '@supabase/ssr';
import { Database } from './supabase';

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // In development, log a warning but don't crash
    if (process.env.NODE_ENV === 'development') {
      console.warn('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file');
    }
    
    // Return a mock client that will fail gracefully
    // This prevents the app from crashing but Supabase operations will fail
    return createBrowserClient<Database>(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseAnonKey || 'placeholder-key'
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
};
