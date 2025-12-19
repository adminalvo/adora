'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`fixed inset-0 bg-white z-[9999] flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8 transform transition-transform duration-700" style={{ animation: fadeOut ? 'none' : 'pulse 2s ease-in-out infinite' }}>
          <div className="rounded-full bg-white p-4 shadow-2xl border-4 border-black">
            <Image
              src="/adora-logo.png"
              alt="Adora Fashion Logo"
              width={120}
              height={120}
              className="h-28 w-28 object-contain rounded-full"
              priority
            />
          </div>
        </div>
        <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-black rounded-full transition-all duration-1000" 
            style={{ width: fadeOut ? '100%' : '0%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

