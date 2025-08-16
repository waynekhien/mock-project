import { useState, useEffect } from 'react';
import { fetchOrders, createOrder, updateOrder, deleteOrder } from '../../services/api';
import type { Order } from '../../types';

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

export const useOrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<OrderForm>({
    userId: "",
    userName: "",
    userEmail: "",
    totalAmount: 0,
    status: "pending",
    paymentMethod: "cash",
    paymentStatus: "pending",
    shippingAddress: "",
  });

  // Fetch orders on component mount
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentOrder.id) {
        // Update order
        const updatedOrder = await updateOrder(
          currentOrder.id,
          currentOrder
        );
        setOrders(
          orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
        );
      } else {
        // Add new order
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
      setCurrentOrder({
        id: orderToEdit.id,
        userId: orderToEdit.userId,
        userName: orderToEdit.userName,
        userEmail: orderToEdit.userEmail,
        totalAmount: orderToEdit.totalAmount,
        status: orderToEdit.status,
        paymentMethod: orderToEdit.paymentMethod,
        paymentStatus: orderToEdit.paymentStatus,
        shippingAddress: orderToEdit.shippingAddress,
        notes: orderToEdit.notes,
      });
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
      userName: "",
      userEmail: "",
      totalAmount: 0,
      status: "pending",
      paymentMethod: "cash",
      paymentStatus: "pending",
      shippingAddress: "",
    });
    setIsEditing(false);
  };

  return {
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
  };
};
