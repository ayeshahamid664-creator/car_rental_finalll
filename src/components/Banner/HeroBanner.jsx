import React from 'react';
import { useBanners } from '../../context/BannerContext';
import carPng from '../../assets/carPng.avif';
import carYellow from '../../assets/carYellow.jpg';

const HeroBanner = ({ theme }) => {
  const { activeBanner } = useBanners();

  if (!activeBanner) return null;

  return (
    <section
      className={`w-full min-h-[620px] overflow-hidden duration-300 relative ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Decorative glow circles */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none animate-glow"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none animate-glow"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
        <div className="min-h-[620px] grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-10">
          <div
            className="order-2 lg:order-1 w-full max-w-xl py-10 lg:py-0"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <p className="text-yellow-400 text-3xl sm:text-4xl lg:text-5xl font-serif">
              {activeBanner.title}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold font-serif leading-tight">
              {activeBanner.subtitle}
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-8 max-w-lg">
              {activeBanner.description}
            </p>
            <button className="mt-6 bg-yellow-400 text-black px-7 py-3 rounded-md hover:bg-yellow-500 duration-200">
              {activeBanner.buttonText}
            </button>
          </div>

          <div
            className="order-1 lg:order-2 w-full flex justify-center items-center"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <img
              src={theme === 'dark' ? carPng : carYellow}
              alt="Car Rental"
              className="block w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[680px] h-auto object-contain animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;