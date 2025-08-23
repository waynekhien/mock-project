import React from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, CreditCard } from 'lucide-react';
import type { Order } from '../../../types';

interface OrderItemProps {
  order: Order;
  onViewDetails: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  order,
  onViewDetails,
  onReorder,
  onCancelOrder
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipping':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ thanh toán';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'processing':
        return 'Đang xử lý';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'confirmed':
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'shipping':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'delivered':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-4 hover:shadow-md transition-shadow max-[389px]:p-4 max-[389px]:rounded-none max-[389px]:shadow-none max-[389px]:border-x-0 max-[389px]:mb-2">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 max-[389px]:flex-col max-[389px]:gap-2">
        <div className="flex items-center gap-3 max-[389px]:w-full max-[389px]:justify-between">
          <span className="text-sm font-medium text-gray-600 max-[389px]:text-xs">Mã đơn hàng:</span>
          <span className="text-sm font-bold text-gray-900 max-[389px]:text-xs">#{order.id}</span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border max-[389px]:px-1 max-[389px]:py-0.5 ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="max-[389px]:text-xs">{getStatusText(order.status)}</span>
          </div>
        </div>
        <div className="text-right max-[389px]:w-full max-[389px]:text-left">
          <div className="text-sm text-gray-600 max-[389px]:text-xs">Ngày đặt</div>
          <div className="text-sm font-medium text-gray-900 max-[389px]:text-xs">
            {formatDate(order.createdAt)}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-3 mb-4 max-[389px]:space-y-2 max-[389px]:mb-3">
        {order.items.slice(0, 2).map((item, index) => (
          <div key={index} className="flex items-center gap-4 max-[389px]:gap-3">
            <img
              src={item.productImage || '/placeholder-book.jpg'}
              alt={item.productName}
              className="w-16 h-16 rounded-lg object-cover bg-gray-100 border max-[389px]:w-12 max-[389px]:h-12"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-book.jpg';
              }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate max-[389px]:text-xs">
                {item.productName}
              </h4>
              <div className="flex items-center gap-4 mt-1 max-[389px]:gap-2">
                <span className="text-sm text-gray-600 max-[389px]:text-xs">SL: {item.quantity}</span>
                <span className="text-sm font-semibold text-gray-900 max-[389px]:text-xs">
                  {item.total.toLocaleString('vi-VN')} ₫
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {order.items.length > 2 && (
          <div className="text-sm text-gray-600 text-center py-2 max-[389px]:text-xs max-[389px]:py-1">
            và {order.items.length - 2} sản phẩm khác...
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t max-[389px]:flex-col max-[389px]:gap-3 max-[389px]:pt-3">
        <div className="flex items-center gap-4 max-[389px]:w-full max-[389px]:gap-2 max-[389px]:text-xs">
          <div className="flex items-center gap-1 text-sm text-gray-600 max-[389px]:text-xs">
            <CreditCard className="w-4 h-4 max-[389px]:w-3 max-[389px]:h-3" />
            <span>{order.paymentMethodDisplay || 'Thanh toán tiền mặt'}</span>
          </div>
          {order.deliveryMethod && (
            <div className="text-sm text-gray-600 max-[389px]:text-xs">
              Giao hàng: {order.deliveryMethod}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 max-[389px]:w-full max-[389px]:justify-between max-[389px]:gap-2">
          <div className="text-right max-[389px]:text-left">
            <div className="text-sm text-gray-600 max-[389px]:text-xs">Tổng tiền</div>
            <div className="text-lg font-bold text-red-600 max-[389px]:text-base">
              {order.totalAmount.toLocaleString('vi-VN')} ₫
            </div>
          </div>
          
          <div className="flex gap-2 max-[389px]:w-full max-[389px]:justify-end">
            <button
              onClick={() => onViewDetails(order.id)}
              className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors max-[389px]:px-3 max-[389px]:py-1 max-[389px]:text-xs"
            >
              Xem chi tiết
            </button>
            
            {order.status === 'delivered' && onReorder && (
              <button
                onClick={() => onReorder(order.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors max-[389px]:px-3 max-[389px]:py-1 max-[389px]:text-xs"
              >
                Mua lại
              </button>
            )}
            
            {order.status === 'pending' && onCancelOrder && (
              <button
                onClick={() => onCancelOrder(order.id)}
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors max-[389px]:px-3 max-[389px]:py-1 max-[389px]:text-xs"
              >
                Huỷ đơn
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

