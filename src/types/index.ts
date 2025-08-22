// Barrel exports for all type modules

// Common types
export type { ApiResponse } from './common';

// Book-related types  
export type {
  Book,
  Author,
  Category,
  BookImage,
  QuantitySold,
  Seller,
  Specification,
  SpecificationAttribute
} from './book';

// User-related types
export type {
  User,
  UserUpdateData
} from './user';

// Authentication types
export type {
  LoginRequest,
  LoginResponse
} from './auth';

// Product types
export type {
  Product
} from './product';

// Cart types
export type {
  CartItem,
  CartRequest,
  CartResponse
} from './cart';

// Order types
export type {
  Order,
  OrderItem
} from './order';

// Search interface (keeping in main index as it's cross-cutting)
import type { Book } from './book';

export interface SearchResult {
  suggestions: string[];
  total: number;
  products: Book[];
}

export interface SearchParams {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'name';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
