import React from 'react'
import { FaTag, FaShieldAlt, FaUserTie, FaArrowRight } from "react-icons/fa";

const skillsData = [
    {
        name: "Best Price",
        icon: <FaTag />,
        description: "Transparent pricing with no hidden fees. What you see is what you pay.",
    },
    {
        name: "Fast & Safe",
        icon: <FaShieldAlt />,
        description: "Fully insured vehicles, sanitized before every trip, delivered on time.",
    },
    {
        name: "Expert Drivers",
        icon: <FaUserTie />,
        description: "Optional professional chauffeurs for a relaxed, comfortable journey.",
    },
];

const Services = ({ theme }) => {
  return (
    <div className={`w-full py-20 sm:py-28 ${
      theme === "dark" ? "bg-black text-white" : "bg-white text-black"
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Section header */}
        <div className="max-w-2xl mb-14">
          <p className="text-yellow-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
            Built for people who<br />
            <span className="italic font-medium opacity-60">value their time.</span>
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {skillsData.map((skill, i) => (
            <div
              key={skill.name}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className={`group relative p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${
                theme === 'dark'
                  ? 'border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-yellow-500/40'
                  : 'border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent hover:border-yellow-500/40'
              }`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xl mb-6 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500">
                {skill.icon}
              </div>

              <h3 className="font-serif text-2xl font-bold tracking-tight mb-3">
                {skill.name}
              </h3>

              <p className="text-sm leading-relaxed opacity-70 mb-6">
                {skill.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-yellow-500">
                Learn more
                <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services