import axios from 'axios';
import store from '../store';
import { logout } from '../store/slices/authSlice';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});

export const setupAxiosInterceptors = () => {
    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers.common['Authorization'] = token;
    }
};

export const verifyToken = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }

        api.defaults.headers.common['Authorization'] = token;
        const response = await api.get('/verify');
        
        // Renew token if provided in response
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            api.defaults.headers.common['Authorization'] = response.data.token;
        }
        
        return response.data.user;
    } catch (error) {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        store.dispatch(logout());
        return null;
    }
};

export default api;
