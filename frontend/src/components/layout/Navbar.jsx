import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiSearch, FiShoppingCart, FiChevronDown, FiChevronRight, FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import { logout } from '../../redux/slices/authSlice.js';

const LANGUAGES = [
  { code: 'EN', label: 'English - EN' },
  { code: 'AM', label: 'አማርኛ - AM' },
  { code: 'ES', label: 'español - ES' },
  { code: 'AR', label: 'العربية - AR' },
  { code: 'FR', label: 'Français - FR' },
  { code: 'ZH', label: '中文 (简体) - ZH' },
];

const EthiopiaFlag = ({ size = 24 }) => (
  <svg width={size} height={size * 0.667} viewBox="0 0 24 16" className="inline-block rounded-sm flex-shrink-0">
    <rect width="24" height="5.33" fill="#078930" />
    <rect y="5.33" width="24" height="5.33" fill="#FCDD09" />
    <rect y="10.66" width="24" height="5.34" fill="#DA121A" />
    <circle cx="12" cy="8" r="3.5" fill="#0F47AF" />
    <polygon points="12,5 12.6,7 14.5,7 13,8.2 13.6,10.2 12,9 10.4,10.2 11,8.2 9.5,7 11.4,7" fill="#FCDD09" />
  </svg>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((s) => s.auth);
  const { cartItems } = useSelector((s) => s.cart);

  const [search, setSearch] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [allMenuOpen, setAllMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  const langRef = useRef(null);
  const accountRef = useRef(null);
  const allMenuRef = useRef(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
      if (allMenuRef.current && !allMenuRef.current.contains(e.target)) setAllMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) { navigate(`/?keyword=${search.trim()}`); setSearch(''); }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setAccountOpen(false);
  };

  const closeAll = () => { setAllMenuOpen(false); setMobileOpen(false); };

  return (
    <>
      {/* Overlay for All menu */}
      {allMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setAllMenuOpen(false)} />
      )}

      <nav className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: '#0F172A' }}>
        {/* Main bar */}
        <div className="flex items-center gap-1 px-2 py-1.5 text-white">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center border border-transparent hover:border-yellow-400 rounded px-2 py-1 mr-1 transition">
            <span className="text-2xl font-extrabold tracking-tight text-white leading-none">buySphere</span>
          </Link>

          {/* Deliver to */}
          <button className="flex-shrink-0 flex flex-col items-start border border-transparent hover:border-yellow-400 rounded px-2 py-1 transition hidden sm:flex">
            <span className="text-[10px] text-gray-300 leading-tight">Deliver to</span>
            <span className="text-sm font-bold text-white flex items-center gap-1 leading-tight">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Ethiopia
            </span>
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-1 min-w-0 mx-1">
            <div className="flex w-full rounded overflow-hidden">
              <span className="bg-gray-200 text-gray-700 text-xs px-2 flex items-center border-r border-gray-300 whitespace-nowrap">All</span>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search BuySphere"
                className="flex-1 px-3 py-1.5 text-gray-900 text-sm focus:outline-none min-w-0" />
              <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 px-4 flex items-center justify-center transition-colors">
                <FiSearch size={18} className="text-gray-900" />
              </button>
            </div>
          </form>

          {/* Language selector */}
          <div className="relative flex-shrink-0" ref={langRef}>
            <button onClick={() => { setLangOpen(!langOpen); setAccountOpen(false); }}
              className="flex items-center gap-0.5 px-1 py-0.5 rounded border border-transparent hover:border-white transition text-xs">
              <EthiopiaFlag size={20} />
              <span className="font-semibold">{selectedLang}</span>
              <FiChevronDown size={12} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white text-gray-800 rounded shadow-xl z-50 p-4">
                <p className="font-bold text-sm mb-3">Change language</p>
                <div className="space-y-2">
                  {LANGUAGES.map((l) => (
                    <label key={l.code} className="flex items-center gap-2 cursor-pointer text-sm hover:text-blue-600">
                      <input type="radio" name="lang" checked={selectedLang === l.code}
                        onChange={() => { setSelectedLang(l.code); setLangOpen(false); }} className="accent-blue-600" />
                      {l.label}
                    </label>
                  ))}
                </div>
                <hr className="my-3" />
                <div className="text-sm">
                  <p className="font-bold mb-1">Change currency</p>
                  <p className="text-gray-600">ETB - Ethiopian Birr</p>
                </div>
                <hr className="my-3" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <EthiopiaFlag size={20} />
                  <span>You are shopping on BuySphere.et</span>
                </div>
              </div>
            )}
          </div>

          {/* Account & Lists */}
          <div className="relative flex-shrink-0" ref={accountRef}>
            <button onClick={() => { setAccountOpen(!accountOpen); setLangOpen(false); }}
              className="flex flex-col items-start px-1 py-0.5 rounded border border-transparent hover:border-white transition text-left">
              <span className="text-xs text-gray-300">{userInfo ? `Hello, ${userInfo.name?.split(' ')[0]}` : 'Hello, sign in'}</span>
              <span className="text-sm font-bold flex items-center gap-1">Account &amp; Lists <FiChevronDown size={12} /></span>
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-full mt-1 w-80 bg-white text-gray-800 rounded shadow-xl z-50 p-4">
                {!userInfo && (
                  <div className="text-center mb-4">
                    <Link to="/login" onClick={() => setAccountOpen(false)}
                      className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-full text-sm transition">
                      Sign in
                    </Link>
                    <p className="text-xs mt-2 text-gray-600">New customer?{' '}
                      <Link to="/register" onClick={() => setAccountOpen(false)} className="text-blue-600 hover:underline font-medium">Start here.</Link>
                    </p>
                  </div>
                )}
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="font-bold mb-2">Your Lists</p>
                    <Link to="/wishlist" onClick={() => setAccountOpen(false)} className="block text-gray-700 hover:text-blue-600 hover:underline py-0.5">Wishlist</Link>
                    <Link to="/wishlist" onClick={() => setAccountOpen(false)} className="block text-gray-700 hover:text-blue-600 hover:underline py-0.5">Find a List</Link>
                  </div>
                  <div>
                    <p className="font-bold mb-2">Your Account</p>
                    {userInfo ? (
                      <>
                        <Link to="/profile" onClick={() => setAccountOpen(false)} className="block text-gray-700 hover:text-blue-600 hover:underline py-0.5">Account</Link>
                        <Link to="/profile" onClick={() => setAccountOpen(false)} className="block text-gray-700 hover:text-blue-600 hover:underline py-0.5">Orders</Link>
                        {userInfo.isAdmin && <Link to="/admin/dashboard" onClick={() => setAccountOpen(false)} className="block text-gray-700 hover:text-blue-600 hover:underline py-0.5">Admin Panel</Link>}
                        <button onClick={handleLogout} className="block text-red-600 hover:underline py-0.5 text-left w-full mt-1">Sign Out</button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setAccountOpen(false)} className="block text-gray-700 hover:text-blue-600 hover:underline py-0.5">Sign In</Link>
                        <Link to="/register" onClick={() => setAccountOpen(false)} className="block text-gray-700 hover:text-blue-600 hover:underline py-0.5">Register</Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <Link to="/profile" className="flex-shrink-0 flex flex-col items-start px-1 py-0.5 rounded border border-transparent hover:border-white transition hidden sm:flex">
            <span className="text-xs text-gray-300">Returns</span>
            <span className="text-sm font-bold">&amp; Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex-shrink-0 flex items-end gap-0.5 px-1 py-0.5 rounded border border-transparent hover:border-white transition">
            <div className="relative">
              <FiShoppingCart size={28} />
              <span className="absolute -top-2 -right-1 text-yellow-400 font-bold text-sm leading-none">{cartCount}</span>
            </div>
            <span className="text-sm font-bold hidden sm:inline">Cart</span>
          </Link>

          {/* Mobile toggle */}
          <button className="sm:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Secondary bar */}
        <div className="flex items-center gap-4 px-4 py-1.5 text-white text-sm" style={{ backgroundColor: '#1E293B' }}>
          <div className="relative" ref={allMenuRef}>
            <button onClick={() => setAllMenuOpen(!allMenuOpen)}
              className="flex items-center gap-1 font-semibold border border-transparent hover:border-white px-1 py-0.5 rounded transition">
              <FiMenu size={16} /> All
            </button>

            {/* All Menu Sidebar Panel */}
            {allMenuOpen && (
              <div className="fixed left-0 top-0 h-full w-72 bg-white text-gray-800 z-50 overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-3 text-white font-bold text-base" style={{ backgroundColor: '#0F172A' }}>
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-sm">
                    {userInfo ? userInfo.name?.charAt(0).toUpperCase() : '👤'}
                  </div>
                  <span>{userInfo ? `Hello, ${userInfo.name?.split(' ')[0]}` : 'Hello, sign in'}</span>
                </div>

                {/* Digital Content & Devices */}
                <div className="px-4 py-3 border-b">
                  <p className="font-bold text-base mb-2">Digital Content &amp; Devices</p>
                  {['BuySphere Video', 'BuySphere Music', 'E-readers &amp; Books', 'BuySphere Appstore'].map((item) => (
                    <div key={item} className="flex items-center justify-between py-2 hover:bg-gray-100 px-1 rounded cursor-pointer text-sm">
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                      <FiChevronRight size={14} className="text-gray-400" />
                    </div>
                  ))}
                </div>

                {/* Shop by Department */}
                <div className="px-4 py-3 border-b">
                  <p className="font-bold text-base mb-2">Shop by Department</p>
                  {['Electronics', 'Computers', 'Smart Home', 'Arts &amp; Crafts', 'Clothing', 'Books'].map((item) => (
                    <div key={item} onClick={() => { navigate(`/?keyword=${item.replace(/&amp;/g, '&')}`); closeAll(); }}
                      className="flex items-center justify-between py-2 hover:bg-gray-100 px-1 rounded cursor-pointer text-sm">
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                      <FiChevronRight size={14} className="text-gray-400" />
                    </div>
                  ))}
                </div>

                {/* Programs & Features */}
                <div className="px-4 py-3 border-b">
                  <p className="font-bold text-base mb-2">Programs &amp; Features</p>
                  {["Gift Cards", "Shop By Interest", "BuySphere Live", "International Shopping"].map((item) => (
                    <div key={item} className="flex items-center justify-between py-2 hover:bg-gray-100 px-1 rounded cursor-pointer text-sm">
                      <span>{item}</span>
                      <FiChevronRight size={14} className="text-gray-400" />
                    </div>
                  ))}
                </div>

                {/* Help & Settings */}
                <div className="px-4 py-3">
                  <p className="font-bold text-base mb-2">Help &amp; Settings</p>
                  <Link to="/profile" onClick={closeAll} className="flex items-center py-2 hover:bg-gray-100 px-1 rounded text-sm">Your Account</Link>
                  <div className="flex items-center gap-2 py-2 hover:bg-gray-100 px-1 rounded text-sm cursor-pointer">
                    <FiGlobe size={16} /> <span>English</span>
                  </div>
                  <div className="flex items-center gap-2 py-2 hover:bg-gray-100 px-1 rounded text-sm cursor-pointer">
                    <EthiopiaFlag size={20} /> <span>Ethiopia</span>
                  </div>
                  <div className="py-2 hover:bg-gray-100 px-1 rounded text-sm cursor-pointer">Customer Service</div>
                  {userInfo ? (
                    <button onClick={() => { handleLogout(); closeAll(); }} className="py-2 hover:bg-gray-100 px-1 rounded text-sm text-red-600 w-full text-left">Sign Out</button>
                  ) : (
                    <Link to="/login" onClick={closeAll} className="block py-2 hover:bg-gray-100 px-1 rounded text-sm">Sign in</Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {[
            { label: "Hot Deals", path: "/?keyword=deals&sort=price_asc" },
            { label: "Traditional Wear", path: "/?category=Traditional Wear" },
            { label: "Home & Kitchen", path: "/?category=Home & Kitchen" },
            { label: "Music & Culture", path: "/?category=Music & Culture" },
            { label: "Books", path: "/?category=Books" },
            { label: "Sell With Us", path: "/sell-with-us" },
          ].map((item) => (
            <Link key={item.label} to={item.path} className="hover:underline whitespace-nowrap hidden md:inline text-white text-sm">{item.label}</Link>
          ))}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="sm:hidden px-4 pb-4 space-y-3 text-white" style={{ backgroundColor: '#0F172A' }}>
            <form onSubmit={handleSearch} className="flex mt-2">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search BuySphere"
                className="flex-1 px-3 py-2 text-gray-900 text-sm rounded-l focus:outline-none" />
              <button type="submit" className="bg-yellow-400 px-4 rounded-r">
                <FiSearch size={18} className="text-gray-900" />
              </button>
            </form>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">Cart ({cartCount})</Link>
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">Returns &amp; Orders</Link>
              {userInfo ? (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">Account</Link>
                  <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">Wishlist</Link>
                  {userInfo.isAdmin && <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">Admin</Link>}
                  <button onClick={handleLogout} className="text-left text-red-400 hover:text-red-300">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="hover:text-yellow-400">Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
