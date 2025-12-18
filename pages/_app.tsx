import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import Preloader from '@/components/Preloader';
import CookieBanner from '@/components/CookieBanner';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Preloader />
          <Component {...pageProps} />
          <CookieBanner />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default appWithTranslation(App);

