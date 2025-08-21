import React from 'react';
import type { Order } from '../../types';

interface DeliveryMethodProps {
  order: Order;
}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ order }) => {
  const getDeliveryInfo = () => {
    return {
      method: order.deliveryMethod || 'Giao hàng tiêu chuẩn',
      estimatedTime: order.deliveryTime || 'Đang xử lý',
      description: order.deliveryDescription || 'Giao hàng trong 3-5 ngày làm việc',
      isExpress: order.deliveryMethod?.toLowerCase().includes('express') ||
                 order.deliveryMethod?.toLowerCase().includes('nhanh') ||
                 order.deliveryMethod?.toLowerCase().includes('siêu tốc')
    };
  };

  const deliveryInfo = getDeliveryInfo();

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase">
        HÌNH THỨC GIAO HÀNG
      </h3>

      <div className="space-y-2">
        {/* Delivery Method */}
        <div className="flex items-center gap-2">
          {deliveryInfo.isExpress && (
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
              NOW
            </span>
          )}
          <span className="font-medium text-gray-900">
            {deliveryInfo.method}
          </span>
        </div>

        {/* Estimated Time */}
        <div>
          <p className="text-sm text-gray-700">
            {deliveryInfo.estimatedTime}
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-gray-700">
            {deliveryInfo.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMethod;
