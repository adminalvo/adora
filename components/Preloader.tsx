'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(progressInterval);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {/* Logo with Animation */}
        <div className="mb-8 animate-pulse">
          <div className="rounded-full bg-white p-3 shadow-xl border-4 border-yellow-200">
            <Image
              src="/adora-logo.png"
              alt="Adora Fashion Logo"
              width={120}
              height={120}
              className="h-24 w-24 object-contain rounded-full"
              priority
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-2 animate-fade-in">
          Adora Fashion
        </h1>
        <p className="text-lg text-gray-600 mb-8 animate-fade-in-delay">Moda və Zəriflik</p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">{progress}%</p>

        {/* Loading Spinner */}
        <div className="mt-8">
          <div className="w-12 h-12 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

