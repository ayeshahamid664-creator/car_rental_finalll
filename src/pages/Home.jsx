import React from 'react'
import Hero from '../components/Hero/Hero'
import BannerSection from '../components/Banner/BannerSection'
import About from '../components/About/About'
import Services from '../components/Services/Services'
import CarList from '../components/CarList/CarList'
import Testimonal from '../components/Testimonal/Testimonal'
import AppStoreBanner from '../components/AppStoreBanner/AppStoreBanner'
import Contact from '../components/Contact/Contact'

const Home = ({ theme }) => {
  return (
    <>
      {/* Original Hero (yahan kuch nahi badla) */}
      <Hero theme={theme} />

      {/* ⭐ NAYA: Admin se add kiye gaye banners yahan dikhenge */}
      <BannerSection theme={theme} />

      <About theme={theme} />
      <Services theme={theme} />
      <CarList theme={theme} />
      <Testimonal theme={theme} />
      <AppStoreBanner theme={theme} />
      <Contact theme={theme} />
    </>
  )
}

export default Home