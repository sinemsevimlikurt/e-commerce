import axios from 'axios';
import store from '../store';
import { logout } from '../store/slices/authSlice';

const api = axios.create({
    baseURL: 'https://workintech-fe-ecommerce.onrender.com',
});

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
            // You might want to redirect to login page here
        }
        return Promise.reject(error);
    }
);

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

export default api;
