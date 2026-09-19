import React, { createContext, useState, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

import bmwUxLight from '../assets/bmw ux.jpeg';
import bmwUxDark from '../assets/bmw ux black ground.png';
import kiaUxLight from '../assets/kia ux.jpeg';
import kiaUxDark from '../assets/kia ux black background.png';
import bmwUxPremiumLight from '../assets/gray bmw ux.jpeg';
import bmwUxPremiumDark from '../assets/grey bmw black back ground.png';

const ProductContext = createContext();

const defaultCars = [
  { id: 1, name: 'BMW UX', price: 100, image: bmwUxLight, imageDark: bmwUxDark, mileage: '12km', category: 'Luxury' },
  { id: 2, name: 'KIA UX', price: 140, image: kiaUxLight, imageDark: kiaUxDark, mileage: '15km', category: 'SUV' },
  { id: 3, name: 'BMW UX Premium', price: 100, image: bmwUxPremiumLight, imageDark: bmwUxPremiumDark, mileage: '10km', category: 'Luxury' },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useLocalStorage('products', defaultCars);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const addProduct = (product) => {
    const newProduct = { 
      ...product, 
      id: Date.now(),
      imageDark: product.imageDark || product.image,  // ⭐ Fallback
    };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) => prev.map((p) => {
      if (p.id === id) {
        const merged = { ...p, ...updatedData };
        if (!merged.imageDark) merged.imageDark = merged.image;  // ⭐ Fallback
        return merged;
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetProducts = () => setProducts(defaultCars);

  return (
    <ProductContext.Provider
      value={{ products, loading, addProduct, updateProduct, deleteProduct, resetProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);