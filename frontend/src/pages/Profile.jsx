import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProfile, updateProfile } from '../redux/slices/authSlice.js';
import { fetchMyOrders } from '../redux/slices/orderSlice.js';
import Loader from '../components/common/Loader.jsx';
import { toast } from 'react-toastify';
import { FiUser, FiPackage, FiEdit2, FiCheck } from 'react-icons/fi';

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((s) => s.auth);
  const { orders } = useSelector((s) => s.orders);

  const [tab, setTab] = useState('info');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setForm({ name: userInfo.name || '', email: userInfo.email || '', phone: userInfo.phone || '', password: '' });
    }
  }, [userInfo]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(form)).unwrap();
      toast.success('Profile updated');
      setEditing(false);
    } catch (err) {
      toast.error(err || 'Update failed');
    }
  };

  if (!userInfo) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-primary mb-6">My Account</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b">
        {[{ id: 'info', label: 'Profile', icon: FiUser }, { id: 'orders', label: 'Orders', icon: FiPackage }].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === id ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {/* Profile Info */}
      {tab === 'info' && (
        <div className="card p-6 max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary">Personal Information</h2>
            <button onClick={() => setEditing(!editing)} className="flex items-center gap-1 text-sm text-accent hover:underline">
              <FiEdit2 size={14} /> {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="Optional" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field" placeholder="Leave blank to keep current" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                <FiCheck size={16} /> {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          ) : (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Name</span>
                <span className="font-medium">{userInfo.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{userInfo.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium">{userInfo.phone || '—'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Role</span>
                <span className={`font-medium ${userInfo.isAdmin ? 'text-accent' : 'text-gray-700'}`}>
                  {userInfo.isAdmin ? 'Admin' : 'Customer'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Orders */}
      {tab === 'orders' && (
        <div>
          {orders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FiPackage size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No orders yet.</p>
              <Link to="/" className="text-accent hover:underline mt-2 inline-block">Start shopping</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-600">Order ID</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Total</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Paid</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Delivered</th>
                    <th className="px-4 py-3 font-semibold text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">{order._id.slice(-8)}</td>
                      <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-semibold">${order.totalPrice.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {order.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {order.isDelivered ? 'Delivered' : 'Processing'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/order/${order._id}`} className="text-accent hover:underline text-xs">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
