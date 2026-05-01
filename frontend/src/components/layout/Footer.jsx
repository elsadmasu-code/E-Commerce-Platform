import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ backgroundColor: '#0F172A' }} className="text-gray-300 mt-auto">
    {/* Top back-to-top bar */}
    <div
      className="text-center py-3 text-sm text-white font-medium cursor-pointer hover:opacity-90 transition"
      style={{ backgroundColor: '#1E293B' }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      Back to top
    </div>

    {/* Main footer links */}
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
      <div>
        <h4 className="font-bold text-white mb-3">Get to Know Us</h4>
        <ul className="space-y-2 text-gray-400">
          <li><Link to="/" className="hover:text-white transition-colors">About BuySphere</Link></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Careers</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Press Releases</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">BuySphere Science</span></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-3">Help Center</h4>
        <ul className="space-y-2 text-gray-400">
          <li><Link to="/profile" className="hover:text-white transition-colors">Your Account</Link></li>
          <li><Link to="/profile" className="hover:text-white transition-colors">Your Orders</Link></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Shipping & Delivery</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Returns & Replacements</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Manage Content</span></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-3">Make Money With Us</h4>
        <ul className="space-y-2 text-gray-400">
          <li><span className="hover:text-white cursor-pointer transition-colors">Sell on BuySphere</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Sell Under BuySphere</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Advertise Your Products</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">BuySphere Pay</span></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-3">Let Us Help You</h4>
        <ul className="space-y-2 text-gray-400">
          <li><span className="hover:text-white cursor-pointer transition-colors">Ethiopia</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">English</span></li>
          <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
          <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Help</span></li>
        </ul>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-700" />

    {/* Bottom bar */}
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
      <Link to="/" className="text-xl font-extrabold text-white tracking-tight">buySphere</Link>
      <div className="flex flex-wrap gap-4 justify-center">
        <span className="hover:text-white cursor-pointer">Conditions of Use</span>
        <span className="hover:text-white cursor-pointer">Privacy Notice</span>
        <span className="hover:text-white cursor-pointer">Your Ads Privacy Choices</span>
      </div>
      <p>© {new Date().getFullYear()} BuySphere.et, Inc. or its affiliates</p>
    </div>
  </footer>
);

export default Footer;
