import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((s) => s.cart);
  const { userInfo } = useSelector((s) => s.auth);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!userInfo) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="card p-6 sticky top-20">
      <h2 className="text-lg font-bold text-primary mb-4">Order Summary</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({cartItems.reduce((a, i) => a + i.qty, 0)} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? <span className="text-accent">Free</span> : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-bold text-primary text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      {subtotal < 100 && (
        <p className="text-xs text-gray-400 mt-2">Add ${(100 - subtotal).toFixed(2)} more for free shipping</p>
      )}
      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
        className="btn-primary w-full mt-4 py-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
