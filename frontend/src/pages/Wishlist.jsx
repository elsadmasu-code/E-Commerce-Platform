import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProfile } from '../redux/slices/authSlice.js';
import { addToCart } from '../redux/slices/cartSlice.js';
import { toggleWishlist as toggleWishlistApi } from '../services/api.js';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import Loader from '../components/common/Loader.jsx';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((s) => s.auth);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleRemove = async (productId) => {
    setRemoving(productId);
    try {
      await toggleWishlistApi(productId);
      dispatch(fetchProfile());
      toast.success('Removed from wishlist');
    } catch {
      toast.error('Failed to remove');
    } finally {
      setRemoving(null);
    }
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    handleRemove(product._id);
    toast.success('Moved to cart');
  };

  if (loading) return <Loader />;

  const wishlist = userInfo?.wishlist || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <FiHeart size={24} className="text-danger" />
        <h1 className="text-2xl font-bold text-primary">My Wishlist</h1>
        <span className="text-gray-400 text-sm">({wishlist.length} items)</span>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <FiHeart size={64} className="mx-auto text-gray-200 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-6">Save items you love for later.</p>
          <Link to="/" className="btn-primary px-8 py-3">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <div key={product._id} className="card group">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product._id}`} className="font-medium text-sm text-gray-900 hover:text-accent line-clamp-2 mb-2 block">
                  {product.name}
                </Link>
                <p className="text-lg font-bold text-primary mb-3">${product.price?.toFixed(2)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 flex items-center justify-center gap-1 btn-primary text-sm py-2"
                  >
                    <FiShoppingCart size={14} /> Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product._id)}
                    disabled={removing === product._id}
                    className="p-2 border border-gray-200 rounded-lg hover:border-danger hover:text-danger transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
