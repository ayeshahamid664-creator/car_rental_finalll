// src/context/OrderContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch orders
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        fetchOrders
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // ── Place order
  const placeOrder = async (orderData) => {
    const { error } = await supabase.from('orders').insert([
      {
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        customer_address: orderData.customerAddress,
        items: orderData.items,
        total: Number(orderData.total),
        status: 'pending',
      },
    ]);
    if (error) console.error('Place order error:', error);
  };

  // ── Update order status
  const updateOrderStatus = async (id, status) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    if (error) console.error('Update order status error:', error);
  };

  // ── Delete order
  const deleteOrder = async (id) => {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) console.error('Delete order error:', error);
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    completed: orders.filter((o) => o.status === 'completed').length,
    revenue: orders
      .filter((o) => o.status === 'completed')
      .reduce((sum, o) => sum + (o.total || 0), 0),
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        stats,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);