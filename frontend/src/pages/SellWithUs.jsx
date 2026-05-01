import { Link } from 'react-router-dom';
import { FiPackage, FiTrendingUp, FiShield, FiDollarSign, FiUsers, FiStar } from 'react-icons/fi';

const BENEFITS = [
  { icon: <FiTrendingUp size={28} className="text-yellow-500" />, title: 'Grow Your Business', desc: 'Reach millions of Ethiopian customers online and expand your market.' },
  { icon: <FiDollarSign size={28} className="text-green-500" />, title: 'Easy Payments', desc: 'Get paid via Chapa, Telebirr, or bank transfer — fast and secure.' },
  { icon: <FiShield size={28} className="text-blue-500" />, title: 'Seller Protection', desc: 'We protect your transactions and handle disputes professionally.' },
  { icon: <FiPackage size={28} className="text-purple-500" />, title: 'Simple Listings', desc: 'Upload your products in minutes with photos, price, and description.' },
  { icon: <FiUsers size={28} className="text-red-500" />, title: 'Large Audience', desc: 'Connect with buyers across Ethiopia looking for your products.' },
  { icon: <FiStar size={28} className="text-orange-500" />, title: 'Build Your Brand', desc: 'Get reviews, ratings, and build a trusted seller profile.' },
];

const STEPS = [
  { num: '1', title: 'Create Account', desc: 'Register as a seller on BuySphere for free.' },
  { num: '2', title: 'List Products', desc: 'Upload your products with images, price, and details.' },
  { num: '3', title: 'Get Orders', desc: 'Customers find and buy your products.' },
  { num: '4', title: 'Get Paid', desc: 'Receive payment directly to your account.' },
];

const SellWithUs = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Hero */}
    <div className="text-white py-16 px-4 text-center" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🛍️ Sell With BuySphere</h1>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
        Join thousands of Ethiopian sellers. List your products, reach more customers, and grow your income.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link to="/register" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full text-base transition">
          Start Selling Today
        </Link>
        <Link to="/login" className="border border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-3 rounded-full text-base transition">
          Sign In to Sell
        </Link>
      </div>
    </div>

    {/* Benefits */}
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Why Sell on BuySphere?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {BENEFITS.map((b) => (
          <div key={b.title} className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition">
            {b.icon}
            <h3 className="font-bold text-gray-800 text-base">{b.title}</h3>
            <p className="text-gray-500 text-sm">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* How it works */}
    <div className="py-12 px-4" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">How It Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-12 h-12 rounded-full bg-yellow-400 text-gray-900 font-extrabold text-xl flex items-center justify-center mx-auto mb-3">{s.num}</div>
              <h4 className="font-bold text-gray-800 mb-1">{s.title}</h4>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Categories we need */}
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Popular Categories to Sell</h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {['👗 Traditional Wear', '🧺 Home & Kitchen', '📱 Electronics', '📚 Books', '🎶 Music & Culture', '🌿 Natural Products', '🍯 Ethiopian Food', '🎨 Handmade Crafts'].map((cat) => (
          <span key={cat} className="bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:border-yellow-400 hover:text-yellow-600 cursor-pointer transition shadow-sm">{cat}</span>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="text-center py-12 px-4 bg-yellow-400">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Start Selling?</h2>
      <p className="text-gray-700 mb-6">Join BuySphere today — it's free to register.</p>
      <Link to="/register" className="bg-gray-900 text-white font-bold px-10 py-3 rounded-full hover:bg-gray-800 transition">
        Create Seller Account
      </Link>
    </div>
  </div>
);

export default SellWithUs;
