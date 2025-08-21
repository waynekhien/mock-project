import React from 'react';
import type { Order } from '../../types';

interface PaymentMethodProps {
  order: Order;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ order }) => {
  const getPaymentInfo = () => {
    const getPaymentMethodText = (method: string) => {
      switch (method) {
        case 'cash':
          return 'Thanh toán tiền mặt khi nhận hàng';
        case 'card':
          return 'Thanh toán bằng thẻ';
        case 'bank_transfer':
          return 'Chuyển khoản ngân hàng';
        default:
          return 'Phương thức thanh toán khác';
      }
    };

    const getPaymentStatusText = (status: string) => {
      switch (status) {
        case 'paid':
          return 'Đã thanh toán';
        case 'pending':
          return 'Chờ thanh toán';
        case 'failed':
          return 'Thanh toán thất bại';
        default:
          return 'Chưa xác định';
      }
    };

    return {
      method: order.paymentMethodDisplay || getPaymentMethodText(order.paymentMethod),
      status: getPaymentStatusText(order.paymentStatus),
      isPaid: order.paymentStatus === 'paid'
    };
  };

  const paymentInfo = getPaymentInfo();

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase">
        HÌNH THỨC THANH TOÁN
      </h3>

      <div className="space-y-2">
        {/* Payment Method */}
        <div>
          <p className="text-sm text-gray-700">
            {paymentInfo.method}
          </p>
        </div>

        {/* Payment Status */}
        <div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            paymentInfo.isPaid
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {paymentInfo.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
