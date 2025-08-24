import api, { createErrorMessage } from './apiClient';
import type { Book } from '../types';

// ===========================
// BOOKS API
// ===========================

export const booksApi = {
  getAll: async (): Promise<Book[]> => {
    try {
      const response = await api.get<Book[]>('/books');
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch books'));
    }
  },

  getById: async (id: string): Promise<Book> => {
    try {
      const response = await api.get<Book>(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch book'));
    }
  },

  getByCategory: async (categoryId: number): Promise<Book[]> => {
    try {
      const response = await api.get<Book[]>(`/books?category=${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch books by category'));
    }
  },

  getBestSellers: async (): Promise<Book[]> => {
    try {
      const response = await api.get<Book[]>('/books/bestsellers');
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch bestsellers'));
    }
  },

  search: async (query: string): Promise<Book[]> => {
    try {
      const response = await api.get<Book[]>(`/books/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to search books'));
    }
  },

  create: async (book: Omit<Book, 'id'>): Promise<Book> => {
    try {
      const response = await api.post<Book>('/books', book);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to create book'));
    }
  },

  update: async (id: string, book: Partial<Book>): Promise<Book> => {
    try {
      const response = await api.put<Book>(`/books/${id}`, book);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to update book'));
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/books/${id}`);
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to delete book'));
    }
  },
};

export default booksApi;
