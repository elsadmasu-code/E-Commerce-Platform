import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiEye } from 'react-icons/fi';

const OrderTable = ({ orders, onDeliver }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 text-left">
          <th className="px-4 py-3 font-semibold text-gray-600">ID</th>
          <th className="px-4 py-3 font-semibold text-gray-600">User</th>
          <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
          <th className="px-4 py-3 font-semibold text-gray-600">Total</th>
          <th className="px-4 py-3 font-semibold text-gray-600">Paid</th>
          <th className="px-4 py-3 font-semibold text-gray-600">Delivered</th>
          <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-3 font-mono text-xs">{order._id.slice(-8)}</td>
            <td className="px-4 py-3">{order.user?.name || 'N/A'}</td>
            <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
            <td className="px-4 py-3 font-semibold">${order.totalPrice.toFixed(2)}</td>
            <td className="px-4 py-3">
              {order.isPaid ? <FiCheckCircle className="text-green-500" size={18} /> : <FiXCircle className="text-red-400" size={18} />}
            </td>
            <td className="px-4 py-3">
              {order.isDelivered ? (
                <FiCheckCircle className="text-green-500" size={18} />
              ) : (
                <button onClick={() => onDeliver(order._id)} className="text-xs text-accent hover:underline">Mark Delivered</button>
              )}
            </td>
            <td className="px-4 py-3">
              <Link to={`/order/${order._id}`} className="text-accent hover:underline flex items-center gap-1">
                <FiEye size={14} /> View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderTable;
