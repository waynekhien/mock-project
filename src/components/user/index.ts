// User component modules barrel exports

// Home page components
export * from './home';

// Product-related components  
export * from './products';

// Cart components
export * from './cart';

// Checkout components
export * from './checkout';

// Order components (with prefixed names to avoid conflicts)
export { 
  OrderDetailModal,
  OrderDetailView,
  DeliveryAddress as OrderDeliveryAddress,
  DeliveryMethod as OrderDeliveryMethod, 
  PaymentMethod as OrderPaymentMethod,
  OrderItems
} from './orders';

// Profile components
export * from './profile';

// Navigation components
export * from './navigation';

// Search components
export * from './search';

