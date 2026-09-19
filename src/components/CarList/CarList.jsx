import React from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext';
import SkeletonCard from '../Loading/SkeletonCard';
import { FaArrowRight, FaGasPump, FaUsers, FaCog } from 'react-icons/fa';

const CarList = ({ theme, showAll = false }) => {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const displayedCars = showAll ? products : products.slice(0, 3);

  const handleAdd = (car) => {
    addToCart(car);
    showToast(`${car.name} added to cart!`, 'success');
  };

  return (
    <div className={`w-full py-20 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="text-yellow-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Our Fleet
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
              Premium cars,<br />
              <span className="italic font-medium opacity-60">ready to drive.</span>
            </h2>
          </div>
          <p className="text-sm opacity-60 max-w-xs leading-relaxed">
            Every vehicle is meticulously maintained and delivered with a full tank.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} theme={theme} />)
            : displayedCars.map((car) => (
                <article
                  key={car.id}
                  className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 ${
                    theme === 'dark'
                      ? 'border-white/10 hover:border-yellow-500/40 bg-gradient-to-b from-gray-900 to-black'
                      : 'border-black/10 hover:border-yellow-500/40 bg-gradient-to-b from-gray-50 to-white'
                  }`}
                >
                  {/* Image area */}
                  <div className={`relative h-52 flex items-center justify-center overflow-hidden ${
                    theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'
                  }`}>
                    {/* Radial glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700" />
                    </div>

                    {/* Mileage badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 dark:bg-white/10 backdrop-blur text-white text-[10px] font-semibold tracking-wide">
                      <FaGasPump size={9} />
                      {car.mileage || '12km'}
                    </div>

                    {/* Category badge */}
                    {car.category && (
                      <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-yellow-500 text-black text-[10px] font-bold tracking-wider uppercase">
                        {car.category}
                      </div>
                    )}

                    <img
                      className="relative z-[1] w-[85%] h-auto object-contain transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-1"
                      src={theme === 'dark' ? car.imageDark : car.image}
                      alt={car.name}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-5">
                    <div>
                      <h3 className="font-serif text-xl font-bold tracking-tight mb-1">
                        {car.name}
                      </h3>
                      <p className="text-xs opacity-50 tracking-wide">
                        Or similar • Automatic • 5 Seats
                      </p>
                    </div>

                    {/* Specs row */}
                    <div className="flex items-center gap-4 pt-4 border-t border-current/10">
                      <div className="flex items-center gap-1.5 text-xs opacity-70">
                        <FaUsers size={11} className="text-yellow-500" /> 5
                      </div>
                      <div className="flex items-center gap-1.5 text-xs opacity-70">
                        <FaCog size={11} className="text-yellow-500" /> Auto
                      </div>
                      <div className="flex items-center gap-1.5 text-xs opacity-70">
                        <FaGasPump size={11} className="text-yellow-500" /> Petrol
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-end justify-between pt-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest opacity-50 font-semibold mb-0.5">
                          From
                        </p>
                        <p className="font-serif text-2xl font-bold">
                          ${car.price}
                          <span className="text-xs font-sans font-medium opacity-50 ml-1">/day</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleAdd(car)}
                        className="w-11 h-11 rounded-full bg-yellow-500 text-black flex items-center justify-center hover:bg-yellow-400 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-yellow-500/20"
                        aria-label={`Add ${car.name} to cart`}
                      >
                        <FaArrowRight size={12} className="-rotate-45" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
        </div>

        {!showAll && (
          <div className="flex justify-center mt-14">
            <a href="/cars" className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-current/20 hover:border-yellow-500 hover:text-yellow-500 font-semibold text-sm tracking-wide transition-all duration-300">
              View All Cars
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;