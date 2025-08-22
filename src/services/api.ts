import axios from 'axios';
import type { Category, Book, User, Order, LoginRequest, LoginResponse, CartRequest, CartResponse, UserUpdateData } from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for auth
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Categories API functions
export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await api.get<Category[]>('/categories');
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch categories'
      );
    }
  },

  // Get category by ID
  getById: async (id: number): Promise<Category> => {
    try {
      const response = await api.get<Category>(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch category'
      );
    }
  },

  // Create new category
  create: async (category: Omit<Category, 'id'>): Promise<Category> => {
    try {
      const response = await api.post<Category>('/categories', category);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to create category'
      );
    }
  },

  // Update category
  update: async (id: number, category: Partial<Category>): Promise<Category> => {
    try {
      const response = await api.put<Category>(`/categories/${id}`, category);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to update category'
      );
    }
  },

  // Delete category
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/categories/${id}`);
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to delete category'
      );
    }
  },
};

// Books API functions
export const booksApi = {
  // Get all books
  getAll: async (): Promise<Book[]> => {
    try {
      const response = await api.get<Book[]>('/books');
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch books'
      );
    }
  },

  // Get book by ID
  getById: async (id: string): Promise<Book> => {
    try {
      const response = await api.get<Book>(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch book'
      );
    }
  },

  // Note: The following methods are not supported by the current API
  // Only basic CRUD operations are available: GET, POST, PUT by id, GET by id, DELETE by id

  // Create new book
  create: async (book: Omit<Book, 'id'>): Promise<Book> => {
    try {
      const response = await api.post<Book>('/books', book);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to create book'
      );
    }
  },

  // Update book
  update: async (id: string, book: Partial<Book>): Promise<Book> => {
    try {
      const response = await api.put<Book>(`/books/${id}`, book);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to update book'
      );
    }
  },

  // Delete book
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/books/${id}`);
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to delete book'
      );
    }
  },
};

// Users API functions
export const usersApi = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/users');
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch users'
      );
    }
  },

  // Get user by ID
  getById: async (id: string): Promise<User> => {
    try {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch user'
      );
    }
  },

  // Create new user
  create: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    try {
      const response = await api.post<User>('/users', user);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to create user'
      );
    }
  },

  // Update user
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
        // Add extended fields support
        ...(user.firstName !== undefined && { firstName: user.firstName }),
        ...(user.lastName !== undefined && { lastName: user.lastName }),
        ...(user.nickname !== undefined && { nickname: user.nickname }),
        ...(user.gender !== undefined && { gender: user.gender }),
        ...(user.country !== undefined && { country: user.country }),
        ...(user.birthDate !== undefined && { birthDate: user.birthDate }),
        // Add updatedAt timestamp
        updatedAt: new Date().toISOString()
      };
      
      // DO NOT include password in update requests to prevent accidental password changes
      // Password updates should be handled by a separate endpoint
      
      console.log('API updateUser - Request data (should NOT contain password):', updateData);
      
      // Use PATCH instead of PUT to avoid backend auto-generating password
      const response = await api.patch<User>(`/users/${id}`, updateData);
      console.log('API updateUser - Response data:', response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to update user'
      );
    }
  },

  // Delete user
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to delete user'
      );
    }
  },
};

// Orders API functions
export const ordersApi = {
  // Get all orders
  getAll: async (): Promise<Order[]> => {
    try {
      const response = await api.get<Order[]>('/orders');
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch orders'
      );
    }
  },

  // Get order by ID
  getById: async (id: string): Promise<Order> => {
    try {
      const response = await api.get<Order>(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch order'
      );
    }
  },

  // Get orders by user ID
  getByUserId: async (userId: string): Promise<Order[]> => {
    try {
      const response = await api.get<Order[]>(`/orders?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch user orders'
      );
    }
  },

  // Create new order
  create: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    try {
      const response = await api.post<Order>('/orders', order);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to create order'
      );
    }
  },

  // Update order
  update: async (id: string, order: Partial<Order>): Promise<Order> => {
    try {
      const response = await api.put<Order>(`/orders/${id}`, order);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to update order'
      );
    }
  },

  // Update order status
  updateStatus: async (id: string, status: Order['status']): Promise<Order> => {
    try {
      const response = await api.patch<Order>(`/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to update order status'
      );
    }
  },

  // Delete order
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/orders/${id}`);
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to delete order'
      );
    }
  },
};

// Authentication API functions
export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log('authApi - login attempt with:', credentials);
      const response = await api.post<LoginResponse>('/login', credentials);
      console.log('authApi - login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('authApi - login error:', error);
      if (axios.isAxiosError(error)) {
        console.error('authApi - error response:', error.response?.data);
        console.error('authApi - error status:', error.response?.status);
        console.error('authApi - error headers:', error.response?.headers);
      }
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Login failed'
      );
    }
  },

  // Register user
  register: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    try {
      // Add default role "user" for new registrations
      const registerData = {
        ...credentials,
        role: 'user'
      };
      
      const response = await api.post<LoginResponse>('/register', registerData);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Registration failed'
      );
    }
  },

  // Logout user (optional - clears localStorage)
  logout: async (): Promise<void> => {
    try {
      console.log('authApi - logout called');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      console.log('authApi - localStorage cleared');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Get current user from localStorage
  getCurrentUser: (): LoginResponse['user'] | null => {
    try {
      const user = localStorage.getItem('user');
      console.log('authApi - getCurrentUser:', user);
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
      console.log('authApi - getAccessToken:', token);
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },
};

// Cart API functions
export const cartsApi = {
  // Get all cart items for a user
  getAll: async (userId?: string): Promise<CartResponse[]> => {
    try {
      const params = userId ? { userId } : {};
      const response = await api.get<CartResponse[]>('/carts', { params });
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch cart items'
      );
    }
  },

  // Add item to cart
  add: async (cartItem: CartRequest): Promise<CartResponse> => {
    try {
      const response = await api.post<CartResponse>('/carts', cartItem);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to add item to cart'
      );
    }
  },

  // Update cart item quantity
  update: async (id: string, updates: Partial<CartRequest>): Promise<CartResponse> => {
    try {
      const response = await api.put<CartResponse>(`/carts/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to update cart item'
      );
    }
  },

  // Remove item from cart
  remove: async (id: string): Promise<void> => {
    try {
      await api.delete(`/carts/${id}`);
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to remove cart item'
      );
    }
  },

  // Clear all cart items for a user
  clear: async (userId?: string): Promise<void> => {
    try {
      const params = userId ? { userId } : {};
      await api.delete('/carts', { params });
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to clear cart'
      );
    }
  },

  // Get cart item by product ID
  getByProductId: async (productId: string, userId?: string): Promise<CartResponse | null> => {
    try {
      const params = { productId, ...(userId && { userId }) };
      const response = await api.get<CartResponse[]>('/carts', { params });
      return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error('Error getting cart item by product ID:', error);
      return null;
    }
  },
};

// Legacy exports for backward compatibility
// Currently used by admin hooks: useUserManagement, useBookManagement, useOrderManagement
// TODO: Update admin hooks to use the new API structure (usersApi, booksApi, ordersApi)
export const fetchUsers = usersApi.getAll;
export const createUser = usersApi.create;
export const updateUser = usersApi.update;
export const deleteUser = usersApi.delete;

export const createBook = booksApi.create;
export const updateBook = booksApi.update;
export const deleteBook = booksApi.delete;

export const fetchOrders = ordersApi.getAll;
export const createOrder = ordersApi.create;
export const updateOrder = ordersApi.update;
export const deleteOrder = ordersApi.delete;