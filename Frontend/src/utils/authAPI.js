import { Email, Send } from '@mui/icons-material';
import axios from 'axios';

// ===================== API CONFIG =====================
export const API_URL = 'http://localhost:8080';
// export const API_URL= "http://192.168.1.11:8080";

export const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    SESSION: '/api/auth/session',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_RESET_CODE: '/api/auth/verify-reset-code',
    SEND_RESET_CODE: '/api/auth/send-reset-code',
    UPDATE_PROFILE: '/api/auth/update-profile',
    UPDATE_PASSWORD: '/api/auth/update-password',
    FEEDBACK: '/api/user/feedback',
    
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
export const authService = {
    login: async (email, password) => {
        const loginData = { email, password };
        const response = await api.post(API_ENDPOINTS.LOGIN, loginData);
        return response.data === "login success";
    },
    register: async (userData) => {
        const response = await api.post(API_ENDPOINTS.REGISTER, userData);
        return response.data;
    },

    logout: async () => {
        const response = await api.post(API_ENDPOINTS.LOGOUT, {});
        return response.data;
    },

    checkSession: async () => {
        const response = await api.get(API_ENDPOINTS.SESSION);
        return response.data.message === "User is logged in!";
    },

    getCurrentUser: async () => {
        const response = await api.get(API_ENDPOINTS.SESSION);
        return response.data.user;
    },

    updateProfile: async (userData) => {
        const response = await api.put(API_ENDPOINTS.UPDATE_PROFILE, userData);
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.put(API_ENDPOINTS.UPDATE_PASSWORD, passwordData);
        return response.data;
    },

    feedback: async (feedbackData) => {
        const response = await api.post(API_ENDPOINTS.FEEDBACK, feedbackData);
        return response.data;

    },

    sendResetCode: async (email) => {
        const response = await api.post(API_ENDPOINTS.SEND_RESET_CODE, { email });
        return response.data;
    },
    resetPassword: async (email,newPassword, code) => {
        const response = await api.post(API_ENDPOINTS.RESET_PASSWORD, {email, newPassword, code });
        return response.data;
    },
    verifyResetCode: async (email, code) => {
        const requestData = {
            email,
            code
        };
        const response = await api.post(API_ENDPOINTS.VERIFY_RESET_CODE, requestData);
        return response.data;
    },
};

export default api;
