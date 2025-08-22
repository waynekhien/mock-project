import React, { useState } from "react";
import { OrderTable, OrderDetailModal, OrderStatusUpdateModal } from "../components/orders";
import { useOrderManagement } from "../hooks";
import { ordersApi } from "../../services/api";
import type { Order } from "../../types";

const OrdersAdmin: React.FC = () => {
  const {
    orders,
    loading,
    error,
    handleDelete: originalHandleDelete,
  } = useOrderManagement();

  const [localOrders, setLocalOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  // Sync orders with local state
  React.useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleDelete = async (id: string) => {
    try {
      await originalHandleDelete(id);
      // Update local state to remove deleted order
      setLocalOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEditOrder = (id: string) => {
    const order = localOrders.find(o => o.id === id);
    if (order) {
      setSelectedOrder(order);
      setShowStatusModal(true);
    }
  };

  const handleStatusUpdate = async (newStatus: Order['status']) => {
    if (!selectedOrder) return;
    
    setStatusLoading(true);
    try {
      await ordersApi.update(selectedOrder.id, { 
        ...selectedOrder, 
        status: newStatus 
      });
      
      // Update local state instead of reloading page
      const updatedOrders = localOrders.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: newStatus }
          : order
      );
      setLocalOrders(updatedOrders);
      
      // Update selected order for modal
      setSelectedOrder({ ...selectedOrder, status: newStatus });
      
      setShowStatusModal(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleViewDetail = (id: string) => {
    const order = localOrders.find(o => o.id === id);
    if (order) {
      setSelectedOrder(order);
      setShowOrderDetail(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 font-medium">Có lỗi xảy ra</div>
        <div className="text-red-500 text-sm mt-1">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        <p className="text-gray-600 mt-1">Theo dõi và quản lý tất cả đơn hàng ({localOrders.length} đơn hàng)</p>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedOrder && (
        <OrderStatusUpdateModal
          order={selectedOrder}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedOrder(null);
          }}
          onUpdateStatus={handleStatusUpdate}
          loading={statusLoading}
        />
      )}

      {/* Order Detail Modal */}
      {showOrderDetail && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setShowOrderDetail(false)}
          onEdit={() => {
            setShowOrderDetail(false);
            handleEditOrder(selectedOrder.id);
          }}
        />
      )}

      {/* Orders Table */}
      <OrderTable
        orders={localOrders}
        onEdit={handleEditOrder}
        onDelete={handleDelete}
        onDetail={handleViewDetail}
      />
    </div>
  );
};

export default OrdersAdmin;
