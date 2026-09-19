import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrash, FaSearch, FaFilter, FaTh, FaList, FaLock } from 'react-icons/fa';

const ProductTable = ({ products, onEdit, onDelete, theme }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const inputCls = `rounded-xl border outline-none text-sm transition-colors focus:border-yellow-500 ${
    theme === 'dark'
      ? 'bg-white/5 border-white/10 text-white placeholder-white/30'
      : 'bg-black/5 border-black/10 text-black placeholder-black/30'
  }`;

  return (
    <div className="space-y-6">
      {/* ── Toolbar */}
      <div className={`p-5 rounded-3xl flex flex-wrap items-center gap-3 border ${
        theme === 'dark' ? 'bg-gray-900 border-white/10' : 'bg-white border-black/10 shadow-sm'
      }`}>
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
          <input
            type="text" placeholder="Search cars..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 ${inputCls}`}
          />
        </div>

        <div className="relative">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={10} />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`pl-9 pr-4 py-2.5 capitalize ${inputCls}`}
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
            ))}
          </select>
        </div>

        <div className={`flex rounded-xl border overflow-hidden ${
          theme === 'dark' ? 'border-white/10' : 'border-black/10'
        }`}>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2.5 transition-colors ${
              viewMode === 'grid'
                ? 'bg-yellow-500 text-black'
                : theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'
            }`}
          >
            <FaTh size={12} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2.5 transition-colors ${
              viewMode === 'list'
                ? 'bg-yellow-500 text-black'
                : theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'
            }`}
          >
            <FaList size={12} />
          </button>
        </div>

        <span className="text-xs opacity-50 font-medium">
          {filtered.length} / {products.length}
        </span>
      </div>

      {/* ── Empty state */}
      {filtered.length === 0 && (
        <div className={`p-16 text-center rounded-3xl border ${
          theme === 'dark' ? 'bg-gray-900 border-white/10' : 'bg-white border-black/10 shadow-sm'
        }`}>
          <p className="font-serif text-xl font-bold mb-2">No cars found</p>
          <p className="text-sm opacity-60">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* ── Grid view */}
      {viewMode === 'grid' && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <div
              key={product.id}
              className={`group rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 relative ${
                theme === 'dark'
                  ? 'border-white/10 bg-gray-900 hover:border-yellow-500/40'
                  : 'border-black/10 bg-white hover:border-yellow-500/40 shadow-sm'
              }`}
            >
              {/* ⭐ Default badge */}
              {product.isLocal && (
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1 text-[10px] bg-black/80 dark:bg-white/10 backdrop-blur text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  <FaLock size={8} /> Default
                </div>
              )}

              <div className={`h-40 flex items-center justify-center relative ${
                theme === 'dark' ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
              }`}>
                <img
                  src={theme === 'dark' ? (product.imageDark || product.image) : product.image}
                  alt={product.name}
                  className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = product.image;
                  }}
                />
                {product.category && (
                  <span className="absolute top-3 right-3 text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {product.category}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-base">{product.name}</h3>
                    <p className="text-[10px] opacity-50 tracking-wide mt-0.5">
                      {product.mileage || '—'}
                    </p>
                  </div>
                  <p className="font-serif font-bold text-yellow-500">
                    ${product.price}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => !product.isLocal && onEdit(product)}
                    disabled={product.isLocal}
                    title={product.isLocal ? 'Default car — cannot be edited' : 'Edit'}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      product.isLocal
                        ? 'bg-gray-500/10 text-gray-500 cursor-not-allowed opacity-60'
                        : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    <FaEdit size={10} /> Edit
                  </button>
                  <button
                    onClick={() => !product.isLocal && onDelete(product)}
                    disabled={product.isLocal}
                    title={product.isLocal ? 'Default car — cannot be deleted' : 'Delete'}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      product.isLocal
                        ? 'bg-gray-500/10 text-gray-500 cursor-not-allowed opacity-60'
                        : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <FaTrash size={10} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── List view */}
      {viewMode === 'list' && filtered.length > 0 && (
        <div className={`rounded-3xl overflow-hidden border ${
          theme === 'dark' ? 'border-white/10 bg-gray-900' : 'border-black/10 bg-white shadow-sm'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-white/[0.03]' : 'bg-black/[0.02]'}>
                <tr className="text-left">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest opacity-50 font-semibold">Car</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest opacity-50 font-semibold">Category</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest opacity-50 font-semibold">Mileage</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest opacity-50 font-semibold">Price</th>
                  <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest opacity-50 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr
                    key={p.id}
                    className={`border-t transition-colors ${
                      theme === 'dark'
                        ? 'border-white/5 hover:bg-white/[0.03]'
                        : 'border-black/5 hover:bg-black/[0.02]'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
                        }`}>
                          <img
                            src={theme === 'dark' ? (p.imageDark || p.image) : p.image}
                            alt={p.name}
                            className="max-w-[80%] max-h-[80%] object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = p.image;
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{p.name}</span>
                          {p.isLocal && (
                            <span className="text-[9px] bg-black/80 dark:bg-white/10 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                              <FaLock size={7} /> Default
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] bg-yellow-500/15 text-yellow-500 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                        {p.category || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm opacity-70">{p.mileage || '—'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-yellow-500">${p.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => !p.isLocal && onEdit(p)}
                          disabled={p.isLocal}
                          title={p.isLocal ? 'Default car — cannot be edited' : 'Edit'}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            p.isLocal
                              ? 'bg-gray-500/10 text-gray-500 cursor-not-allowed opacity-60'
                              : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white'
                          }`}
                        >
                          <FaEdit size={11} />
                        </button>
                        <button
                          onClick={() => !p.isLocal && onDelete(p)}
                          disabled={p.isLocal}
                          title={p.isLocal ? 'Default car — cannot be deleted' : 'Delete'}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            p.isLocal
                              ? 'bg-gray-500/10 text-gray-500 cursor-not-allowed opacity-60'
                              : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          <FaTrash size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;