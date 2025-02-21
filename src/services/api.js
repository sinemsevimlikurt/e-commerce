import axios from 'axios';
import store from '../store';
import { logout } from '../store/slices/authSlice';

const api = axios.create({
    baseURL: 'https://workintech-fe-ecommerce.onrender.com',
});

export const setupAxiosInterceptors = () => {
    // Request interceptor
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                delete api.defaults.headers.common['Authorization'];
                store.dispatch(logout());
            }
            return Promise.reject(error);
        }
    );
};

export const verifyToken = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const response = await api.auth.verify();
        return response.data;
    } catch (error) {
        localStorage.removeItem('token');
        return null;
    }
};

// Authentication endpoints
api.auth = {
    login: (credentials) => api.post('/auth/login', credentials),
    verify: () => api.get('/auth/verify'),
    register: (userData) => api.post('/auth/register', userData),
};

// User endpoints
api.user = {
    getRoles: () => api.get('/user/roles'),
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
};

// Categories endpoints
api.categories = {
    getAll: () => api.get('/categories'),
    getById: (id) => api.get(`/categories/${id}`),
    getProducts: (id) => api.get(`/categories/${id}/products`),
};

// Products endpoints
api.products = {
    getAll: (params) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    search: (query) => api.get(`/products/search?q=${query}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
};

export default api;
