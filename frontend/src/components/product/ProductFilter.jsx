import React from 'react';

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

const ProductFilter = ({ total, onSortChange, currentSort }) => (
  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
    <p className="text-sm text-gray-500">{total} product{total !== 1 ? 's' : ''} found</p>
    <select
      value={currentSort}
      onChange={(e) => onSortChange(e.target.value)}
      className="input-field w-auto text-sm"
      aria-label="Sort products"
    >
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default ProductFilter;
