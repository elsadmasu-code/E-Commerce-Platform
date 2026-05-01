import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Sidebar = ({ categories, filters, onFilterChange }) => {
  const [priceOpen, setPriceOpen] = useState(true);
  const [catOpen, setCatOpen] = useState(true);

  return (
    <aside className="w-full">
      {/* Categories */}
      <div className="card p-4 mb-4">
        <button
          className="flex items-center justify-between w-full font-semibold text-primary mb-2"
          onClick={() => setCatOpen(!catOpen)}
        >
          Categories {catOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {catOpen && (
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => onFilterChange({ category: '' })}
                className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100 ${!filters.category ? 'text-accent font-medium' : 'text-gray-700'}`}
              >
                All Categories
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => onFilterChange({ category: cat })}
                  className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100 ${filters.category === cat ? 'text-accent font-medium' : 'text-gray-700'}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Range */}
      <div className="card p-4">
        <button
          className="flex items-center justify-between w-full font-semibold text-primary mb-3"
          onClick={() => setPriceOpen(!priceOpen)}
        >
          Price Range {priceOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {priceOpen && (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
              <input
                type="number"
                value={filters.minPrice || ''}
                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                placeholder="$0"
                className="input-field text-sm"
                min="0"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
              <input
                type="number"
                value={filters.maxPrice || ''}
                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                placeholder="$9999"
                className="input-field text-sm"
                min="0"
              />
            </div>
            <button
              onClick={() => onFilterChange({ minPrice: '', maxPrice: '' })}
              className="text-sm text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
