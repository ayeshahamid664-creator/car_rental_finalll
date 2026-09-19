import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import {
  FaShoppingBag, FaDollarSign, FaBoxOpen,
  FaHourglassHalf, FaCheckCircle, FaArrowUp,
} from 'react-icons/fa';

const Dashboard = ({ theme }) => {
  const { orders, stats } = useOrders();
  const { products } = useProducts();

  const cards = [
    {
      label: 'Total Orders',
      value: stats.total,
      icon: <FaShoppingBag />,
      accent: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: <FaHourglassHalf />,
      accent: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: <FaCheckCircle />,
      accent: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Total Revenue',
      value: `$${stats.revenue}`,
      icon: <FaDollarSign />,
      accent: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
  ];

  const categories = products.reduce((acc, p) => {
    acc[p.category || 'Other'] = (acc[p.category || 'Other'] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">

      {/* ── Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
              theme === 'dark'
                ? 'border-white/10 bg-gray-900 hover:border-yellow-500/40'
                : 'border-black/10 bg-white hover:border-yellow-500/40 shadow-sm'
            }`}
          >
            <div className={`w-11 h-11 rounded-2xl ${card.bg} ${card.accent} flex items-center justify-center text-lg mb-5`}>
              {card.icon}
            </div>
            <p className="text-[10px] uppercase tracking-widest opacity-50 font-semibold mb-2">
              {card.label}
            </p>
            <p className={`font-serif text-3xl font-bold ${card.accent}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Orders */}
        <div className={`p-7 rounded-3xl border ${
          theme === 'dark' ? 'bg-gray-900 border-white/10' : 'bg-white border-black/10 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-bold tracking-tight">
              Recent Orders
            </h3>
            <span className="text-[10px] uppercase tracking-widest opacity-50 font-semibold">
              Last 4
            </span>
          </div>

          {orders.length === 0 ? (
            <p className="text-sm opacity-50 text-center py-10">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 4).map(order => (
                <div
                  key={order.id}
                  className={`flex items-center justify-between p-4 rounded-2xl ${
                    theme === 'dark' ? 'bg-white/[0.03]' : 'bg-black/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/15 text-yellow-500 flex items-center justify-center text-xs font-bold">
                      {order.customerName?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{order.customerName}</p>
                      <p className="text-[10px] opacity-50 tracking-wide">
                        #{order.id.toString().slice(-6)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-500 font-bold text-sm">${order.total}</p>
                    <p className={`text-[10px] capitalize font-semibold tracking-wide ${
                      order.status === 'completed' ? 'text-green-500' :
                      order.status === 'pending' ? 'text-yellow-500' :
                      order.status === 'cancelled' ? 'text-red-500' :
                      'text-blue-500'
                    }`}>{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Categories */}
        <div className={`p-7 rounded-3xl border ${
          theme === 'dark' ? 'bg-gray-900 border-white/10' : 'bg-white border-black/10 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-bold tracking-tight">
              Product Categories
            </h3>
            <span className="text-[10px] uppercase tracking-widest opacity-50 font-semibold">
              {products.length} cars
            </span>
          </div>

          <div className="space-y-5">
            {Object.entries(categories).map(([cat, count]) => {
              const percentage = (count / products.length) * 100;
              return (
                <div key={cat}>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-semibold">{cat}</span>
                    <span className="text-xs opacity-50">{count} cars</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                    theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
                  }`}>
                    <div
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;