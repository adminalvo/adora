'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Logo from './Logo';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileLangDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const { getTotalItems } = useCart();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    setIsLangDropdownOpen(false);
    setIsMobileLangDropdownOpen(false);
  };

  const languages = [
    { code: 'az', name: 'Azərbaycan', short: 'AZ' },
    { code: 'ru', name: 'Русский', short: 'RU' },
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'tr', name: 'Türkçe', short: 'TR' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (mobileLangDropdownRef.current && !mobileLangDropdownRef.current.contains(event.target as Node)) {
        setIsMobileLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 py-2">
          {/* Brand Name */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Logo size="large" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
            <Link href="/" className="text-black hover:text-gray-600 transition-colors font-medium">
              {t('nav.home')}
            </Link>
            <Link href="/about" className="text-black hover:text-gray-600 transition-colors font-medium">
              {t('nav.about')}
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-600 transition-colors font-medium">
              {t('nav.contact')}
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative text-black hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Favorites Icon */}
            <Link href="/favorites" className="relative text-black hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative flex items-center space-x-2">
                <Link href="/account" className="flex items-center space-x-2 px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition-colors">
                  <span className="text-sm font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-black hover:text-gray-600 transition-colors p-2"
                  title="Çıxış"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-black hover:text-gray-600 transition-colors font-medium">
                Giriş
              </Link>
            )}

            {/* Language Dropdown */}
            <div className="relative border-l border-gray-300 pl-4 ml-4 flex-shrink-0" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 border border-black hover:bg-black hover:text-white rounded-lg transition-colors"
              >
                <span className="text-sm font-medium">{currentLanguage.short}</span>
                <svg
                  className={`w-4 h-4 text-gray-800 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-black py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        i18n.language === lang.code
                          ? 'bg-black text-white font-medium'
                          : 'text-black hover:bg-gray-100'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Güzel Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 group"
            aria-label="Menu"
          >
            <span
              className={`block w-7 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-2 bg-black' : ''
              }`}
            ></span>
            <span
              className={`block w-7 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block w-7 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 -translate-y-2 bg-black' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        {/* Mobile Menu - Güzel Tasarım */}
        <div
          className={`md:hidden fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-white">
            <Logo />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="flex-1 px-6 py-8 space-y-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-4 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 font-medium text-lg group"
              >
                <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {t('nav.home')}
              </Link>
              
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-4 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 font-medium text-lg group"
              >
                <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('nav.about')}
              </Link>
              
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-4 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 font-medium text-lg group"
              >
                <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('nav.contact')}
              </Link>

              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-4 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 font-medium text-lg group"
              >
                <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Səbət {getTotalItems() > 0 && `(${getTotalItems()})`}
              </Link>

              <Link
                href="/favorites"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-4 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 font-medium text-lg group"
              >
                <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorilər {favorites.length > 0 && `(${favorites.length})`}
              </Link>

              {user ? (
                <div className="px-4 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">{user.name}</span>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Çıxış
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-4 py-4 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 font-medium text-lg group"
                >
                  <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Giriş
                </Link>
              )}
            </nav>

            {/* Language Selector */}
            <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
              <div className="relative" ref={mobileLangDropdownRef}>
                <button
                  onClick={() => setIsMobileLangDropdownOpen(!isMobileLangDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-yellow-50 rounded-xl transition-all duration-200 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span className="text-base font-medium text-gray-800">{currentLanguage.name}</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isMobileLangDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isMobileLangDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                          i18n.language === lang.code
                            ? 'bg-black text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

