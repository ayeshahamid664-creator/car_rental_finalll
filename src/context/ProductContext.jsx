import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { supabase } from '../lib/supabase';

import bmwUxLight from '../assets/bmw ux.jpeg';
import bmwUxDark from '../assets/bmw ux black ground.png';
import kiaUxLight from '../assets/kia ux.jpeg';
import kiaUxDark from '../assets/kia ux black background.png';
import bmwUxPremiumLight from '../assets/gray bmw ux.jpeg';
import bmwUxPremiumDark from '../assets/grey bmw black back ground.png';

const ProductContext = createContext();

// ⭐ SIRF YE 3 CARDS LOCAL RAHENGE (kabhi delete nahi honge)
const LOCAL_CARS = [
  { id: 'local-1', name: 'BMW UX', price: 100, image: bmwUxLight, imageDark: bmwUxDark, mileage: '12km', category: 'Luxury', isLocal: true },
  { id: 'local-2', name: 'KIA UX', price: 140, image: kiaUxLight, imageDark: kiaUxDark, mileage: '15km', category: 'SUV', isLocal: true },
  { id: 'local-3', name: 'BMW UX Premium', price: 100, image: bmwUxPremiumLight, imageDark: bmwUxPremiumDark, mileage: '10km', category: 'Luxury', isLocal: true },
];

export const ProductProvider = ({ children }) => {
  const [remoteProducts, setRemoteProducts] = useState([]); // Supabase se
  const [loading, setLoading] = useState(true);

  // ── Fetch from Supabase
  const fetchProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map snake_case to camelCase
      const mapped = (data || []).map((p) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        image: p.image,
        imageDark: p.image_dark || p.image,
        mileage: p.mileage,
        category: p.category,
        isLocal: false,
      }));

      setRemoteProducts(mapped);
    } catch (err) {
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ⭐ Combine: Local cards pehle, phir Supabase wale
  const products = [...LOCAL_CARS, ...remoteProducts];

  // ── Add (sirf Supabase mein jayega)
  const addProduct = async (product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: product.name,
          price: Number(product.price),
          image: product.image,
          image_dark: product.imageDark || product.image,
          mileage: product.mileage,
          category: product.category,
        }])
        .select()
        .single();

      if (error) throw error;

      const newProduct = {
        id: data.id,
        name: data.name,
        price: Number(data.price),
        image: data.image,
        imageDark: data.image_dark || data.image,
        mileage: data.mileage,
        category: data.category,
        isLocal: false,
      };

      setRemoteProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      console.error('Add product error:', err);
      throw err;
    }
  };

  // ── Update (sirf Supabase wale)
  const updateProduct = async (id, updatedData) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: updatedData.name,
          price: Number(updatedData.price),
          image: updatedData.image,
          image_dark: updatedData.imageDark || updatedData.image,
          mileage: updatedData.mileage,
          category: updatedData.category,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setRemoteProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                id: data.id,
                name: data.name,
                price: Number(data.price),
                image: data.image,
                imageDark: data.image_dark || data.image,
                mileage: data.mileage,
                category: data.category,
                isLocal: false,
              }
            : p
        )
      );
    } catch (err) {
      console.error('Update product error:', err);
      throw err;
    }
  };

  // ── Delete (sirf Supabase wale)
  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setRemoteProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete product error:', err);
      throw err;
    }
  };

  // ── Reset (sirf Supabase wale delete honge, local safe hain)
  const resetProducts = async () => {
    try {
      const ids = remoteProducts.map((p) => p.id);
      if (ids.length > 0) {
        const { error } = await supabase.from('products').delete().in('id', ids);
        if (error) throw error;
      }
      setRemoteProducts([]);
    } catch (err) {
      console.error('Reset products error:', err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, addProduct, updateProduct, deleteProduct, resetProducts, refetch: fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);