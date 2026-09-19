import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch orders
  const fetchOrders = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mapped = (data || []).map((o) => ({
        id: o.id,
        customerName: o.customer_name,
        customerEmail: o.customer_email,
        customerPhone: o.customer_phone,
        customerAddress: o.customer_address,
        items: o.items || [],
        total: Number(o.total),
        status: o.status,
        createdAt: o.created_at,
      }));

      setOrders(mapped);
    } catch (err) {
      console.error('Fetch orders error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ── Place order
  const placeOrder = async (orderData) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          customer_name: orderData.customerName,
          customer_email: orderData.customerEmail,
          customer_phone: orderData.customerPhone,
          customer_address: orderData.customerAddress,
          items: orderData.items,
          total: orderData.total,
          status: 'pending',
        }])
        .select()
        .single();

      if (error) throw error;

      const newOrder = {
        id: data.id,
        customerName: data.customer_name,
        customerEmail: data.customer_email,
        customerPhone: data.customer_phone,
        customerAddress: data.customer_address,
        items: data.items || [],
        total: Number(data.total),
        status: data.status,
        createdAt: data.created_at,
      };

      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      console.error('Place order error:', err);
      throw err;
    }
  };

  // ── Update status
  const updateOrderStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    } catch (err) {
      console.error('Update order status error:', err);
      throw err;
    }
  };

  // ── Delete
  const deleteOrder = async (id) => {
    try {
      const { error } = await supabase.from('orders').delete().eq('id', id);
      if (error) throw error;
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error('Delete order error:', err);
      throw err;
    }
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
      value={{ orders, loading, placeOrder, updateOrderStatus, deleteOrder, stats, refetch: fetchOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);