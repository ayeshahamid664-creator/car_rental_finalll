// src/components/Banner/BannerSection.jsx
import React from 'react';
import { useBanners } from '../../context/BannerContext';

const BannerSection = ({ theme }) => {
  const { banners, loading } = useBanners();

  // ⭐ FIX: id !== 1 wala check hata dein
  const activeBanners = banners.filter((b) => b.active);

  if (loading) return null;
  if (activeBanners.length === 0) return null;

  return (
    <div className={`w-full py-14 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeBanners.map((banner, index) => (
            <div
              key={banner.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className={`card-tilt relative rounded-2xl overflow-hidden border-2 p-8 ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 hover:border-yellow-500'
                  : 'bg-gradient-to-br from-yellow-50 to-white border-gray-200 hover:border-yellow-500 shadow'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -mr-12 -mt-12"></div>

              <div className="relative z-10 space-y-3">
                <p className="text-yellow-500 text-sm font-semibold tracking-wider uppercase">
                  {banner.title}
                </p>

                <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
                  {banner.subtitle}
                </h3>

                <p className="text-sm opacity-70 leading-relaxed">
                  {banner.description}
                </p>

                {/* ⭐ FIX: button_text (snake_case) */}
                {banner.button_text && (
                  <button className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-all active:scale-95 shadow-lg shadow-yellow-500/20">
                    {banner.button_text}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSection;