// src/context/ProductContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase';

// ⭐ ORIGINAL 3 CARS — inhe hum localStorage mein rakhenge
import bmwUxLight from '../assets/bmw ux.jpeg';
import bmwUxDark from '../assets/bmw ux black ground.png';
import kiaUxLight from '../assets/kia ux.jpeg';
import kiaUxDark from '../assets/kia ux black background.png';
import bmwUxPremiumLight from '../assets/gray bmw ux.jpeg';
import bmwUxPremiumDark from '../assets/grey bmw black back ground.png';

const ProductContext = createContext();

const ORIGINALS_KEY = 'original-cars-v1';

// ⭐ ORIGINAL 3 CARS — hardcoded, image_dark (snake_case) for consistency
const ORIGINAL_CARS = [
  {
    id: 1,
    name: 'BMW UX',
    price: 100,
    image: bmwUxLight,
    image_dark: bmwUxDark,
    mileage: '12km',
    category: 'Luxury',
    isOriginal: true,
  },
  {
    id: 2,
    name: 'KIA UX',
    price: 140,
    image: kiaUxLight,
    image_dark: kiaUxDark,
    mileage: '15km',
    category: 'SUV',
    isOriginal: true,
  },
  {
    id: 3,
    name: 'BMW UX Premium',
    price: 100,
    image: bmwUxPremiumLight,
    image_dark: bmwUxPremiumDark,
    mileage: '10km',
    category: 'Luxury',
    isOriginal: true,
  },
];

// ── localStorage se originals load karo (agar user ne customize kiye ho)
// Note: images ko localStorage mein save nahi kar sakte (base64 huge hoti hai),
// isliye hum sirf metadata save karenge aur images code se hi use karenge.
const loadOriginals = () => {
  try {
    const saved = localStorage.getItem(ORIGINALS_KEY);
    if (!saved) return ORIGINAL_CARS;
    const parsed = JSON.parse(saved);
    // Merge saved metadata with current image imports
    return ORIGINAL_CARS.map((car, i) => ({
      ...car,
      ...(parsed[i] || {}),
      image: car.image,           // image hamesha code se
      image_dark: car.image_dark, // image_dark hamesha code se
      isOriginal: true,
    }));
  } catch {
    return ORIGINAL_CARS;
  }
};

export const ProductProvider = ({ children }) => {
  // ⭐ ORIGINAL CARS — localStorage wali state
  const [originalCars, setOriginalCars] = useState(loadOriginals);

  // ⭐ ADMIN CARS — Supabase wali state
  const [adminProducts, setAdminProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  // ── Persist originals to localStorage whenever they change
  useEffect(() => {
    try {
      // Sirf metadata save karo (images chhod do)
      const meta = originalCars.map(({ id, name, price, mileage, category }) => ({
        id, name, price, mileage, category,
      }));
      localStorage.setItem(ORIGINALS_KEY, JSON.stringify(meta));
    } catch (e) {
      console.error('localStorage save error:', e);
    }
  }, [originalCars]);

  // ── Fetch admin products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setAdminProducts(data);
    if (error) console.error('Fetch products error:', error);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        fetchProducts
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // ⭐ MERGED: Original (localStorage) + Admin (Supabase)
  const products = [...originalCars, ...adminProducts];

  // ── ADD: sirf Supabase mein jayega
  const addProduct = async (product) => {
    const { error } = await supabase.from('products').insert([
      {
        name: product.name,
        price: Number(product.price),
        image: product.image,
        image_dark: product.imageDark || product.image_dark || product.image,
        mileage: product.mileage,
        category: product.category,
      },
    ]);
    if (error) console.error('Add product error:', error);
  };

  // ── UPDATE: sirf admin wali update hogi
  const updateProduct = async (id, data) => {
    const isOriginal = originalCars.some((c) => c.id === id);
    if (isOriginal) {
      console.warn('⚠️ Original cars ko Supabase se update nahi kar sakte');
      return;
    }

    const { error } = await supabase
      .from('products')
      .update({
        name: data.name,
        price: Number(data.price),
        image: data.image,
        image_dark: data.imageDark || data.image_dark || data.image,
        mileage: data.mileage,
        category: data.category,
      })
      .eq('id', id);
    if (error) console.error('Update product error:', error);
  };

  // ── DELETE: sirf admin wali delete hogi
  const deleteProduct = async (id) => {
    const isOriginal = originalCars.some((c) => c.id === id);
    if (isOriginal) {
      console.warn('⚠️ Original cars delete nahi kar sakte');
      return;
    }

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) console.error('Delete product error:', error);
  };

  // ── RESET: sirf admin wali reset hongi (originals safe rahenge)
  const resetProducts = async () => {
    const { error } = await supabase.from('products').delete().neq('id', 0);
    if (error) console.error('Reset products error:', error);
  };

  // ── Optional: Original cars ka metadata update karo (localStorage)
  // Agar aap kabhi original cars ka price/name change karna chaho
  const updateOriginalCar = (id, data) => {
    setOriginalCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data, isOriginal: true } : c))
    );
  };

  const resetOriginalCars = () => {
    localStorage.removeItem(ORIGINALS_KEY);
    setOriginalCars(ORIGINAL_CARS);
  };

  return (
    <ProductContext.Provider
      value={{
        products,          // ⭐ MERGED — jo CarList use karega
        originalCars,      // ⭐ Sirf 3 originals
        adminProducts,     // ⭐ Sirf admin wali
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        updateOriginalCar, // (optional)
        resetOriginalCars, // (optional)
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);