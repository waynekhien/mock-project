import axios from 'axios';
import api, { createErrorMessage } from './apiClient';
import type { LoginRequest, LoginResponse } from '../types';

// ===========================
// AUTHENTICATION API
// ===========================

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
      }
      throw new Error(createErrorMessage(error, 'Login failed'));
    }
  },

  register: async (credentials: { email: string; password: string; name?: string }): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/register', credentials);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Registration failed'));
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/logout');
    } catch (error) {
      // Logout can fail silently
      console.warn('Logout request failed:', error);
    }
  },

  // Get current user from localStorage
  getCurrentUser: (): LoginResponse['user'] | null => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Get access token from localStorage
  getAccessToken: (): string | null => {
    try {
      const token = localStorage.getItem('accessToken');
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },
};

export default authApi;
