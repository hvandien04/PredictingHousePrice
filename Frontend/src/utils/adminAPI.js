import axios from 'axios';

// ===================== API CONFIG =====================
export const API_URL = 'http://localhost:8080';
// export const API_URL= "http://192.168.1.11:8080";

export const API_ENDPOINTS = {
    // User Management
    GET_ALL_USERS: '/api/admin/get-all-users',
    CREATE_USER: '/api/admin/add-users',
    UPDATE_USER: (id) => `/api/admin/update-users/${id}`,
    DELETE_USER: (id) => `/api/admin/delete-users/${id}`,

    // Sellinghouse Management
    GET_ALL_HOUSES: '/api/admin/get-all-sellinghouses',
    CREATE_HOUSE: '/api/admin/create-sellinghouses',
    UPDATE_HOUSE: (id) => `/api/admin/update-sellinghouses/${id}`,
    DELETE_HOUSE: (id) => `/api/admin/delete-sellinghouses/${id}`,

    // Feedback Management
    GET_ALL_FEEDBACKS: '/api/admin/get-all-feedbacks',
    GET_FEEDBACK_BY_ID: (id) => `/api/admin/get-feedback/${id}`,
    UPDATE_FEEDBACK_STATUS: (id) => `/api/admin/update-feedback-status/${id}`,

    GET_DASHBOARD_DATA: '/api/admin/dashboard',
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
    (config) => config,
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
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

// ===================== ADMIN SERVICE =====================
export const adminService = {
    // User Management
    getAllUsers: async () => {
        const response = await api.get(API_ENDPOINTS.GET_ALL_USERS);
        return response.data;
    },
    createUser: async (userData) => {
        const response = await api.post(API_ENDPOINTS.CREATE_USER, userData);
        return response.data;
    },
    updateUser: async (id, userData) => {
        const response = await api.put(API_ENDPOINTS.UPDATE_USER(id), userData);
        return response.data;
    },
    deleteUser: async (id) => {
        const response = await api.delete(API_ENDPOINTS.DELETE_USER(id));
        return response.data;
    },

    // Sellinghouse Management
    getAllHouses: async () => {
        const response = await api.get(API_ENDPOINTS.GET_ALL_HOUSES);
        return response.data;
    },
    createHouse: async (houseData) => {
        const response = await api.post(API_ENDPOINTS.CREATE_HOUSE, houseData);
        return response.data;
    },
    updateHouse: async (id, houseData) => {
        const response = await api.put(API_ENDPOINTS.UPDATE_HOUSE(id), houseData);
        return response.data;
    },    
    deleteHouse: async (id) => {
        const response = await api.delete(API_ENDPOINTS.DELETE_HOUSE(id));
        return response.data;
    },

    // Feedback Management
    getAllFeedbacks: async () => {
        const response = await api.get(API_ENDPOINTS.GET_ALL_FEEDBACKS);
        return response.data;
    },
    getFeedbackById: async (id) => {
        const response = await api.get(API_ENDPOINTS.GET_FEEDBACK_BY_ID(id));
        return response.data;
    },
    updateFeedbackStatus: async (id) => {
        const response = await api.put(API_ENDPOINTS.UPDATE_FEEDBACK_STATUS(id));
        return response.data;
    },
    deleteFeedback: async (id) => {
        const response = await api.delete(API_ENDPOINTS.DELETE_FEEDBACK(id));
        return response.data;
    },
    getDashboardData: async () => {
        const response = await api.get(API_ENDPOINTS.GET_DASHBOARD_DATA);
        return response.data;
      },
};

export default api;
