'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gradient-to-b from-yellow-50 to-white border-t border-yellow-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <div className="flex items-center">
                <div className="rounded-full bg-white p-1.5 shadow-md border-2 border-yellow-100">
                  <Image
                    src="/adora-logo.png"
                    alt="Adora Fashion Logo"
                    width={60}
                    height={60}
                    className="h-14 w-14 object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Gözəl geyimlər, gözəl qiymətlər. Ən son moda trendləri ilə.
            </p>
            {/* Contact Info */}
            <div className="mb-4 space-y-2">
              <a href="tel:+994707800818" className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors text-sm">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +994 70 780 08 18
              </a>
            </div>
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/adora.fashiioon?utm_source=qr&igsh=MWNhdHR0ZHhtY2F5MA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-yellow-500 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Sürətli Keçidlər</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-yellow-500 transition-colors text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-yellow-500 transition-colors text-sm">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-yellow-500 transition-colors text-sm">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Hüquqi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-yellow-500 transition-colors text-sm">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-yellow-500 transition-colors text-sm">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Adora Fashion. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}

