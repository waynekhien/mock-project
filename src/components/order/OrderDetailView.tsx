import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  DeliveryAddress,
  DeliveryMethod,
  PaymentMethod,
  OrderItems
} from './index';
import type { Order } from '../../types';

interface OrderDetailViewProps {
  order: Order;
  onBack: () => void;
}

const OrderDetailView: React.FC<OrderDetailViewProps> = ({
  order,
  onBack
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ thanh toán';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'shipping':
        return 'Đang vận chuyển';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Đã huỷ';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-6 border-b">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại đơn hàng của tôi</span>
        </button>
        
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Chi tiết đơn hàng #{order.id} - {getStatusText(order.status)}
            </h2>
            <p className="text-gray-600 mt-1">
              Ngày đặt hàng: {formatDate(order.createdAt)}
            </p>
          </div>
          
          {order.status === 'pending' && (
            <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
              Huỷ đơn hàng
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Top Row - 3 components horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <DeliveryAddress order={order} />
          <DeliveryMethod order={order} />
          <PaymentMethod order={order} />
        </div>

        {/* Bottom Row - Order Items full width */}
        <div>
          <OrderItems
            order={order}
            onCancelOrder={() => {
              if (window.confirm('Bạn có chắc chắn muốn huỷ đơn hàng này?')) {
                // Handle cancel order logic here
                console.log('Cancel order:', order.id);
              }
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Quay lại đơn hàng của tôi
        </button>
        
        <button className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors">
          Theo dõi đơn hàng
        </button>
      </div>
    </div>
  );
};

export default OrderDetailView;
