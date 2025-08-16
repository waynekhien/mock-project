import React from 'react';
import { AdminTable } from '../shared';
import type { Order } from '../../../types';

interface OrderTableProps {
  orders: Order[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDetail: (id: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "userName", label: "Tên khách hàng" },
    { key: "userEmail", label: "Email" },
    { key: "totalAmount", label: "Tổng tiền" },
    { key: "status", label: "Trạng thái" },
    { key: "paymentStatus", label: "Thanh toán" },
    { key: "createdAt", label: "Ngày tạo" },
  ];

  // Format data for AdminTable
  const formattedOrders = orders.map(order => {
    const getStatusBadge = (status: string) => {
      const statusMap = {
        pending: 'Chờ xử lý',
        confirmed: 'Đã xác nhận',
        shipping: 'Đang giao',
        delivered: 'Đã giao',
        cancelled: 'Đã hủy'
      };
      return statusMap[status as keyof typeof statusMap] || status;
    };

    const getPaymentStatusBadge = (status: string) => {
      const statusMap = {
        pending: 'Chờ thanh toán',
        paid: 'Đã thanh toán',
        failed: 'Thất bại'
      };
      return statusMap[status as keyof typeof statusMap] || status;
    };

    return {
      id: order.id,
      userName: order.userName,
      userEmail: order.userEmail,
      totalAmount: order.totalAmount ? `${order.totalAmount.toLocaleString()}đ` : 'N/A',
      status: getStatusBadge(order.status),
      paymentStatus: getPaymentStatusBadge(order.paymentStatus),
      createdAt: order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'N/A',
    };
  });

  if (orders.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
        <p className="text-gray-500">Không có đơn hàng nào để hiển thị</p>
      </div>
    );
  }

  return (
    <AdminTable
      data={formattedOrders}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
      onDetail={onDetail}
    />
  );
};

export default OrderTable;
