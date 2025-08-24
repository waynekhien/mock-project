import api, { createErrorMessage } from './apiClient';
import type { Order } from '../types';

// ===========================
// ORDERS API
// ===========================

export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    try {
      const response = await api.get<Order[]>('/orders');
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch orders'));
    }
  },

  getById: async (id: string): Promise<Order> => {
    try {
      const response = await api.get<Order>(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch order'));
    }
  },

  getByUserId: async (userId: string): Promise<Order[]> => {
    try {
      const response = await api.get<Order[]>(`/orders?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch user orders'));
    }
  },

  create: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    try {
      const response = await api.post<Order>('/orders', order);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to create order'));
    }
  },

  update: async (id: string, order: Partial<Order>): Promise<Order> => {
    try {
      const response = await api.put<Order>(`/orders/${id}`, order);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to update order'));
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/orders/${id}`);
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to delete order'));
    }
  },
};

export default ordersApi;
