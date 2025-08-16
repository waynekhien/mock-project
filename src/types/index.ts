// TypeScript type definitions will go here

export interface Category {
  id: number;
  name: string;
  description?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  is_leaf?: boolean;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
}

export interface BookImage {
  base_url: string;
  is_gallery: boolean;
  label: string | null;
  large_url: string;
  medium_url: string;
  position: number | null;
  small_url: string;
  thumbnail_url: string;
}

export interface Seller {
  id: number;
  sku: string;
  name: string;
  link: string;
  logo: string;
  price: number;
  product_id: string;
  store_id: number;
  is_best_store: boolean;
  is_offline_installment_supported: boolean | null;
}

export interface QuantitySold {
  text: string;
  value: number;
}

export interface SpecificationAttribute {
  code: string;
  name: string;
  value: string;
}

export interface Specification {
  name: string;
  attributes: SpecificationAttribute[];
}

export interface Book {
  id: string;
  name: string;
  authors?: Author[];
  book_cover: string | null;
  categories: Category;
  current_seller: Seller;
  description: string;
  images: BookImage[];
  list_price: number;
  original_price: number;
  quantity_sold: QuantitySold;
  rating_average: number;
  short_description: string;
  specifications: Specification[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'customer';
  createdAt: string;
  updatedAt?: string;
}

// Product interface (generic product, can be used for books or other items)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand?: string;
  stock: number;
  images: string[];
  rating?: number;
  createdAt: string;
  updatedAt?: string;
}

// Order interface
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}