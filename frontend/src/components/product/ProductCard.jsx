import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { addToCart } from '../../redux/slices/cartSlice.js';
import { toggleWishlist as toggleWishlistApi } from '../../services/api.js';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((s) => s.auth);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success('Added to cart');
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!userInfo) { toast.info('Please login to use wishlist'); return; }
    try {
      await toggleWishlistApi(product._id);
      toast.success('Wishlist updated');
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  const isWishlisted = userInfo?.wishlist?.includes(product._id);

  return (
    <Link to={`/product/${product._id}`} className="card group hover:shadow-md transition-shadow duration-200 block">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:scale-110 transition-transform"
          aria-label="Toggle wishlist"
        >
          {isWishlisted ? <FaHeart className="text-danger" size={16} /> : <FiHeart size={16} className="text-gray-500" />}
        </button>
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-danger text-white text-xs px-2 py-1 rounded">Out of Stock</span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={14}
              className={i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.numReviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center gap-1 bg-accent hover:bg-green-600 disabled:bg-gray-300 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
            aria-label="Add to cart"
          >
            <FiShoppingCart size={14} /> Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
