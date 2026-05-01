import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiStar, FiHeart, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { FaStar, FaHeart } from 'react-icons/fa';
import { fetchProductById } from '../redux/slices/productSlice.js';
import { addToCart } from '../redux/slices/cartSlice.js';
import { createReview, toggleWishlist as toggleWishlistApi } from '../services/api.js';
import Loader from '../components/common/Loader.jsx';
import Message from '../components/common/Message.jsx';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((s) => s.products);
  const { userInfo } = useSelector((s) => s.auth);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart');
  };

  const handleWishlist = async () => {
    if (!userInfo) { toast.info('Please login'); return; }
    try {
      await toggleWishlistApi(product._id);
      toast.success('Wishlist updated');
    } catch { toast.error('Failed'); }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) { toast.info('Please login to review'); return; }
    setReviewLoading(true);
    try {
      await createReview(id, { rating, comment });
      toast.success('Review submitted');
      setComment('');
      dispatch(fetchProductById(id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="max-w-7xl mx-auto px-4 py-8"><Message variant="error">{error}</Message></div>;
  if (!product) return null;

  const images = [product.image, ...(product.images || [])];
  const isWishlisted = userInfo?.wishlist?.includes(product._id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6">
        <FiArrowLeft /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Images */}
        <div>
          <div className="card overflow-hidden mb-3">
            <img src={images[selectedImage]} alt={product.name} className="w-full h-96 object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedImage === i ? 'border-accent' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-gray-400 mb-1">{product.category}</p>
          <h1 className="text-2xl font-bold text-primary mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={16} className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating?.toFixed(1)} ({product.numReviews} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-primary mb-4">${product.price?.toFixed(2)}</p>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          {product.stock > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <label className="text-sm font-medium text-gray-700">Qty:</label>
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="input-field w-20"
                aria-label="Quantity"
              >
                {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FiShoppingCart /> Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className="p-3 border-2 border-gray-200 rounded-lg hover:border-danger hover:text-danger transition-colors"
              aria-label="Toggle wishlist"
            >
              {isWishlisted ? <FaHeart className="text-danger" size={20} /> : <FiHeart size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Customer Reviews</h2>
          {product.reviews?.length === 0 ? (
            <Message variant="info">No reviews yet. Be the first!</Message>
          ) : (
            <div className="space-y-4">
              {product.reviews?.map((review) => (
                <div key={review._id} className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{review.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={12} className={i < review.rating ? 'text-yellow-400' : 'text-gray-200'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Write review */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Write a Review</h2>
          {!userInfo ? (
            <Message variant="info">Please login to write a review.</Message>
          ) : (
            <form onSubmit={handleReviewSubmit} className="card p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} aria-label={`Rate ${star} stars`}>
                      <FaStar size={24} className={star <= rating ? 'text-yellow-400' : 'text-gray-200'} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Share your experience..."
                  required
                />
              </div>
              <button type="submit" disabled={reviewLoading} className="btn-primary w-full">
                {reviewLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
