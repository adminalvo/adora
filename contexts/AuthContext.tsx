'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/lib/supabaseClient';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const initAuth = async () => {
      try {
        // Check if Supabase is configured
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          console.error('❌ Supabase not configured!');
          console.error('Missing environment variables:');
          if (!supabaseUrl) console.error('  - NEXT_PUBLIC_SUPABASE_URL is missing');
          if (!supabaseAnonKey) console.error('  - NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
          console.error('');
          console.error('📝 To fix this:');
          console.error('1. Go to Vercel Dashboard → Settings → Environment Variables');
          console.error('2. Add NEXT_PUBLIC_SUPABASE_URL (get it from Supabase Dashboard → Settings → API)');
          console.error('3. Add NEXT_PUBLIC_SUPABASE_ANON_KEY: sb_publishable_56hz_62iMtRNngOIBSGPAw__pnrE4qk');
          console.error('4. Add SUPABASE_SERVICE_ROLE_KEY: sb_secret_Sd4f-FWiiM-dsaTcQdXnFw_A3KNzVet');
          console.error('5. Redeploy your application');
          console.error('');
          console.error('📚 See HATA_COZUMU_ERR_NAME_NOT_RESOLVED.md for detailed instructions');
          setLoading(false);
          return;
        }

        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Get user profile from public.users table
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single() as any;

          if (profile) {
            setUser({
              id: profile.id,
              email: profile.email,
              name: profile.name,
            });
          } else {
            // Create profile if it doesn't exist
            const { data: newProfile } = await supabase
              .from('users')
              .insert({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
              } as any)
              .select()
              .single() as any;

            if (newProfile) {
              setUser({
                id: newProfile.id,
                email: newProfile.email,
                name: newProfile.name,
              });
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single() as any;

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.name,
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      if (data.user) {
        // Get user profile
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single() as any;

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            name: profile.name,
          });
        } else {
          // Create profile if it doesn't exist
          const { data: newProfile } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email || '',
              name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
            } as any)
            .select()
            .single() as any;

          if (newProfile) {
            setUser({
              id: newProfile.id,
              email: newProfile.email,
              name: newProfile.name,
            });
          }
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        console.error('Registration error:', error);
        return false;
      }

      if (data.user) {
        // Create user profile in public.users table
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email || email,
            name,
          } as any);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Still return true as auth user was created
        }

        // Set user immediately if email confirmation is disabled
        if (data.session) {
          setUser({
            id: data.user.id,
            email: data.user.email || email,
            name,
          });
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('cart');
      localStorage.removeItem('favorites');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
