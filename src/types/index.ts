export interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  saleOffPrice: number;
  description: string;
  categoryId: string;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}
// TypeScript type definitions will go here
