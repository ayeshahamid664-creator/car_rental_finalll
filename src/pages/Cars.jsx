import React from 'react'
import CarList from '../components/CarList/CarList'

const Cars = ({ theme }) => {
  return (
    <div className={`min-h-screen pt-20 ${
      theme === "dark" 
      ? "bg-black text-white" 
      : "bg-white text-black"
    }`}>
      <div className="container">
        <div className="text-center py-10">
          <h1 className="text-4xl sm:text-5xl font-bold font-serif">Our Car Collection</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Choose from our wide range of premium cars</p>
        </div>
        <CarList theme={theme} showAll={true} />
      </div>
    </div>
  )
}

export default Cars