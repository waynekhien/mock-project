import axios from 'axios';

// ===========================
// AXIOS INSTANCE CONFIGURATION
// ===========================

const api = axios.create({
  baseURL: 'https://mock-project-be-sacb.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// ===========================
// ERROR HANDLING UTILITY
// ===========================

export const createErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || defaultMessage;
  }
  return defaultMessage;
};

export default api;
