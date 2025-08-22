import React from 'react';

interface OrderForm {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: string;
  notes?: string;
}

interface OrderFormProps {
  order: OrderForm;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
}

const OrderFormComponent: React.FC<OrderFormProps> = ({
  order,
  isEditing,
  onSubmit,
  onChange,
  onCancel,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4">
        {isEditing ? "Sửa Đơn hàng" : "Thêm Đơn hàng mới"}
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Người dùng <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="userId"
              placeholder="Nhập ID người dùng"
              value={order.userId}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên người dùng <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Nhập tên người dùng"
              value={order.userName}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email người dùng <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="userEmail"
            placeholder="user@example.com"
            value={order.userEmail}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái đơn hàng <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={order.status}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="pending">Chờ xử lý</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="shipping">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tổng tiền <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="totalAmount"
              placeholder="0"
              value={order.totalAmount}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
              min="0"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Tổng số tiền (VNĐ)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phương thức thanh toán
            </label>
            <select
              name="paymentMethod"
              value={order.paymentMethod}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="cash">Tiền mặt</option>
              <option value="card">Thẻ tín dụng</option>
              <option value="bank_transfer">Chuyển khoản</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái thanh toán
            </label>
            <select
              name="paymentStatus"
              value={order.paymentStatus}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="pending">Chờ thanh toán</option>
              <option value="paid">Đã thanh toán</option>
              <option value="failed">Thất bại</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ giao hàng <span className="text-red-500">*</span>
          </label>
          <textarea
            name="shippingAddress"
            placeholder="Nhập địa chỉ giao hàng đầy đủ"
            value={order.shippingAddress}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú
          </label>
          <textarea
            name="notes"
            placeholder="Ghi chú thêm cho đơn hàng"
            value={order.notes || ""}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            rows={2}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {isEditing ? "Cập nhật" : "Thêm đơn hàng"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OrderFormComponent;
