// ===========================
// API SERVICES BARREL EXPORTS
// ===========================

// Re-export all API modules
export { categoriesApi } from './categoriesApi';
export { booksApi } from './booksApi';
export { usersApi } from './usersApi';
export { ordersApi } from './ordersApi';
export { authApi } from './authApi';
export { cartApi } from './cartApi';

// Export the main API client
export { default as apiClient } from './apiClient';

// ===========================
// LEGACY EXPORTS (for backward compatibility)
// ===========================

// Import APIs for legacy exports
import { categoriesApi } from './categoriesApi';
import { booksApi } from './booksApi';
import { usersApi } from './usersApi';
import { ordersApi } from './ordersApi';

// Legacy function exports
export const fetchCategories = categoriesApi.getAll;
export const fetchBooks = booksApi.getAll;
export const fetchBookById = booksApi.getById;
export const fetchBooksOnSale = booksApi.getBestSellers;
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
