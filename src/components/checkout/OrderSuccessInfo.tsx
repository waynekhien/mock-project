import React from 'react';
import { useCart } from '../../contexts/CartContext';

interface OrderSuccessInfoProps {
  orderId: string;
  orderDate: string;
}

const OrderSuccessInfo: React.FC<OrderSuccessInfoProps> = ({ orderId, orderDate }) => {
  const { items } = useCart();

  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg shadow-sm border p-6 h-full">
        {/* Order Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Mã đơn hàng: {orderId}
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">
            Xem đơn hàng
          </button>
        </div>
        
        <div className="text-sm text-gray-600 mb-6">Giao {orderDate}</div>
        
        {/* Order Items */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800 mb-4">Danh sách sản phẩm:</h3>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-12 h-12 rounded object-cover bg-white border flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 mb-1 text-sm truncate">{item.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">SL: {item.quantity}</span>
                  <span className="font-semibold text-gray-900 text-sm">
                    {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessInfo;
