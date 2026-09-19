import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch banners
  const fetchBanners = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mapped = (data || []).map((b) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        description: b.description,
        buttonText: b.button_text,
        image: b.image,
        active: b.active,
      }));

      setBanners(mapped);
    } catch (err) {
      console.error('Fetch banners error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // ── Add
  const addBanner = async (banner) => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .insert([{
          title: banner.title,
          subtitle: banner.subtitle,
          description: banner.description,
          button_text: banner.buttonText,
          image: banner.image,
          active: true,
        }])
        .select()
        .single();

      if (error) throw error;

      const newBanner = {
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        buttonText: data.button_text,
        image: data.image,
        active: data.active,
      };

      setBanners((prev) => [newBanner, ...prev]);
      return newBanner;
    } catch (err) {
      console.error('Add banner error:', err);
      throw err;
    }
  };

  // ── Update
  const updateBanner = async (id, bannerData) => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .update({
          title: bannerData.title,
          subtitle: bannerData.subtitle,
          description: bannerData.description,
          button_text: bannerData.buttonText,
          image: bannerData.image,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setBanners((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                id: data.id,
                title: data.title,
                subtitle: data.subtitle,
                description: data.description,
                buttonText: data.button_text,
                image: data.image,
                active: data.active,
              }
            : b
        )
      );
    } catch (err) {
      console.error('Update banner error:', err);
      throw err;
    }
  };

  // ── Delete
  const deleteBanner = async (id) => {
    try {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (error) throw error;
      setBanners((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error('Delete banner error:', err);
      throw err;
    }
  };

  // ── Toggle active
  const toggleBanner = async (id) => {
    try {
      const banner = banners.find((b) => b.id === id);
      if (!banner) return;

      const { error } = await supabase
        .from('banners')
        .update({ active: !banner.active })
        .eq('id', id);

      if (error) throw error;

      setBanners((prev) =>
        prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
      );
    } catch (err) {
      console.error('Toggle banner error:', err);
      throw err;
    }
  };

  const activeBanner = banners.find((b) => b.active);

  return (
    <BannerContext.Provider
      value={{ banners, loading, activeBanner, addBanner, updateBanner, deleteBanner, toggleBanner, refetch: fetchBanners }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBanners = () => useContext(BannerContext);