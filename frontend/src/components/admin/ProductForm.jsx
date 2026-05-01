import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../../services/api.js';
import { toast } from 'react-toastify';

const ProductForm = ({ product, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    name: '', description: '', price: '', image: '', category: '', brand: '', stock: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        image: product.image || '',
        category: product.category || '',
        brand: product.brand || '',
        stock: product.stock || '',
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (product) {
        await updateProduct(product._id, form);
        toast.success('Product updated');
      } else {
        await createProduct(form);
        toast.success('Product created');
      }
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'name', label: 'Product Name', type: 'text', required: true },
    { key: 'price', label: 'Price ($)', type: 'number', required: true },
    { key: 'stock', label: 'Stock', type: 'number', required: true },
    { key: 'category', label: 'Category', type: 'text', required: true },
    { key: 'brand', label: 'Brand', type: 'text' },
    { key: 'image', label: 'Image URL', type: 'url', required: true },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ key, label, type, required }) => (
          <div key={key} className={key === 'name' || key === 'image' ? 'col-span-2' : ''}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="input-field"
              required={required}
              min={type === 'number' ? 0 : undefined}
              step={key === 'price' ? '0.01' : undefined}
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="input-field resize-none"
          rows={3}
          required
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary flex-1">
          {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
