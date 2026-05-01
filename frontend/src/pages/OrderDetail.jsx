import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../redux/slices/orderSlice.js';
import Loader from '../components/common/Loader.jsx';
import Message from '../components/common/Message.jsx';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <div className="max-w-4xl mx-auto px-4 py-8"><Message variant="error">{error}</Message></div>;
  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-2">Order Details</h1>
      <p className="text-gray-400 text-sm mb-6">Order #{order._id}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* Items */}
          <div className="card p-4">
            <h2 className="font-semibold text-primary mb-3">Items Ordered</h2>
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex items-center gap-3 py-2 border-b last:border-0">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                <div className="flex-1">
                  <Link to={`/product/${item.product}`} className="text-sm font-medium hover:text-accent">{item.name}</Link>
                  <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold text-sm">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Shipping */}
          <div className="card p-4">
            <h2 className="font-semibold text-primary mb-2">Shipping Address</h2>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            <div className="mt-2 flex items-center gap-2">
              {order.isDelivered ? (
                <span className="flex items-center gap-1 text-green-600 text-sm"><FiCheckCircle /> Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</span>
              ) : (
                <span className="flex items-center gap-1 text-yellow-600 text-sm"><FiClock /> Not yet delivered</span>
              )}
            </div>
          </div>

          {/* Payment */}
          <div className="card p-4">
            <h2 className="font-semibold text-primary mb-2">Payment</h2>
            <p className="text-sm text-gray-600">Method: {order.paymentMethod}</p>
            <div className="mt-2">
              {order.isPaid ? (
                <span className="flex items-center gap-1 text-green-600 text-sm"><FiCheckCircle /> Paid on {new Date(order.paidAt).toLocaleDateString()}</span>
              ) : (
                <span className="flex items-center gap-1 text-red-600 text-sm"><FiClock /> Not yet paid</span>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="card p-4 h-fit">
          <h2 className="font-semibold text-primary mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>Items</span><span>${order.itemsPrice?.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span>${order.shippingPrice?.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600"><span>Tax</span><span>${order.taxPrice?.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-primary border-t pt-2"><span>Total</span><span>${order.totalPrice?.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
