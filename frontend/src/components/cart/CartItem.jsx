import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { removeFromCart, updateQty } from '../../redux/slices/cartSlice.js';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-0">
      <Link to={`/product/${item._id}`}>
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/product/${item._id}`} className="font-medium text-gray-900 hover:text-accent line-clamp-2 text-sm">
          {item.name}
        </Link>
        <p className="text-accent font-bold mt-1">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-3">
        <select
          value={item.qty}
          onChange={(e) => dispatch(updateQty({ id: item._id, qty: Number(e.target.value) }))}
          className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Quantity"
        >
          {[...Array(Math.min(item.stock || 10, 10))].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <p className="font-semibold text-primary w-20 text-right">${(item.price * item.qty).toFixed(2)}</p>
        <button
          onClick={() => dispatch(removeFromCart(item._id))}
          className="text-gray-400 hover:text-danger transition-colors p-1"
          aria-label="Remove item"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
