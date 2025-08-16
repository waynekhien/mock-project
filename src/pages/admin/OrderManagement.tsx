import React from "react";
import { OrderForm, OrderTable } from "../../components/admin/orders";
import { useOrderManagement } from "../../hooks/admin";

const OrdersAdmin: React.FC = () => {
  const {
    orders,
    loading,
    error,
    isEditing,
    currentOrder,
    handleInputChange,
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
    resetForm,
  } = useOrderManagement();

  if (loading) {
    return <div className="text-center p-4">Đang tải...</div>;
  }
  
  if (error) {
    return <div className="text-center text-red-500 p-4">Lỗi: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Đơn hàng</h2>

      <OrderForm
        order={currentOrder}
        isEditing={isEditing}
        onSubmit={handleAddOrUpdate}
        onChange={handleInputChange}
        onCancel={resetForm}
      />

      <OrderTable
        orders={orders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={(id) => alert(`Xem chi tiết đơn hàng: ${id}`)}
      />
    </div>
  );
};

export default OrdersAdmin;
