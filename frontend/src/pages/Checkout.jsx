import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress, savePaymentMethod, clearCart } from '../redux/slices/cartSlice.js';
import { placeOrder } from '../redux/slices/orderSlice.js';
import { toast } from 'react-toastify';

const steps = ['Shipping', 'Payment', 'Confirm'];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shippingAddress, paymentMethod } = useSelector((s) => s.cart);
  const { loading } = useSelector((s) => s.orders);

  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || '',
  });
  const [payment, setPayment] = useState(paymentMethod || 'Stripe');

  const subtotal = cartItems.reduce((a, i) => a + i.price * i.qty, 0);
  const shippingCost = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shipping));
    setStep(1);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    try {
      const result = await dispatch(placeOrder({
        orderItems: cartItems.map((i) => ({ name: i.name, qty: i.qty, image: i.image, price: i.price, product: i._id })),
        shippingAddress: shipping,
        paymentMethod: payment,
        itemsPrice: subtotal,
        shippingPrice: shippingCost,
        taxPrice: tax,
        totalPrice: total,
      })).unwrap();
      dispatch(clearCart());
      navigate(`/order/${result._id}`);
    } catch (err) {
      toast.error(err || 'Failed to place order');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-6">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${i <= step ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${i < step ? 'bg-accent border-accent text-white' : i === step ? 'border-accent text-accent' : 'border-gray-300'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className="text-sm font-medium hidden sm:block">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-accent' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Shipping */}
      {step === 0 && (
        <form onSubmit={handleShippingSubmit} className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-primary">Shipping Address</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className="input-field" required placeholder="123 Main St" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="input-field" required placeholder="New York" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input value={shipping.postalCode} onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })} className="input-field" required placeholder="10001" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} className="input-field" required placeholder="United States" />
          </div>
          <button type="submit" className="btn-primary w-full py-3">Continue to Payment</button>
        </form>
      )}

      {/* Step 2: Payment */}
      {step === 1 && (
        <form onSubmit={handlePaymentSubmit} className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-primary">Payment Method</h2>
          {['Stripe', 'PayPal'].map((method) => (
            <label key={method} className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${payment === method ? 'border-accent bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="payment" value={method} checked={payment === method} onChange={() => setPayment(method)} className="accent-accent" />
              <span className="font-medium">{method}</span>
            </label>
          ))}
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(0)} className="btn-secondary flex-1 py-3">Back</button>
            <button type="submit" className="btn-primary flex-1 py-3">Review Order</button>
          </div>
        </form>
      )}

      {/* Step 3: Confirm */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">Order Review</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-primary text-base border-t pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
          <div className="card p-4 text-sm text-gray-600">
            <p><strong>Ship to:</strong> {shipping.address}, {shipping.city}, {shipping.postalCode}, {shipping.country}</p>
            <p className="mt-1"><strong>Payment:</strong> {payment}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1 py-3">Back</button>
            <button onClick={handlePlaceOrder} disabled={loading} className="btn-primary flex-1 py-3">
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
