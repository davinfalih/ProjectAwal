// src/services/api.js - versi lengkap
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk handle error globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout: Koneksi terlalu lama');
    } else if (error.response) {
      // Server merespon dengan status error
      console.error('Error Response:', error.response.status);
    } else if (error.request) {
      // Request dikirim tapi tidak dapat response
      console.error('Network Error: Tidak bisa terhubung ke server');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const productService = {
  getProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

export default api;