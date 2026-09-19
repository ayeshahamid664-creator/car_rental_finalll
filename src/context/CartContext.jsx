// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase';

const CartContext = createContext();

// ── Har browser ke liye unique session ID
const getSessionId = () => {
  let id = localStorage.getItem('cart-session-id');
  if (!id) {
    id = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('cart-session-id', id);
  }
  return id;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionId] = useState(getSessionId);

  // ── Fetch cart (sirf is user ka)
  const fetchCart = async () => {
    const { data, error } = await supabase
      .from('cart')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (!error && data) setCart(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();

    // Real-time updates
    const channel = supabase
      .channel(`cart-changes-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cart',
          filter: `session_id=eq.${sessionId}`,
        },
        fetchCart
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [sessionId]);

  // ── Add to cart
  const addToCart = async (car) => {
    const existing = cart.find((item) => item.product_id === car.id);

    if (existing) {
      const { error } = await supabase
        .from('cart')
        .update({ quantity: existing.quantity + 1 })
        .eq('id', existing.id);
      if (error) console.error('Update cart error:', error);
    } else {
      const { error } = await supabase.from('cart').insert([
        {
          session_id: sessionId,
          product_id: car.id,
          name: car.name,
          price: car.price,
          image: car.image,
          image_dark: car.image_dark || car.imageDark || car.image,
          quantity: 1,
        },
      ]);
      if (error) console.error('Add to cart error:', error);
    }
    fetchCart();
  };

  // ── Remove from cart
  const removeFromCart = async (id) => {
    const { error } = await supabase.from('cart').delete().eq('id', id);
    if (error) console.error('Remove from cart error:', error);
    fetchCart();
  };

  // ── Update quantity
  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }
    const { error } = await supabase
      .from('cart')
      .update({ quantity })
      .eq('id', id);
    if (error) console.error('Update quantity error:', error);
    fetchCart();
  };

  // ── Clear cart (sirf is user ka)
  const clearCart = async () => {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('session_id', sessionId);
    if (error) console.error('Clear cart error:', error);
    fetchCart();
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getItemCount = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);