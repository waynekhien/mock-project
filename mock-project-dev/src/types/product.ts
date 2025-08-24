// Product-related types and interfaces

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
