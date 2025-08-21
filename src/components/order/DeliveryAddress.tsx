import React from 'react';
import type { Order } from '../../types';

interface DeliveryAddressProps {
  order: Order;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ order }) => {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase">
        ĐỊA CHỈ NGƯỜI NHẬN
      </h3>

      <div className="space-y-2">
        {/* Recipient Name */}
        <div>
          <p className="font-medium text-gray-900">
            {order.userName || 'Người nhận'}
          </p>
        </div>

        {/* Address */}
        <div>
          <p className="text-sm text-gray-700">
            Địa chỉ: {order.shippingAddress || 'Chưa có địa chỉ giao hàng'}
          </p>
        </div>

        {/* Phone */}
        <div>
          <p className="text-sm text-gray-700">
            Số điện thoại: {order.userPhone || 'Chưa có số điện thoại'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
