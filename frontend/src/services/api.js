import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vendors
export const getVendors = (params) => api.get('/vendors', { params });
export const getVendorById = (id) => api.get(`/vendors/${id}`);
export const createVendor = (data) => api.post('/vendors', data);
export const updateVendor = (id, data) => api.put(`/vendors/${id}`, data);
export const deleteVendor = (id) => api.delete(`/vendors/${id}`);

// Categories
export const getCategories = () => api.get('/categories');
export const getCategoryById = (id) => api.get(`/categories/${id}`);

// Reviews
export const getReviewsByVendor = (vendorId, approved) =>
  api.get(`/reviews/vendor/${vendorId}`, { params: { approved } });
export const createReview = (data) => api.post('/reviews', data);
export const updateReview = (id, data) => api.put(`/reviews/${id}`, data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// Admin
export const getAdminStats = () => api.get('/admin/stats');
export const getPendingReviews = () => api.get('/admin/reviews/pending');
export const getAllReviews = () => api.get('/admin/reviews');
export const approveReview = (id) => api.put(`/admin/reviews/${id}/approve`);
export const deleteReviewAdmin = (id) => api.delete(`/admin/reviews/${id}`);
export const getAllVendorsAdmin = () => api.get('/admin/vendors');

export default api;
