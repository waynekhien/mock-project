// Order-related types and interfaces

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'bank_transfer';
  paymentMethodDisplay?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: string;
  deliveryMethod?: string;
  deliveryTime?: string;
  deliveryDescription?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}
