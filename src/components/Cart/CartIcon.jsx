import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = ({ onClick }) => {
  const { getItemCount } = useCart();
  const count = getItemCount();

  return (
    <button onClick={onClick} className="relative text-2xl hover:text-yellow-500 transition-colors">
      <FaShoppingCart />
      {count > 0 && (
        <span className="absolute -top-2 -right-3 bg-yellow-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {count}
        </span>
      )}
    </button>
  );
};

export default CartIcon;