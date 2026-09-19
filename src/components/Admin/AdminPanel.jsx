import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../context/ToastContext';
import { useBanners } from '../../context/BannerContext';
import {
  FaTrash, FaPlus, FaBoxOpen, FaShoppingBag,
  FaDollarSign, FaImage, FaSignOutAlt
} from 'react-icons/fa';

import Dashboard from './Dashboard';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import ConfirmModal from './ConfirmModal';

const AdminPanel = ({ theme }) => {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const { orders, updateOrderStatus, deleteOrder, stats } = useOrders();
  const { banners, addBanner, updateBanner, deleteBanner, toggleBanner } = useBanners();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', image: '', imageDark: '', mileage: '', category: '',
  });

  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerForm, setBannerForm] = useState({
    title: '', subtitle: '', description: '', buttonText: '',
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false, title: '', message: '', onConfirm: null,
  });

  const openConfirm = (title, message, onConfirm) =>
    setConfirmModal({ isOpen: true, title, message, onConfirm });
  const closeConfirm = () =>
    setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });

  // ── Products
  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { ...formData, price: Number(formData.price) };
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      showToast('Product updated!', 'success');
      setEditingProduct(null);
    } else {
      addProduct(productData);
      showToast('Product added!', 'success');
    }
    setFormData({ name: '', price: '', image: '', imageDark: '', mileage: '', category: '' });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (product) => {
    openConfirm(
      'Delete Product?',
      `Are you sure you want to delete "${product.name}"?`,
      () => {
        deleteProduct(product.id);
        showToast('Product deleted', 'warning');
        closeConfirm();
      }
    );
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', image: '', imageDark: '', mileage: '', category: '' });
  };

  const handleReset = () => {
    openConfirm(
      'Reset Products?',
      'All products will be restored to defaults.',
      () => {
        resetProducts();
        showToast('Products reset!', 'info');
        closeConfirm();
      }
    );
  };

  // ── Banners
  const handleBannerSubmit = (e) => {
    e.preventDefault();
    if (editingBanner) {
      updateBanner(editingBanner.id, bannerForm);
      showToast('Banner updated!', 'success');
      setEditingBanner(null);
    } else {
      addBanner(bannerForm);
      showToast('Banner added!', 'success');
    }
    setBannerForm({ title: '', subtitle: '', description: '', buttonText: '' });
  };

  const handleBannerEdit = (banner) => {
    setEditingBanner(banner);
    setBannerForm(banner);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBannerDelete = (banner) => {
    openConfirm(
      'Delete Banner?',
      `Delete "${banner.subtitle}" banner?`,
      () => {
        deleteBanner(banner.id);
        showToast('Banner deleted', 'warning');
        closeConfirm();
      }
    );
  };

  // ── Orders
  const handleOrderDelete = (order) => {
    openConfirm(
      'Delete Order?',
      `Delete order from ${order.customerName}?`,
      () => {
        deleteOrder(order.id);
        showToast('Order deleted', 'warning');
        closeConfirm();
      }
    );
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth');
    window.location.reload();
  };

  const inputCls = `w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors focus:border-yellow-500 ${
    theme === 'dark'
      ? 'bg-white/5 border-white/10 text-white placeholder-white/30'
      : 'bg-black/5 border-black/10 text-black placeholder-black/30'
  }`;

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: <FaDollarSign /> },
    { key: 'products', label: 'Products', count: products.length, icon: <FaBoxOpen /> },
    { key: 'orders', label: 'Orders', count: orders.length, icon: <FaShoppingBag /> },
    { key: 'banners', label: 'Banners', count: banners.length, icon: <FaImage /> },
  ];

  return (
    <>
      <div className={`min-h-screen pt-32 pb-16 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

          {/* ── Header */}
          <div className="flex flex-wrap justify-between items-end gap-6 pb-10 border-b border-current/10">
            <div>
              <p className="text-yellow-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                Control Center
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-sm opacity-60 mt-2">
                Manage products, orders, and banners from one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className={`text-xs px-4 py-2 rounded-full border transition-colors ${
                  theme === 'dark'
                    ? 'border-white/10 hover:border-yellow-500 hover:text-yellow-500'
                    : 'border-black/10 hover:border-yellow-500 hover:text-yellow-500'
                }`}
              >
                Reset Products
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                <FaSignOutAlt size={11} /> Logout
              </button>
            </div>
          </div>

          {/* ── Tabs (pill style) */}
          <div className="flex flex-wrap gap-2 py-8">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === t.key
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                    : theme === 'dark'
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-black/5 hover:bg-black/10'
                }`}
              >
                {t.icon}
                {t.label}
                {typeof t.count === 'number' && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeTab === t.key
                      ? 'bg-black/20 text-black'
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Dashboard */}
          {activeTab === 'dashboard' && <Dashboard theme={theme} />}

          {/* ── Products */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              <ProductForm
                theme={theme}
                formData={formData}
                handleChange={handleFormChange}
                handleSubmit={handleSubmit}
                editingProduct={editingProduct}
                onCancel={handleCancelEdit}
              />
              <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
                theme={theme}
              />
            </div>
          )}

          {/* ── Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className={`p-16 text-center rounded-3xl border ${
                  theme === 'dark' ? 'bg-gray-900 border-white/10' : 'bg-white border-black/10 shadow-sm'
                }`}>
                  <FaShoppingBag className="text-5xl text-yellow-500/30 mx-auto mb-4" />
                  <p className="font-serif text-xl font-bold">No orders yet</p>
                  <p className="text-sm opacity-60 mt-2">
                    Orders will appear here when customers place them.
                  </p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-6 rounded-3xl border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'border-white/10 bg-gray-900 hover:border-yellow-500/40'
                        : 'border-black/10 bg-white hover:border-yellow-500/40 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-wrap justify-between items-start gap-6">
                      <div className="flex-1 min-w-[260px]">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-11 h-11 rounded-2xl bg-yellow-500/15 text-yellow-500 flex items-center justify-center font-bold text-sm">
                            #{order.id.toString().slice(-3)}
                          </div>
                          <div>
                            <p className="font-semibold">{order.customerName}</p>
                            <p className="text-xs opacity-50">{order.customerEmail}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 font-semibold mb-1">Phone</p>
                            <p className="font-medium text-xs">{order.customerPhone || '—'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 font-semibold mb-1">Items</p>
                            <p className="font-medium text-xs">{order.items?.length || 0} cars</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 font-semibold mb-1">Total</p>
                            <p className="font-bold text-sm text-yellow-500">${order.total}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 font-semibold mb-1">Date</p>
                            <p className="font-medium text-xs">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {order.items && order.items.length > 0 && (
                          <div className="mt-5 pt-5 border-t border-current/10">
                            <p className="text-[10px] uppercase tracking-widest opacity-40 font-semibold mb-2">
                              Ordered Cars
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {order.items.map(item => (
                                <span
                                  key={item.id}
                                  className={`text-xs px-3 py-1 rounded-full ${
                                    theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
                                  }`}
                                >
                                  {item.name} × {item.quantity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 min-w-[170px]">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            updateOrderStatus(order.id, e.target.value);
                            showToast(`Order status: ${e.target.value}`, 'info');
                          }}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-semibold capitalize outline-none transition-colors focus:border-yellow-500 ${
                            theme === 'dark'
                              ? 'bg-white/5 border-white/10'
                              : 'bg-black/5 border-black/10'
                          }`}
                        >
                          <option value="pending">⏳ Pending</option>
                          <option value="confirmed">✅ Confirmed</option>
                          <option value="completed">🎉 Completed</option>
                          <option value="cancelled">❌ Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleOrderDelete(order)}
                          className="text-red-500 text-xs hover:underline flex items-center justify-center gap-1.5 py-1"
                        >
                          <FaTrash size={10} /> Delete Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── Banners */}
          {activeTab === 'banners' && (
            <div className="space-y-8">
              <div className={`p-8 rounded-3xl border ${
                theme === 'dark' ? 'bg-gray-900 border-white/10' : 'bg-white border-black/10 shadow-sm'
              }`}>
                <div className="mb-6">
                  <h2 className="font-serif text-2xl font-bold tracking-tight">
                    {editingBanner ? 'Edit Banner' : 'Add New Banner'}
                  </h2>
                  <p className="text-sm opacity-60 mt-1">
                    These banners will appear on the homepage.
                  </p>
                </div>

                <form onSubmit={handleBannerSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="Title (small text)"
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                    required className={inputCls}
                  />
                  <input
                    type="text" placeholder="Subtitle (big text)"
                    value={bannerForm.subtitle}
                    onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                    required className={inputCls}
                  />
                  <input
                    type="text" placeholder="Button text"
                    value={bannerForm.buttonText}
                    onChange={(e) => setBannerForm({ ...bannerForm, buttonText: e.target.value })}
                    className={inputCls}
                  />
                  <input
                    type="text" placeholder="Extra field (optional)"
                    value={bannerForm.image || ''}
                    onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })}
                    className={inputCls}
                  />
                  <textarea
                    placeholder="Description"
                    value={bannerForm.description}
                    onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                    rows="2"
                    className={`md:col-span-2 ${inputCls} resize-none`}
                  />
                  <button
                    type="submit"
                    className="bg-yellow-500 text-black px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-yellow-400 md:col-span-2 flex items-center justify-center gap-2 transition-colors shadow-lg shadow-yellow-500/20"
                  >
                    <FaPlus size={12} /> {editingBanner ? 'Update Banner' : 'Add Banner'}
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {banners.map((b) => (
                  <div
                    key={b.id}
                    className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                      theme === 'dark'
                        ? 'border-white/10 bg-gray-900 hover:border-yellow-500/40'
                        : 'border-black/10 bg-white hover:border-yellow-500/40 shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-serif text-lg font-bold">{b.subtitle}</h3>
                        <p className="text-yellow-500 text-xs font-semibold tracking-wide mt-0.5">{b.title}</p>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        b.active
                          ? 'bg-green-500/15 text-green-500'
                          : 'bg-gray-500/15 text-gray-500'
                      }`}>
                        {b.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm opacity-70 mb-5 leading-relaxed">{b.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleBanner(b.id)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                          b.active
                            ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'
                            : 'bg-gray-500/10 text-gray-500 hover:bg-gray-500 hover:text-white'
                        }`}
                      >
                        {b.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleBannerEdit(b)}
                        className="flex-1 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleBannerDelete(b)}
                        className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={closeConfirm}
        theme={theme}
      />
    </>
  );
};

export default AdminPanel;