import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  Filter,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  User,
  Calendar,
  Edit,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  RefreshCw
} from "lucide-react";
import { OrderTable } from "../../components/admin/orders";
import {
  PageHeader,
  ActionButton
} from "../../components/admin/shared";
import { useOrderManagement } from "../../hooks/admin";
import type { Order } from "../../types";

const OrdersAdmin: React.FC = () => {
  const {
    orders,
    loading,
    error,
    handleDelete,
  } = useOrderManagement();


  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipping: orders.filter(o => o.status === 'shipping').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0),
  };

  const handleRefresh = () => {
    // Refresh orders data
    window.location.reload();
  };



  const handleEditOrder = (id: string) => {
    // For now, just show alert - can implement status update modal later
    const order = orders.find(o => o.id === id);
    alert(`Tính năng chỉnh sửa đơn hàng ${order?.id || id} đang được phát triển`);
  };

  const handleViewDetail = (id: string) => {
    const order = orders.find(o => o.id === id);
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
      <PageHeader
        title="Quản lý đơn hàng"
        description={`Theo dõi và quản lý tất cả đơn hàng (${orders.length} đơn hàng)`}
        icon={ShoppingCart}
        iconColor="orange"
        actions={
          <>
            <ActionButton
              onClick={handleRefresh}
              icon={RefreshCw}
              variant="primary"
            >
              Làm mới
            </ActionButton>
          </>
        }
      />

      {/* Info Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          💡 Đơn hàng được tạo bởi khách hàng từ website, admin chỉ quản lý và cập nhật trạng thái
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-gray-600 text-xs">Tổng đơn</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-gray-600 text-xs">Chờ xử lý</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.confirmed}</p>
              <p className="text-gray-600 text-xs">Đã xác nhận</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Truck className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.shipping}</p>
              <p className="text-gray-600 text-xs">Đang giao</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{stats.delivered}</p>
              <p className="text-gray-600 text-xs">Hoàn thành</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">
                {stats.totalRevenue.toLocaleString()}đ
              </p>
              <p className="text-gray-600 text-xs">Doanh thu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="shipping">Đang giao</option>
              <option value="delivered">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Payment Filter */}
          <div className="relative">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Tất cả thanh toán</option>
              <option value="pending">Chưa thanh toán</option>
              <option value="paid">Đã thanh toán</option>
              <option value="failed">Thanh toán thất bại</option>
            </select>
            <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>



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
        orders={filteredOrders}
        onEdit={handleEditOrder}
        onDelete={handleDelete}
        onDetail={handleViewDetail}
      />
    </div>
  );
};

// Order Detail Modal Component
interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onEdit: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose, onEdit }) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'yellow', icon: Clock, text: 'Chờ xử lý' },
      confirmed: { color: 'blue', icon: Package, text: 'Đã xác nhận' },
      shipping: { color: 'orange', icon: Truck, text: 'Đang giao' },
      delivered: { color: 'green', icon: CheckCircle, text: 'Hoàn thành' },
      cancelled: { color: 'red', icon: XCircle, text: 'Đã hủy' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 bg-${config.color}-100 text-${config.color}-800 rounded-full text-sm font-medium`}>
        <Icon className="w-4 h-4" />
        {config.text}
      </span>
    );
  };

  const getPaymentBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'yellow', text: 'Chưa thanh toán' },
      paid: { color: 'green', text: 'Đã thanh toán' },
      failed: { color: 'red', text: 'Thất bại' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-3 py-1 bg-${config.color}-100 text-${config.color}-800 rounded-full text-sm font-medium`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Chi tiết đơn hàng</h2>
              <p className="text-gray-600 text-sm">Mã đơn hàng: {order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Status and Payment */}
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Trạng thái đơn hàng</p>
              {getStatusBadge(order.status)}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Trạng thái thanh toán</p>
              {getPaymentBadge(order.paymentStatus)}
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Thông tin khách hàng</h3>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Tên khách hàng</p>
                  <p className="font-medium">{order.userName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{order.userEmail}</p>
                </div>
              </div>

              {order.userPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                    <p className="font-medium">{order.userPhone}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Thông tin đơn hàng</h3>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Ngày đặt hàng</p>
                  <p className="font-medium">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'Không có'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Tổng tiền</p>
                  <p className="font-medium text-lg text-blue-600">
                    {order.totalAmount?.toLocaleString()}đ
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phương thức thanh toán</p>
                  <p className="font-medium">
                    {order.paymentMethod === 'cash' ? 'Tiền mặt' :
                     order.paymentMethod === 'card' ? 'Thẻ tín dụng' :
                     order.paymentMethod === 'bank_transfer' ? 'Chuyển khoản' :
                     order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Địa chỉ giao hàng</h3>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <p className="text-gray-700">{order.shippingAddress}</p>
              </div>
            </div>
          )}

          {/* Order Items */}
          {order.items && order.items.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Sản phẩm đã đặt</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Sản phẩm</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Số lượng</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Đơn giá</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {item.productImage && (
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{item.productName}</p>
                              <p className="text-sm text-gray-600">ID: {item.productId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-gray-900">{item.price?.toLocaleString()}đ</td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {item.total?.toLocaleString()}đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersAdmin;
