import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Checkout = ({ theme }) => {
  const { cart, getTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: '', email: '', phone: '', address: ''
  });
  const [placed, setPlaced] = useState(false);

  if (cart.length === 0 && !placed) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      items: cart,
      total: getTotal(),
    };
    placeOrder(order);
    clearCart();
    setPlaced(true);
    showToast('Order placed successfully!', 'success');
    setTimeout(() => navigate('/'), 2000);
  };

  if (placed) {
    return (
      <div className={`min-h-screen pt-28 flex items-center justify-center ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}>
        <div className={`p-12 rounded-2xl text-center max-w-md mx-4 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white shadow-xl'
        }`}>
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Order Placed!</h2>
          <p className="text-sm opacity-60 mb-4">
            Your order has been confirmed. We'll contact you shortly.
          </p>
          <p className="text-yellow-500 font-semibold">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-28 pb-16 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className="w-full max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center py-8">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-2xl border-2 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow'}`}>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs opacity-60">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">${item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t-2 border-yellow-500">
              <span>Total:</span>
              <span className="text-yellow-500">${getTotal()}</span>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border-2 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow'}`}>
            <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text" placeholder="Full Name"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                required
                className={`w-full p-3 rounded-lg border-2 outline-none focus:border-yellow-500 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'border-gray-300'
                }`}
              />
              <input
                type="email" placeholder="Email"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                required
                className={`w-full p-3 rounded-lg border-2 outline-none focus:border-yellow-500 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'border-gray-300'
                }`}
              />
              <input
                type="tel" placeholder="Phone Number"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                required
                className={`w-full p-3 rounded-lg border-2 outline-none focus:border-yellow-500 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'border-gray-300'
                }`}
              />
              <textarea
                placeholder="Address"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                required
                className={`w-full p-3 rounded-lg border-2 outline-none focus:border-yellow-500 resize-none ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'border-gray-300'
                }`}
                rows="2"
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all active:scale-95 shadow-lg shadow-yellow-500/20"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;