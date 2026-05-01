import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiGrid, FiShoppingBag, FiPackage, FiUsers, FiMenu, FiX, FiArrowLeft } from 'react-icons/fi';

const navItems = [
  { to: '/admin/dashboard', icon: FiGrid, label: 'Dashboard' },
  { to: '/admin/products', icon: FiShoppingBag, label: 'Products' },
  { to: '/admin/orders', icon: FiPackage, label: 'Orders' },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((s) => s.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!userInfo?.isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-30 w-64 bg-primary text-white transition-transform duration-300`}>
        <div className="p-4 border-b border-secondary">
          <h2 className="text-accent font-bold text-lg">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-accent text-white' : 'text-gray-300 hover:bg-secondary hover:text-white'}`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
            <FiArrowLeft size={16} /> Back to Store
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="md:hidden flex items-center gap-3 p-4 bg-white border-b">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded">
            <FiMenu size={20} />
          </button>
          <span className="font-semibold text-primary">Admin Panel</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
