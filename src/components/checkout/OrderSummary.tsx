import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useDelivery } from '../../contexts/DeliveryContext';
import { formatPrice } from '../../lib/format';

const OrderSummary: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useCart();
  const { getDeliveryFee, getDeliveryDiscount } = useDelivery();

  // Calculate discounts and fees based on selected delivery method
  const subtotal = totalPrice;
  const shippingFee = getDeliveryFee();
  const shippingDiscount = getDeliveryDiscount();
  
  // Calculate final total
  const finalTotal = subtotal + shippingFee + shippingDiscount;
  const savings = Math.abs(shippingDiscount);

  const handlePlaceOrder = () => {
    // Navigate to order success page
    navigate('/order-success');
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
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        Đặt hàng
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
