import React from 'react'
import { FaQuoteRight } from 'react-icons/fa'

const testimonialData = [
    {
      name: "Dilshad Ahmed",
      role: "Business Traveler",
      description: "The booking process was effortless and the car was immaculate. This is how car rental should work.",
    },
    {
      name: "Satya Verma",
      role: "Weekend Explorer",
      description: "Transparent pricing, no surprises at pickup. The BMW was spotless and drove like a dream.",
    },
    {
      name: "Sabir Khan",
      role: "Family Vacationer",
      description: "Booked a KIA for a week-long trip. Great condition, easy pickup, and the support team was fantastic.",
    },
];

const Testimonal = ({ theme }) => {
  return (
    <div className={`w-full py-20 sm:py-28 ${
      theme === "dark" ? "bg-black text-white" : "bg-white text-black"
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        <div className="max-w-2xl mb-14">
          <p className="text-yellow-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
            Loved by travelers<br />
            <span className="italic font-medium opacity-60">across the country.</span>
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonialData.map((data, i) => (
            <div
              key={data.name}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className={`group relative p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${
                theme === 'dark'
                  ? 'border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-yellow-500/40'
                  : 'border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent hover:border-yellow-500/40'
              }`}
            >
              <FaQuoteRight className="text-yellow-500/20 text-3xl mb-6" />

              <p className="text-base leading-relaxed mb-8">
                "{data.description}"
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-current/10">
                <div className="w-11 h-11 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold font-serif">
                  {data.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{data.name}</p>
                  <p className="text-xs opacity-50">{data.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonal