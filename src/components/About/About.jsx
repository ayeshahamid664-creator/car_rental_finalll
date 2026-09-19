import React from 'react'
import Carpng from '../../assets/carpng.png'
import CarpngLight from '../../assets/CarpngLight.png'
import { FaArrowRight } from 'react-icons/fa'

const About = ({ theme }) => {
  return (
    <div className={`w-full py-20 sm:py-28 ${
      theme === "dark" ? "bg-black text-white" : "bg-white text-black"
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20'>

          {/* Image */}
          <div className="relative" data-aos="fade-right" data-aos-duration="1200">
            <div className="absolute -inset-8 bg-yellow-500/10 rounded-full blur-3xl" />
            <img
              src={theme === "dark" ? Carpng : CarpngLight}
              alt="Car rental"
              className='relative w-full max-w-[500px] mx-auto h-auto object-contain'
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p data-aos="fade-up" className="text-yellow-500 text-xs font-semibold tracking-[0.2em] uppercase">
              About Us
            </p>

            <h2 data-aos="fade-up" className="font-serif text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
              Redefining the<br />
              <span className="italic font-medium opacity-60">rental experience.</span>
            </h2>

            <p data-aos="fade-up" className="text-base leading-relaxed opacity-70 max-w-lg">
              For over a decade, we've been providing premium vehicles to
              travelers, businesses, and adventurers. Our promise is simple:
              transparent pricing, immaculate cars, and service that respects
              your time.
            </p>

            {/* Stats grid */}
            <div data-aos="fade-up" className="grid grid-cols-3 gap-6 pt-6 border-t border-current/10">
              <div>
                <p className="font-serif text-3xl font-bold text-yellow-500">10+</p>
                <p className="text-xs opacity-60 tracking-wide mt-1">Years experience</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-yellow-500">500+</p>
                <p className="text-xs opacity-60 tracking-wide mt-1">Happy customers</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-yellow-500">50+</p>
                <p className="text-xs opacity-60 tracking-wide mt-1">Car models</p>
              </div>
            </div>

            <button data-aos="fade-up" className='group inline-flex items-center gap-2 bg-yellow-500 text-black px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-yellow-400 transition-all duration-300 shadow-lg shadow-yellow-500/20 mt-4'>
              Get Started
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About