'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader ${!loading ? 'hidden' : ''}`}>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8">
          <span className="text-4xl md:text-5xl font-serif font-bold text-yellow-500">Adora Fashion</span>
        </div>
        <div className="loader-white"></div>
      </div>
    </div>
  );
}

