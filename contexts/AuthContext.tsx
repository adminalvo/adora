'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    // In a real app, this would be an actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation - in real app, check against backend
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find((u: any) => u.email === email && u.password === password);
        
        if (foundUser) {
          const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.some((u: any) => u.email === email)) {
          resolve(false);
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password, // In real app, this should be hashed
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        resolve(true);
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
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
