import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth token to requests only if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const search = {
  bypass: async (url: string) => {
    try {
      const response = await api.post('/search/bypass', { url });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error || 'Failed to bypass paywall');
      }
      throw error;
    }
  },

  getHistory: async (page = 1) => {
    try {
      const response = await api.get(`/search/history?page=${page}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteHistoryEntry: async (id: string) => {
    try {
      const response = await api.delete(`/search/history/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api; 
