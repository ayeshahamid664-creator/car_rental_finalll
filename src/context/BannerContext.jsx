import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BannerContext = createContext();

// Original banner (ye sirf reference ke liye hai — hero me use nahi hoga)
const defaultBanners = [
  {
    id: 1,
    title: 'Effortless',
    subtitle: 'Car Rental',
    description: 'Original hero banner — ye Hero.jsx me hardcoded hai',
    buttonText: 'Get Started',
    active: false,   // ⭐ Ab ye active nahi rahega
  },
];

export const BannerProvider = ({ children }) => {
  const [banners, setBanners] = useLocalStorage('banners', defaultBanners);

  const addBanner = (banner) => {
    const newBanner = { ...banner, id: Date.now(), active: true };
    setBanners((prev) => [...prev, newBanner]);
    return newBanner;
  };

  const updateBanner = (id, data) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  };

  const deleteBanner = (id) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBanner = (id) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
  };

  // Ab active banner ki zaroorat nahi, but context me rakh rahe hain
  const activeBanner = banners.find((b) => b.active);

  return (
    <BannerContext.Provider
      value={{ banners, activeBanner, addBanner, updateBanner, deleteBanner, toggleBanner }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBanners = () => useContext(BannerContext);