import React from 'react'
import About from '../components/About/About'
import Services from '../components/Services/Services'

const AboutPage = ({ theme }) => {
  return (
    <div className={`min-h-screen pt-20 ${
      theme === "dark" 
      ? "bg-black text-white" 
      : "bg-white text-black"
    }`}>
      <div className="container">
        <About theme={theme} />
        <Services theme={theme} />
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border-2 border-yellow-500 rounded-lg">
              <h3 className="text-4xl font-bold text-yellow-500">10+</h3>
              <p className="mt-2">Years of Experience</p>
            </div>
            <div className="text-center p-6 border-2 border-yellow-500 rounded-lg">
              <h3 className="text-4xl font-bold text-yellow-500">500+</h3>
              <p className="mt-2">Happy Customers</p>
            </div>
            <div className="text-center p-6 border-2 border-yellow-500 rounded-lg">
              <h3 className="text-4xl font-bold text-yellow-500">50+</h3>
              <p className="mt-2">Car Models Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage