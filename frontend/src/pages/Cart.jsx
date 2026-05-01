import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice.js';
import CartItem from '../components/cart/CartItem.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((s) => s.cart);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FiShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn-primary px-8 py-3">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Shopping Cart</h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="flex items-center gap-2 text-sm text-danger hover:text-red-700"
        >
          <FiTrash2 size={16} /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card p-4">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <Link to="/" className="inline-flex items-center gap-2 text-accent hover:underline mt-4 text-sm">
            ← Continue Shopping
          </Link>
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
