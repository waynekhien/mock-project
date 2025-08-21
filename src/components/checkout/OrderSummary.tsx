import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useDelivery } from '../../contexts/DeliveryContext';
import { usePayment } from '../../contexts/PaymentContext';
import { useAuth } from '../../contexts/AuthContext';
import { ordersApi } from '../../services/api';
import { formatPrice } from '../../lib/format';


const OrderSummary: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { getDeliveryFee, getDeliveryDiscount, selectedDelivery } = useDelivery();
  const { getPaymentMethodName, selectedPayment } = usePayment();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Helper function to get delivery method details
  const getDeliveryMethodDetails = () => {
    switch (selectedDelivery) {
      case 'now':
        return {
          name: 'Express',
          time: '1-2 ngày',
          description: 'Giao hàng nhanh'
        };
      case 'standard':
        return {
          name: 'Standard',
          time: '3-5 ngày',
          description: 'Giao hàng tiêu chuẩn'
        };
      default:
        return {
          name: 'Standard',
          time: '3-5 ngày',
          description: 'Giao hàng tiêu chuẩn'
        };
    }
  };

  // Calculate discounts and fees based on selected delivery method
  const subtotal = totalPrice;
  const shippingFee = getDeliveryFee();
  const shippingDiscount = getDeliveryDiscount();

  // Calculate final total
  const finalTotal = subtotal + shippingFee + shippingDiscount;
  const savings = Math.abs(shippingDiscount);

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập để đặt hàng');
      return;
    }

    if (!(user as any).address) {
      alert('Vui lòng thêm địa chỉ giao hàng');
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Prepare order items
      const orderItems = items.map(item => ({
        book_id: item.productId,
        quantity: item.quantity,
        price: item.price
      }));

      const deliveryDetails = getDeliveryMethodDetails();
      const paymentMethodName = getPaymentMethodName();

      // Debug log
      console.log('🔍 Payment Debug:', {
        selectedPayment,
        paymentMethodName,
        willSaveAs: paymentMethodName === 'Thanh toán tiền mặt' ? 'cash' : 'bank_transfer'
      });

      // Create order data matching Order interface
      const orderData = {
        userId: user.id.toString(),
        userName: (user as any).name || `${user.firstName} ${user.lastName}` || 'Unknown',
        userEmail: user.email,
        userPhone: (user as any).phone || '',
        items: orderItems.map(item => {
          const cartItem = items.find(i => i.productId === item.book_id);
          return {
            id: `item_${Date.now()}_${Math.random()}`,
            productId: item.book_id,
            productName: cartItem?.name || 'Unknown Product',
            productImage: cartItem?.image || '',
            quantity: item.quantity,
            price: item.price,
            originalPrice: cartItem?.originalPrice || item.price,
            total: item.quantity * item.price
          };
        }),
        totalAmount: finalTotal,
        status: 'pending' as const,
        paymentMethod: (paymentMethodName === 'Thanh toán tiền mặt' ? 'cash' : 'bank_transfer') as 'cash' | 'card' | 'bank_transfer',
        paymentMethodDisplay: paymentMethodName,
        paymentStatus: 'pending' as const,
        shippingAddress: (user as any).address || 'Chưa có địa chỉ',
        deliveryMethod: deliveryDetails.name,
        deliveryTime: deliveryDetails.time,
        deliveryDescription: deliveryDetails.description,
        notes: `Delivery: ${deliveryDetails.name} (${deliveryDetails.time}) - ${deliveryDetails.description}. Payment: ${paymentMethodName}`,
        createdAt: new Date().toISOString()
      };

      const newOrder = await ordersApi.create(orderData);

      // Clear cart after successful order
      clearCart();

      // Navigate to order success page with order ID
      navigate(`/order-success?orderId=${newOrder.id}`);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Không thể đặt hàng. Vui lòng thử lại.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Đơn hàng</h2>
        <p className="text-gray-600 text-center py-8">Chưa có sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Đơn hàng</h2>
      
      {/* Product Summary */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-blue-600 cursor-pointer hover:underline">
          <span>{totalItems} sản phẩm</span>
          <span>Xem thông tin</span>
        </div>
      </div>

      {/* Order Breakdown */}
      <div className="space-y-3 pb-4 border-b">
        <div className="flex justify-between text-sm">
          <span>Tổng tiền hàng</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Phí vận chuyển</span>
          <span>{formatPrice(shippingFee)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-green-600">
          <span>Giảm giá vận chuyển</span>
          <span>{formatPrice(shippingDiscount)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="py-4 border-b">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Tổng tiền thanh toán</span>
          <span className="text-xl font-bold text-red-600">{formatPrice(finalTotal)}</span>
        </div>
        {savings > 0 && (
          <p className="text-sm text-green-600 mt-1">
            Tiết kiệm {formatPrice(savings)}
          </p>
        )}
      </div>

      {/* Tax Notice */}
      <p className="text-xs text-gray-500 mt-3 mb-4">
        (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
      </p>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder || items.length === 0}
        className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isPlacingOrder && (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
        {isPlacingOrder ? 'Đang đặt hàng...' : 'Đặt hàng'}
      </button>

      {/* Product List (collapsed) */}
      {/* <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
              <p className="text-xs text-gray-600">SL: x{item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-red-600">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default OrderSummary;
