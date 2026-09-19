// src/context/ProductContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch products
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();

    // Real-time updates
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

  // ── Add product
  const addProduct = async (product) => {
    const { error } = await supabase.from('products').insert([
      {
        name: product.name,
        price: Number(product.price),
        image: product.image,
        image_dark: product.imageDark || product.image,
        mileage: product.mileage,
        category: product.category,
      },
    ]);
    if (error) console.error('Add product error:', error);
  };

  // ── Update product
  const updateProduct = async (id, data) => {
    const { error } = await supabase
      .from('products')
      .update({
        name: data.name,
        price: Number(data.price),
        image: data.image,
        image_dark: data.imageDark || data.image,
        mileage: data.mileage,
        category: data.category,
      })
      .eq('id', id);
    if (error) console.error('Update product error:', error);
  };

  // ── Delete product
  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) console.error('Delete product error:', error);
  };

  // ── Reset products
  const resetProducts = async () => {
    const { error } = await supabase.from('products').delete().neq('id', 0);
    if (error) console.error('Reset products error:', error);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);