import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_PIC_URL = import.meta.env.VITE_API_PIC_URL || 'http://localhost:5000/uploads';

export const BACKEND_URL = API_BASE_URL.replace('/api', '');

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('/uploads')) {
    return `${API_PIC_URL}${path.replace('/uploads', '')}`;
  }
  return `${BACKEND_URL}${path}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      const token = localStorage.getItem('token');

      if (token && refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const newToken = response.data.data.token;
          localStorage.setItem('token', newToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return api(originalRequest);
        } catch {
          if (originalRequest.url?.includes('/auth/')) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
          return Promise.reject(error);
        }
      }
    }

    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message;

      switch (status) {
        case 400:
          toast.error(message || 'Bad request');
          break;
        case 401:
          toast.error(message || 'Unauthorized');
          break;
        case 403:
          toast.error(message || 'Access denied');
          break;
        case 404:
          toast.error(message || 'Not found');
          break;
        case 500:
          toast.error(message || 'Server error');
          break;
        default:
          toast.error(message || 'An error occurred');
      }
    } else if (error.request) {
      toast.error('No response from server');
    } else {
      toast.error(error.message || 'An error occurred');
    }

    return Promise.reject(error);
  }
);

export const createFormData = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (typeof value === 'object' && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export { api };
export default api;
