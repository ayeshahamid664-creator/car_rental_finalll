

import React from "react";
import carPng from "../../assets/carPng.avif";
import carYellow from "../../assets/carYellow.jpg";
import { FaArrowRight, FaStar } from "react-icons/fa";

const Hero = ({ theme }) => {
  return (
    <section
      className={`w-full min-h-[680px] overflow-hidden relative ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow circles */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-[680px] grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">

          {/* TEXT — 6 cols */}
          <div className="lg:col-span-6 order-2 lg:order-1 py-12 lg:py-0"
               data-aos="fade-right" data-aos-duration="1000">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-yellow-500">
                Premium Fleet 2025
              </span>
            </div>

            <h1 className="font-serif font-bold text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight">
              Drive the
              <br />
              <span className="text-yellow-500 italic font-medium">extraordinary</span>
              <br />
              every day.
            </h1>

            <p className="mt-7 text-base sm:text-lg leading-relaxed max-w-lg opacity-70">
              Handpicked luxury vehicles, transparent pricing, and doorstep
              delivery. Experience car rental the way it should be — effortless.
            </p>

            {/* CTA row */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button className="group bg-yellow-500 text-black px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-yellow-500/25">
                Get Started
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide border border-current/20 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300">
                View Fleet
              </button>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex items-center gap-6 opacity-70">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-xs" />
                ))}
              </div>
              <div className="h-4 w-px bg-current/20" />
              <p className="text-xs tracking-wide">
                <span className="font-bold">4.9/5</span> from 2,400+ customers
              </p>
            </div>
          </div>

          {/* CAR — 6 cols */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center items-center relative"
               data-aos="zoom-in" data-aos-duration="1200">
            
            {/* Radial glow behind car */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[80%] bg-yellow-400/20 rounded-full blur-[100px]" />
            </div>

            <img
              src={theme === "dark" ? carPng : carYellow}
              alt="Luxury car"
              className="relative block w-full max-w-[500px] lg:max-w-[640px] h-auto object-contain animate-float drop-shadow-2xl"
            />

            {/* Floating spec chips */}
            <div className="hidden lg:flex absolute top-8 right-4 items-center gap-2 px-3 py-2 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200/50 dark:border-gray-800 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-semibold">Available Now</span>
            </div>

            <div className="hidden lg:block absolute bottom-8 left-4 px-4 py-3 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-gray-200/50 dark:border-gray-800 shadow-lg">
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-semibold">Starting at</p>
              <p className="text-lg font-bold text-yellow-500">$100<span className="text-xs opacity-60 font-medium">/day</span></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;