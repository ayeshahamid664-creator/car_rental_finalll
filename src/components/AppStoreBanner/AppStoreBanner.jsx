import React from 'react'
import pattern from '../../assets/yellow pattern.jpeg'
import PlayStoreImg from '../../assets/ss play store.png'
import AppStoreImg from '../../assets/ss app store.png'

const bannerImg = {
    backgroundImage: `url(${pattern})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: '#FFD700',
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    height: "100%",
    width: "100%"
}

const AppStoreBanner = ({theme}) => {
  return(
    <div className={`w-full ${
      theme === "dark" 
      ? "bg-black text-white" 
      : "bg-white text-black"
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-14">
        <div className='py-10 sm:min-h-[400px] sm:grid sm:place-items-center rounded-xl overflow-hidden'
        style={bannerImg}>
          <div>
            <div className='space-y-6 max-w-xl mx-auto'>
              <h1 data-aos="fade-up" className='text-2xl text-center sm:text-4xl font-semibold font-serif text-black'>Get Started With Our App</h1>
              <p data-aos="fade-up" className='text-center sm:px-20 text-black'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi neque nam sed quia!</p>
              <div data-aos="fade-up" className='flex flex-wrap justify-center items-center gap-4'>
                <a href="#">
                  <img src={PlayStoreImg} alt="" className='max-w-[150px] sm:max-w-[120px] md:max-w-[200px]' />
                </a>
                <a href="#">
                  <img src={AppStoreImg} alt="" className='max-w-[150px] sm:max-w-[120px] md:max-w-[200px]' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppStoreBanner