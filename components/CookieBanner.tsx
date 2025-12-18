'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookieConsent = localStorage.getItem('cookieConsent');
      if (!cookieConsent) {
        setTimeout(() => {
          setShowBanner(true);
        }, 1000);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-yellow-400 shadow-2xl z-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-700 text-sm md:text-base flex-1">
          {t('cookie.message')}
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('cookie.decline')}
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors font-medium"
          >
            {t('cookie.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}

