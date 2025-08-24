import React, { useState } from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, X } from 'lucide-react';
import type { Order } from '../../../types';

interface OrderStatusUpdateModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (status: Order['status']) => Promise<void>;
  loading: boolean;
}

const OrderStatusUpdateModal: React.FC<OrderStatusUpdateModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
  loading
}) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const statusOptions = [
    { value: 'pending', label: 'Chờ xử lý', icon: Clock, color: 'yellow' },
    { value: 'confirmed', label: 'Đã xác nhận', icon: Package, color: 'blue' },
    { value: 'shipping', label: 'Đang giao', icon: Truck, color: 'orange' },
    { value: 'delivered', label: 'Hoàn thành', icon: CheckCircle, color: 'green' },
    { value: 'cancelled', label: 'Đã hủy', icon: XCircle, color: 'red' }
  ];

  const handleUpdate = async () => {
    if (selectedStatus === order.status) {
      onClose();
      return;
    }

    try {
      await onUpdateStatus(selectedStatus as Order['status']);
      onClose();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const getStatusColor = (color: string) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      red: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getSelectedColor = (color: string) => {
    const colors = {
      yellow: 'bg-yellow-500 border-yellow-600',
      blue: 'bg-blue-500 border-blue-600',
      orange: 'bg-orange-500 border-orange-600',
      green: 'bg-green-500 border-green-600',
      red: 'bg-red-500 border-red-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Cập nhật trạng thái đơn hàng
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Đơn hàng: #{order.id}</p>
            <p className="text-sm text-gray-600">Khách hàng: {order.userName}</p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Chọn trạng thái mới:
            </label>
            
            {statusOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedStatus === option.value;
              
              return (
                <label
                  key={option.value}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? `${getSelectedColor(option.color)} text-white`
                      : `${getStatusColor(option.color)} hover:bg-opacity-80`
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={isSelected}
                    onChange={(e) => setSelectedStatus(e.target.value as Order['status'])}
                    className="sr-only"
                  />
                  <IconComponent className={`w-5 h-5 mr-3 ${isSelected ? 'text-white' : ''}`} />
                  <span className={`font-medium ${isSelected ? 'text-white' : ''}`}>
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading || selectedStatus === order.status}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang cập nhật...' : 'Cập nhật'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusUpdateModal;
