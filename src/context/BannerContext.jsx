// src/context/BannerContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch banners
  const fetchBanners = async () => {
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setBanners(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();

    // Real-time updates
    const channel = supabase
      .channel('banners-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'banners' },
        fetchBanners
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // ── Add banner
  const addBanner = async (banner) => {
    const { error } = await supabase.from('banners').insert([
      {
        title: banner.title,
        subtitle: banner.subtitle,
        description: banner.description,
        button_text: banner.buttonText,
        active: true,
      },
    ]);
    if (error) console.error('Add banner error:', error);
  };

  // ── Update banner
  const updateBanner = async (id, data) => {
    const { error } = await supabase
      .from('banners')
      .update({
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        button_text: data.buttonText,
      })
      .eq('id', id);
    if (error) console.error('Update banner error:', error);
  };

  // ── Delete banner
  const deleteBanner = async (id) => {
    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (error) console.error('Delete banner error:', error);
  };

  // ── Toggle banner
  const toggleBanner = async (id) => {
    const banner = banners.find((b) => b.id === id);
    if (!banner) return;
    const { error } = await supabase
      .from('banners')
      .update({ active: !banner.active })
      .eq('id', id);
    if (error) console.error('Toggle banner error:', error);
  };

  const activeBanner = banners.find((b) => b.active);

  return (
    <BannerContext.Provider
      value={{
        banners,
        loading,
        activeBanner,
        addBanner,
        updateBanner,
        deleteBanner,
        toggleBanner,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBanners = () => useContext(BannerContext);