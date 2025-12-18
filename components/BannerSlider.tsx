'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';

export default function BannerSlider() {
  const { t } = useTranslation('common');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: t('home.title'),
      subtitle: t('home.subtitle'),
      bgImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
    },
    {
      title: 'Yeni Kolleksiya',
      subtitle: 'Ən son moda trendləri ilə',
      bgImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
    },
    {
      title: 'Xüsusi Endirimlər',
      subtitle: 'Seçilmiş məhsullarda 50% endirim',
      bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    },
  ];

  const slidesLength = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesLength);
    }, 5000);

    return () => clearInterval(timer);
  }, [slidesLength]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full flex items-center justify-center relative"
              style={{
                backgroundImage: `url(${slide.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="text-center text-white px-4 relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
                <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">{slide.subtitle}</p>
                <button className="bg-white text-yellow-600 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-yellow-50 transition-colors shadow-lg">
                  {t('home.cta')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

