import axios from 'axios';

const api = axios.create({
 baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',

  headers: { 'Content-Type': 'application/json' },
});

// Attach token from localStorage
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);
export const getUserProfile = () => api.get('/auth/profile');
export const updateUserProfile = (data) => api.put('/auth/profile', data);
export const toggleWishlist = (id) => api.put(`/auth/wishlist/${id}`);

// Products
export const getProducts = (params) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const createReview = (id, data) => api.post(`/products/${id}/reviews`, data);
export const getCategories = () => api.get('/products/categories');

// Orders
export const createOrder = (data) => api.post('/orders', data);
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const payOrder = (id, data) => api.put(`/orders/${id}/pay`, data);
export const getMyOrders = () => api.get('/orders/myorders');
export const getAllOrders = () => api.get('/orders');
export const deliverOrder = (id) => api.put(`/orders/${id}/deliver`);

// Users (admin)
export const getUsers = () => api.get('/users');
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

// Payment
export const createPaymentIntent = (amount) => api.post('/payment/create-payment-intent', { amount });

export default api;
