import React from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaTrash } from 'react-icons/fa';

const CartDrawer = ({ isOpen, onClose, theme }) => {
  const { cart, removeFromCart, updateQuantity, getTotal, getItemCount } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRemove = (id, name) => {
    removeFromCart(id);
    showToast(`${name} removed from cart`, 'warning');
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md shadow-xl overflow-y-auto transition-transform duration-300 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
      >
        <div className="p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Cart ({getItemCount()})</h2>
          <button onClick={onClose} className="text-3xl hover:text-yellow-500">
            <FaTimes />
          </button>
        </div>

        <div className="p-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-yellow-500">${item.price}/day</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded hover:bg-yellow-500 hover:text-black">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded hover:bg-yellow-500 hover:text-black">+</button>
                    </div>
                  </div>
                  <button onClick={() => handleRemove(item.id, item.name)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className="mt-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>${getTotal()}</span>
                </div>
                <button
                  onClick={() => { onClose(); navigate('/checkout'); }}
                  className="w-full mt-4 bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;