import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../redux/slices/orderSlice.js';
import { fetchProducts } from '../../redux/slices/productSlice.js';
import { getUsers } from '../../services/api.js';
import Loader from '../../components/common/Loader.jsx';
import { FiShoppingBag, FiPackage, FiUsers, FiDollarSign } from 'react-icons/fi';
import { useState } from 'react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="card p-6 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((s) => s.orders);
  const { total } = useSelector((s) => s.products);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchProducts({}));
    getUsers().then(({ data }) => setUserCount(data.length)).catch(() => {});
  }, [dispatch]);

  const revenue = allOrders.filter((o) => o.isPaid).reduce((a, o) => a + o.totalPrice, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FiDollarSign} label="Total Revenue" value={`$${revenue.toFixed(0)}`} color="bg-accent" />
        <StatCard icon={FiPackage} label="Total Orders" value={allOrders.length} color="bg-blue-500" />
        <StatCard icon={FiShoppingBag} label="Products" value={total} color="bg-purple-500" />
        <StatCard icon={FiUsers} label="Users" value={userCount} color="bg-orange-500" />
      </div>

      {/* Recent Orders */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-primary">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-accent hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-3 py-2 font-semibold text-gray-600">ID</th>
                <th className="px-3 py-2 font-semibold text-gray-600">User</th>
                <th className="px-3 py-2 font-semibold text-gray-600">Total</th>
                <th className="px-3 py-2 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.slice(0, 5).map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2 font-mono text-xs">{order._id.slice(-8)}</td>
                  <td className="px-3 py-2">{order.user?.name || 'N/A'}</td>
                  <td className="px-3 py-2 font-semibold">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
