import React from 'react';
import ProductCard from './ProductCard.jsx';
import Loader from '../common/Loader.jsx';
import Message from '../common/Message.jsx';

const ProductList = ({ products, loading, error }) => {
  if (loading) return <Loader />;
  if (error) return <Message variant="error">{error}</Message>;
  if (!products?.length) return <Message variant="info">No products found.</Message>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
