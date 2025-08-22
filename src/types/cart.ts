// Cart-related types and interfaces

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  userId?: string;
}

export interface CartRequest {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  userId: string;
  image?: string;
  
  // Thông tin chi tiết sản phẩm
  originalPrice?: number;
  description?: string;
  category?: string;
  brand?: string;
  
  // Thông tin đơn hàng
  addedAt?: string;
}

export interface CartResponse {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  userId: string;
  image?: string;
  
  // Thông tin chi tiết sản phẩm
  originalPrice?: number;
  description?: string;
  category?: string;
  brand?: string;
  
  // Thông tin đơn hàng
  addedAt?: string;
  createdAt: string;
  updatedAt?: string;
}
