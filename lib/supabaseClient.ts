import { createBrowserClient } from '@supabase/ssr';
import { Database } from './supabase';

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // In development, log a warning but don't crash
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Missing Supabase environment variables!');
      console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
      console.error('For Vercel: Add them in Settings > Environment Variables');
      console.error('For local: Create .env.local file with these variables');
    }
    
    // Don't create a client with invalid URL - this causes ERR_NAME_NOT_RESOLVED
    // Instead, throw a clear error
    throw new Error(
      'Supabase configuration missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
};
