import React from 'react';
import { FaPlus, FaTimes, FaImage } from 'react-icons/fa';

const ProductForm = ({
  theme, formData, handleChange, handleSubmit,
  editingProduct, onCancel,
}) => {
  const inputCls = `w-full px-4 py-3 rounded-xl border outline-none text-sm transition-colors focus:border-yellow-500 ${
    theme === 'dark'
      ? 'bg-white/5 border-white/10 text-white placeholder-white/30'
      : 'bg-black/5 border-black/10 text-black placeholder-black/30'
  }`;

  const labelCls = "text-[10px] uppercase tracking-widest opacity-50 font-semibold mb-2 block";

  return (
    <div className={`p-8 rounded-3xl border ${
      theme === 'dark' ? 'bg-gray-900 border-white/10' : 'bg-white border-black/10 shadow-sm'
    }`}>
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="font-serif text-2xl font-bold tracking-tight">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-sm opacity-60 mt-1">
            {editingProduct ? 'Update the car details below.' : 'Fill in the details to add a new car.'}
          </p>
        </div>
        {editingProduct && (
          <span className="text-[10px] bg-yellow-500/15 text-yellow-500 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Editing
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Car Name *</label>
          <input
            type="text" name="name" placeholder="e.g. BMW UX"
            value={formData.name} onChange={handleChange} required
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Price per Day *</label>
          <input
            type="number" name="price" placeholder="e.g. 100"
            value={formData.price} onChange={handleChange} required
            className={inputCls}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelCls}>Light Image URL *</label>
          <input
            type="text" name="image" placeholder="https://..."
            value={formData.image} onChange={handleChange} required
            className={inputCls}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelCls}>Dark Image URL (optional)</label>
          <input
            type="text" name="imageDark" placeholder="https://... (khali chhodein to light image use hogi)"
            value={formData.imageDark} onChange={handleChange}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Mileage</label>
          <input
            type="text" name="mileage" placeholder="e.g. 12km"
            value={formData.mileage} onChange={handleChange}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Category</label>
          <select
            name="category" value={formData.category} onChange={handleChange}
            className={inputCls}
          >
            <option value="">Select category</option>
            <option value="Luxury">Luxury</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Sports">Sports</option>
            <option value="Economy">Economy</option>
          </select>
        </div>

        {/* ⭐ Dual Preview: Light + Dark */}
        {formData.image && (
          <div className="md:col-span-2">
            <label className={labelCls + " flex items-center gap-2"}>
              <FaImage /> Preview (Light & Dark Mode)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Light preview */}
              <div className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center ${
                theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'
              }`}>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-semibold mb-3">
                  ☀️ Light Mode
                </p>
                <img
                  src={formData.image} alt="light preview"
                  className="max-h-28 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              {/* Dark preview */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-white/10 bg-black flex flex-col items-center justify-center">
                <p className="text-[10px] uppercase tracking-widest opacity-70 font-semibold mb-3 text-white">
                  🌙 Dark Mode
                </p>
                <img
                  src={formData.imageDark || formData.image} alt="dark preview"
                  className="max-h-28 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>

            {!formData.imageDark && (
              <p className="text-xs text-yellow-500 mt-3 opacity-80 flex items-center gap-2">
                ⚠️ Dark image khali hai — dark mode mein bhi yehi light image dikhegi.
              </p>
            )}
          </div>
        )}

        <div className="md:col-span-2 flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 md:flex-none bg-yellow-500 text-black px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-yellow-400 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
          >
            <FaPlus size={12} /> {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
          {editingProduct && (
            <button
              type="button" onClick={onCancel}
              className={`px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10'
                  : 'bg-black/5 hover:bg-black/10'
              }`}
            >
              <FaTimes size={12} /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;