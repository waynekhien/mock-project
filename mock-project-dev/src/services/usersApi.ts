import api, { createErrorMessage } from './apiClient';
import type { User, UserUpdateData } from '../types';

// ===========================
// USERS API
// ===========================

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/users');
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch users'));
    }
  },

  getById: async (id: string): Promise<User> => {
    try {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to fetch user'));
    }
  },

  create: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    try {
      const response = await api.post<User>('/users', user);
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to create user'));
    }
  },

  /**
   * Update user profile without affecting password
   * Uses PATCH to only update provided fields
   */
  update: async (id: string, user: UserUpdateData): Promise<User> => {
    try {
      // Create update object with ONLY the fields we want to update
      // DO NOT copy all current data to avoid including password
      const updateData: any = {
        // Only include fields that are provided in the update request
        ...(user.name !== undefined && { name: user.name }),
        ...(user.email !== undefined && { email: user.email }),
        ...(user.phone !== undefined && { phone: user.phone }),
        ...(user.role !== undefined && { role: user.role }),
        // Extended profile fields
        ...(user.firstName !== undefined && { firstName: user.firstName }),
        ...(user.lastName !== undefined && { lastName: user.lastName }),
        ...(user.nickname !== undefined && { nickname: user.nickname }),
        ...(user.gender !== undefined && { gender: user.gender }),
        ...(user.country !== undefined && { country: user.country }),
        ...(user.birthDate !== undefined && { birthDate: user.birthDate }),
        // Add timestamp
        updatedAt: new Date().toISOString()
      };
      
      console.log('API updateUser - Request data (should NOT contain password):', updateData);
      
      // Use PATCH instead of PUT to avoid backend auto-generating password
      const response = await api.patch<User>(`/users/${id}`, updateData);
      console.log('API updateUser - Response data:', response.data);
      
      return response.data;
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to update user'));
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      throw new Error(createErrorMessage(error, 'Failed to delete user'));
    }
  },
};

export default usersApi;
