import React from 'react'

const Contact = ({theme}) => {
  return (
    <div className={`w-full py-14 ${
      theme === "dark" 
      ? "bg-black text-white" 
      : "bg-white text-black"
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div data-aos="zoom-in" className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 px-6 rounded-lg bg-gray-800">
          <div className='col-span-2 space-y-3'>
            <h1 className='text-4xl sm:text-5xl font-bold text-white'> Let's collaborate on your upcoming car rental venture</h1>
            <p className='text-gray-400'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis atque repudiandae accusantium voluptas.
            </p>
          </div>
          <div className='grid place-items-center'>
            <a href="#" className='inline-block font-semibold py-2 px-6 bg-amber-400 text-white rounded-lg tracking-wider uppercase hover:bg-amber-600 duration-300'>Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact