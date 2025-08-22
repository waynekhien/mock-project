import api, { createErrorMessage } from './apiClient';
import type { CartRequest, CartResponse } from '../types';

// ===========================
// CART API
// ===========================

export const cartApi = {
  getAll: async (userId?: string): Promise<CartResponse[]> => {
    try {
      const params = userId ? { userId } : {};
      const response = await api.get<CartResponse[]>('/carts', { params });
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch cart items'));
    }
  },

  add: async (request: CartRequest): Promise<CartResponse> => {
    try {
      const response = await api.post<CartResponse>('/carts', request);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to add item to cart'));
    }
  },

  update: async (id: string, updates: Partial<CartRequest>): Promise<CartResponse> => {
    try {
      const response = await api.put<CartResponse>(`/carts/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to update cart item'));
    }
  },

  remove: async (bookId: string): Promise<void> => {
    try {
      await api.delete(`/carts/${bookId}`);
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to remove item from cart'));
    }
  },

  clear: async (): Promise<void> => {
    try {
      await api.delete('/carts');
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to clear cart'));
    }
  },
};

export default cartApi;
