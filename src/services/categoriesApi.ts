import api, { createErrorMessage } from './apiClient';
import type { Category } from '../types';

// ===========================
// CATEGORIES API
// ===========================

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await api.get<Category[]>('/categories');
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch categories'));
    }
  },

  getById: async (id: number): Promise<Category> => {
    try {
      const response = await api.get<Category>(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch category'));
    }
  },

  create: async (category: Omit<Category, 'id'>): Promise<Category> => {
    try {
      const response = await api.post<Category>('/categories', category);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to create category'));
    }
  },

  update: async (id: number, category: Partial<Category>): Promise<Category> => {
    try {
      const response = await api.put<Category>(`/categories/${id}`, category);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to update category'));
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/categories/${id}`);
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to delete category'));
    }
  },
};

export default categoriesApi;
