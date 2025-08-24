import React from 'react';
import { ShoppingCart, Eye, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: string;
  time: string;
}

interface RecentOrdersProps {
  orders: Order[];
  onViewAll?: () => void;
}

const RecentOrders: React.FC<RecentOrdersProps> = ({
  orders,
  onViewAll
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, text: 'Hoàn thành', color: 'bg-green-100 text-green-700' };
      case 'processing':
        return { icon: Clock, text: 'Đang xử lý', color: 'bg-yellow-100 text-yellow-700' };
      case 'shipping':
        return { icon: Truck, text: 'Đang giao', color: 'bg-blue-100 text-blue-700' };
      case 'cancelled':
        return { icon: XCircle, text: 'Đã hủy', color: 'bg-red-100 text-red-700' };
      default:
        return { icon: Clock, text: 'Chờ xử lý', color: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h2>
            <p className="text-gray-600 text-sm mt-1">Theo dõi đơn hàng mới nhất</p>
          </div>
          {onViewAll && (
            <button 
              onClick={onViewAll}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Xem tất cả
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-gray-600 text-sm">{order.customer}</p>
                    <p className="text-gray-500 text-xs">{order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 mb-1">
                    {order.amount.toLocaleString()}đ
                  </p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
