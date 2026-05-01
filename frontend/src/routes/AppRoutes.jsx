import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../pages/Home.jsx';
import ProductDetails from '../pages/ProductDetails.jsx';
import Cart from '../pages/Cart.jsx';
import Checkout from '../pages/Checkout.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Profile from '../pages/Profile.jsx';
import Wishlist from '../pages/Wishlist.jsx';
import OrderDetail from '../pages/OrderDetail.jsx';
import AdminLayout from '../pages/admin/AdminLayout.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import AdminProducts from '../pages/admin/Products.jsx';
import AdminOrders from '../pages/admin/Orders.jsx';
import SellWithUs from '../pages/SellWithUs.jsx';

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((s) => s.auth);
  return userInfo ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((s) => s.auth);
  if (!userInfo) return <Navigate to="/login" replace />;
  if (!userInfo.isAdmin) return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
    <Route path="/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />

    <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
      <Route index element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="orders" element={<AdminOrders />} />
    </Route>

    <Route path="/sell-with-us" element={<SellWithUs />} />

    <Route path="*" element={
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <a href="/" className="btn-primary px-6 py-2">Go Home</a>
      </div>
    } />
  </Routes>
);

export default AppRoutes;
