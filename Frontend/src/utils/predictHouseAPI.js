import { Email } from '@mui/icons-material';
import axios from 'axios';

// ===================== API CONFIG =====================
export const API_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    // Predict endpoints
    PREDICT: '/api/prediction/create',
};

// ===================== AXIOS INSTANCE =====================
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Gửi cookie trong mọi request
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    window.location.href = '/login';
                    break;
                case 404:
                    window.location.href = '/not-found';
                    break;
                case 500:
                    console.error('Server error:', error.response.data);
                    break;
                default:
                    console.error('API error:', error.response.data);
            }
        }
        return Promise.reject(error);
    }
);

// ===================== AUTH SERVICE =====================
export const houseService = {
    predict: async (data) => {
        const response = await api.post(API_ENDPOINTS.PREDICT, data);
        return response.data;
    },
};

// Export the configured axios instance if needed elsewhere
export default api;
