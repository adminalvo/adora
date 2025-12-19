'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <div className="rounded-full bg-white p-2 shadow-sm">
            <Image
              src="/adora-logo.png"
              alt="Adora Fashion Logo"
              width={60}
              height={60}
              className="h-12 w-12 object-contain rounded-full"
              priority
            />
          </div>
        </div>
        <div className="w-12 h-0.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-400 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
}

