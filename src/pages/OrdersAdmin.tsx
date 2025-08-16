import React, { useState, useEffect } from "react";
import AdminTable from "../components/AdminTable";
import { fetchOrders, createOrder, updateOrder, deleteOrder } from "../api";
import { Order } from "../types";

const OrdersAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [currentOrder, setCurrentOrder] = useState<
    Omit<Order, "id" | "createdAt"> & { id?: string }
  >({
    userId: "",
    total: 0,
    status: "pending",
    productIds: [], 
  });

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentOrder.id) {
        const updatedOrder = await updateOrder(currentOrder.id, currentOrder);
        setOrders(
          orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
        );
      } else {
  
        const newOrder = await createOrder(
          currentOrder as Omit<Order, "id" | "createdAt">
        );
        setOrders([...orders, newOrder]);
      }
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (id: string) => {
    const orderToEdit = orders.find((o) => o.id === id);
    if (orderToEdit) {
      setCurrentOrder(orderToEdit);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      try {
        await deleteOrder(id);
        setOrders(orders.filter((o) => o.id !== id));
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const resetForm = () => {

    setCurrentOrder({
      userId: "",
      total: 0,
      status: "pending",
      productIds: [],
    });
    setIsEditing(false);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "userId", label: "Mã người dùng" },
    { key: "total", label: "Tổng tiền" },
    { key: "status", label: "Trạng thái" },
    { key: "createdAt", label: "Ngày tạo" },
  ];

  if (loading) return <div className="text-center p-4">Đang tải...</div>;
  if (error)
    return <div className="text-center text-red-500 p-4">Lỗi: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Đơn hàng</h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4">
          {isEditing ? "Sửa Đơn hàng" : "Thêm Đơn hàng mới"}
        </h3>
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <input
            type="text"
            name="userId"
            placeholder="Mã người dùng"
            value={currentOrder.userId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="number"
            name="total"
            placeholder="Tổng tiền"
            value={currentOrder.total}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <select
            name="status"
            value={currentOrder.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {isEditing ? "Cập nhật" : "Thêm đơn hàng"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-2 bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              Hủy
            </button>
          )}
        </form>
      </div>

      <AdminTable
        data={orders}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={(id) => alert(`Xem chi tiết đơn hàng: ${id}`)}
      />
    </div>
  );
};

export default OrdersAdmin;
