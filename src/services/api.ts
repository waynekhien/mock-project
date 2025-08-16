import axios from 'axios';
import type { Category, Book, User, Product, Order } from '../types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
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

  // Get books by category
  getByCategory: async (categoryId: number): Promise<Book[]> => {
    try {
      const response = await api.get<Book[]>(`/books?category=${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch books by category'
      );
    }
  },

  // Search books
  search: async (query: string): Promise<Book[]> => {
    try {
      const response = await api.get<Book[]>(`/books?search=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to search books'
      );
    }
  },

  // Get books by author
  getByAuthor: async (authorId: number): Promise<Book[]> => {
    try {
      const response = await api.get<Book[]>(`/books?author=${authorId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch books by author'
      );
    }
  },

  // Get related books (optimized endpoint for related products)
  getRelated: async (bookId: string, type: 'category' | 'author', limit = 6): Promise<Book[]> => {
    try {
      const response = await api.get<Book[]>(`/books/${bookId}/related?type=${type}&limit=${limit}`);
      return response.data;
    } catch (error) {
      // Fallback to existing methods if the optimized endpoint doesn't exist
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch related books'
      );
    }
  },

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
  update: async (id: string, user: Partial<User>): Promise<User> => {
    try {
      const response = await api.put<User>(`/users/${id}`, user);
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

// Products API functions
export const productsApi = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch products'
      );
    }
  },

  // Get product by ID
  getById: async (id: string): Promise<Product> => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to fetch product'
      );
    }
  },

  // Create new product
  create: async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    try {
      const response = await api.post<Product>('/products', product);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to create product'
      );
    }
  },

  // Update product
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    try {
      const response = await api.put<Product>(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to update product'
      );
    }
  },

  // Delete product
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Failed to delete product'
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

// Legacy exports for backward compatibility
// These can be removed once all components are updated to use the new API structure
export const fetchUsers = usersApi.getAll;
export const createUser = usersApi.create;
export const updateUser = usersApi.update;
export const deleteUser = usersApi.delete;

export const createProduct = productsApi.create;
export const updateProduct = productsApi.update;
export const deleteProduct = productsApi.delete;

export const createBook = booksApi.create;
export const updateBook = booksApi.update;
export const deleteBook = booksApi.delete;

export const fetchOrders = ordersApi.getAll;
export const createOrder = ordersApi.create;
export const updateOrder = ordersApi.update;
export const deleteOrder = ordersApi.delete;