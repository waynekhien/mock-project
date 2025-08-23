import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/layout';
import { AccountInfo } from '../components/user/profile';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { ordersApi } from '../services/api';
import { User, Bell, Search, Package } from 'lucide-react';
import OrderTabs from '../components/user/profile/OrderTabs';
import OrderSearch from '../components/user/profile/OrderSearch';
import OrderList from '../components/user/profile/OrderList';
import OrderDetailView from '../components/user/orders/OrderDetailView';
import type { Order } from '../types';

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 max-[389px]:p-4 max-[389px]:rounded-none max-[389px]:shadow-none">
      {/* Profile Header - Hidden on mobile */}
      <div className="text-center mb-6 max-[389px]:hidden">
        <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden">
          <img
            src="https://salt.tikicdn.com/desktop/img/avatar.png"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-gray-900">Tài khoản của</p>
          <p className="font-semibold text-gray-900">
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.firstName || user?.lastName || 'Người dùng'
            }
          </p>
        </div>
      </div>

      {/* Mobile Profile Header */}
      <div className="hidden max-[389px]:flex max-[389px]:items-center max-[389px]:gap-3 max-[389px]:mb-4 max-[389px]:pb-4 max-[389px]:border-b">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://salt.tikicdn.com/desktop/img/avatar.png"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.firstName || user?.lastName || 'Người dùng'
            }
          </p>
          <p className="text-xs text-gray-600">Tài khoản của tôi</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 max-[389px]:space-y-1">
        <button
          onClick={() => onTabChange('account')}
          className={`w-full flex items-center gap-3 px-3 py-2 max-[389px]:px-2 max-[389px]:py-3 rounded transition-colors ${
            activeTab === 'account'
              ? 'text-gray-700 bg-blue-50 border-l-4 border-blue-500 rounded-r max-[389px]:bg-blue-100 max-[389px]:border-l-2'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <User className="w-5 h-5 max-[389px]:w-4 max-[389px]:h-4" />
          <span className="max-[389px]:text-sm">Thông tin tài khoản</span>
        </button>
        <button
          onClick={() => onTabChange('notifications')}
          className={`w-full flex items-center gap-3 px-3 py-2 max-[389px]:px-2 max-[389px]:py-3 rounded transition-colors ${
            activeTab === 'notifications'
              ? 'text-gray-700 bg-blue-50 border-l-4 border-blue-500 rounded-r max-[389px]:bg-blue-100 max-[389px]:border-l-2'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Bell className="w-5 h-5 max-[389px]:w-4 max-[389px]:h-4" />
          <span className="max-[389px]:text-sm">Thông báo của tôi</span>
        </button>
        <button
          onClick={() => onTabChange('orders')}
          className={`w-full flex items-center gap-3 px-3 py-2 max-[389px]:px-2 max-[389px]:py-3 rounded transition-colors ${
            activeTab === 'orders'
              ? 'text-gray-700 bg-blue-50 border-l-4 border-blue-500 rounded-r max-[389px]:bg-blue-100 max-[389px]:border-l-2'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Package className="w-5 h-5 max-[389px]:w-4 max-[389px]:h-4" />
          <span className="max-[389px]:text-sm">Quản lý đơn hàng</span>
        </button>
      </nav>
    </div>
  );
};

// Order Management Component for Profile
const ProfileOrderManagement: React.FC = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedFilters, setAdvancedFilters] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Helper function to get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ thanh toán';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'shipping':
        return 'Đang vận chuyển';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Đã huỷ';
      default:
        return 'Không xác định';
    }
  };

  // Fetch orders
  React.useEffect(() => {
    if (!user?.id) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await ordersApi.getAll();
        const userOrders = Array.isArray(response)
          ? response.filter(order => order.userId === user.id.toString())
          : [];

        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        showError('Không thể tải danh sách đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id, showError]);

  // Filter orders based on tab, search and advanced filters
  React.useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter(order => {
        switch (activeTab) {
          case 'pending':
            return order.status === 'pending';
          case 'processing':
            return order.status === 'confirmed'; // Map confirmed to processing tab
          case 'shipping':
            return order.status === 'shipping';
          case 'delivered':
            return order.status === 'delivered';
          case 'cancelled':
            return order.status === 'cancelled';
          default:
            return true;
        }
      });
    }

    // Apply advanced filters if available
    if (advancedFilters) {
      // Filter by status
      if (advancedFilters.status) {
        filtered = filtered.filter(order => order.status === advancedFilters.status);
      }

      // Filter by date range
      if (advancedFilters.dateFrom) {
        const fromDate = new Date(advancedFilters.dateFrom);
        filtered = filtered.filter(order => new Date(order.createdAt) >= fromDate);
      }
      if (advancedFilters.dateTo) {
        const toDate = new Date(advancedFilters.dateTo);
        toDate.setHours(23, 59, 59, 999); // End of day
        filtered = filtered.filter(order => new Date(order.createdAt) <= toDate);
      }

      // Filter by amount range
      if (advancedFilters.minAmount !== undefined) {
        filtered = filtered.filter(order => order.totalAmount >= advancedFilters.minAmount);
      }
      if (advancedFilters.maxAmount !== undefined) {
        filtered = filtered.filter(order => order.totalAmount <= advancedFilters.maxAmount);
      }

      // Filter by query from advanced search
      if (advancedFilters.query && advancedFilters.query.trim()) {
        const query = advancedFilters.query.toLowerCase();
        filtered = filtered.filter(order => {
          return performTextSearch(order, query);
        });
      }
    } else if (searchQuery.trim()) {
      // Regular search when no advanced filters
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => {
        return performTextSearch(order, query);
      });
    }

    setFilteredOrders(filtered);
  }, [orders, activeTab, searchQuery, advancedFilters]);

  // Helper function for text search
  const performTextSearch = (order: Order, query: string): boolean => {
    try {
      // Safety check
      if (!order || typeof order !== 'object') {
        return false;
      }

      // Search by Order ID - Convert to string safely
      const orderId = order.id ? String(order.id) : '';
      if (orderId && orderId.toLowerCase().includes(query)) return true;

      // Search by Product Name
      if (order.items && Array.isArray(order.items)) {
        try {
          const hasMatchingProduct = order.items.some(item => {
            if (!item || typeof item !== 'object') return false;
            const productName = item.productName ? String(item.productName) : '';
            return productName.toLowerCase().includes(query);
          });
          if (hasMatchingProduct) return true;
        } catch (itemError) {
          // Silently handle item search errors
        }
      }

      // Search by User Name
      const userName = order.userName ? String(order.userName) : '';
      if (userName && userName.toLowerCase().includes(query)) return true;

      // Search by User Email
      const userEmail = order.userEmail ? String(order.userEmail) : '';
      if (userEmail && userEmail.toLowerCase().includes(query)) return true;

      // Search by Payment Method
      const paymentMethod = order.paymentMethodDisplay ? String(order.paymentMethodDisplay) : '';
      if (paymentMethod && paymentMethod.toLowerCase().includes(query)) return true;

      // Search by Delivery Method
      const deliveryMethod = order.deliveryMethod ? String(order.deliveryMethod) : '';
      if (deliveryMethod && deliveryMethod.toLowerCase().includes(query)) return true;

      // Search by Shipping Address
      const shippingAddress = order.shippingAddress ? String(order.shippingAddress) : '';
      if (shippingAddress && shippingAddress.toLowerCase().includes(query)) return true;

      // Search by Status
      if (order.status) {
        try {
          const statusText = getStatusText(String(order.status)).toLowerCase();
          if (statusText.includes(query)) return true;
        } catch (statusError) {
          // Silently handle status text errors
        }
      }

      // Search by Total Amount
      const totalAmount = order.totalAmount ? String(order.totalAmount) : '';
      if (totalAmount && totalAmount.includes(query)) return true;

      // Search by Date
      if (order.createdAt) {
        try {
          const orderDate = new Date(order.createdAt).toLocaleDateString('vi-VN');
          if (orderDate.includes(query)) return true;
        } catch (dateError) {
          // Silently handle date format errors
        }
      }

      return false;
    } catch (error) {
      // Silently handle search errors
      return false;
    }
  };

  // Calculate order counts for tabs
  const orderCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'confirmed').length, // Map confirmed to processing tab
    shipping: orders.filter(o => o.status === 'shipping').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setAdvancedFilters(null); // Clear advanced filters when doing regular search
  };

  const handleAdvancedSearch = (filters: any) => {
    setAdvancedFilters(filters);
    setSearchQuery(''); // Clear regular search when using advanced search
  };

  const handleViewDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
    }
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  const handleReorder = async (orderId: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      showSuccess('Đã thêm tất cả sản phẩm vào giỏ hàng');
      window.open('/cart', '_blank');
    } catch (error) {
      console.error('Error reordering:', error);
      showError('Không thể mua lại đơn hàng này');
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn huỷ đơn hàng này?')) {
      return;
    }

    try {
      await ordersApi.update(orderId, { status: 'cancelled' });

      setOrders(prev => prev.map(order =>
        order.id === orderId
          ? { ...order, status: 'cancelled' as const }
          : order
      ));

      showSuccess('Đã huỷ đơn hàng thành công');
    } catch (error) {
      console.error('Error cancelling order:', error);
      showError('Không thể huỷ đơn hàng này');
    }
  };

  // If an order is selected, show order detail view
  if (selectedOrder) {
    return (
      <OrderDetailView
        order={selectedOrder}
        onBack={handleBackToOrders}
      />
    );
  }

  // Otherwise show order management
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Quản lý đơn hàng</h2>
        <p className="text-gray-600 mt-1">Theo dõi và quản lý tất cả đơn hàng của bạn</p>
      </div>

      <div className="p-6 space-y-6">
        <OrderTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          orderCounts={orderCounts}
        />

        <OrderSearch
          onSearch={handleSearch}
          onAdvancedSearch={handleAdvancedSearch}
        />

        {/* Search Results Summary */}
        {(searchQuery.trim() || advancedFilters) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  Tìm thấy {filteredOrders.length} đơn hàng
                  {searchQuery.trim() && ` cho "${searchQuery}"`}
                  {advancedFilters && advancedFilters.query && ` cho "${advancedFilters.query}"`}
                </span>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setAdvancedFilters(null);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Xóa tìm kiếm
              </button>
            </div>

            {/* Active Filters Display */}
            {advancedFilters && (
              <div className="mt-3 flex flex-wrap gap-2">
                {advancedFilters.status && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Trạng thái: {getStatusText(advancedFilters.status)}
                  </span>
                )}
                {advancedFilters.dateFrom && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Từ: {new Date(advancedFilters.dateFrom).toLocaleDateString('vi-VN')}
                  </span>
                )}
                {advancedFilters.dateTo && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Đến: {new Date(advancedFilters.dateTo).toLocaleDateString('vi-VN')}
                  </span>
                )}
                {advancedFilters.minAmount !== undefined && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Từ: {advancedFilters.minAmount.toLocaleString('vi-VN')} ₫
                  </span>
                )}
                {advancedFilters.maxAmount !== undefined && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Đến: {advancedFilters.maxAmount.toLocaleString('vi-VN')} ₫
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        <OrderList
          orders={filteredOrders}
          loading={loading}
          onViewDetails={handleViewDetails}
          onReorder={handleReorder}
          onCancelOrder={handleCancelOrder}
        />
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('account');

  // Auto-switch tab based on URL
  useEffect(() => {
    if (location.pathname === '/orders') {
      setActiveTab('orders');
    } else if (location.pathname === '/notifications') {
      setActiveTab('notifications');
    } else {
      setActiveTab('account');
    }
  }, [location.pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <ProfileOrderManagement />;
      case 'notifications':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6 max-[389px]:p-4 max-[389px]:rounded-none max-[389px]:shadow-none max-[389px]:border-none">
            <h2 className="text-xl font-bold text-gray-900 mb-4 max-[389px]:text-lg">Thông báo của tôi</h2>
            <p className="text-gray-600 max-[389px]:text-sm">Chưa có thông báo nào.</p>
          </div>
        );
      default:
        return <AccountInfo />;
    }
  };

  const getBreadcrumbText = () => {
    switch (activeTab) {
      case 'orders':
        return 'Quản lý đơn hàng';
      case 'notifications':
        return 'Thông báo của tôi';
      case 'account':
      default:
        return 'Thông tin tài khoản';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-[389px]:bg-white">
      <Header />

      <main className="flex-1 py-8 max-[389px]:py-2">
        <div className="max-w-6xl mx-auto px-4 max-[389px]:px-2">
          {/* Breadcrumb - Hidden on mobile */}
          <nav className="mb-6 max-[389px]:hidden">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-600">Trang chủ</a>
              </li>
              <li>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-800">{getBreadcrumbText()}</span>
              </li>
            </ol>
          </nav>

          {/* Mobile Header */}
          <div className="hidden max-[389px]:block max-[389px]:mb-4">
            <h1 className="text-lg font-bold text-gray-900">{getBreadcrumbText()}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-[389px]:gap-0 max-[389px]:grid-cols-1">
            {/* Sidebar - Mobile bottom tabs / Desktop sidebar */}
            <div className="lg:col-span-1 max-[389px]:order-2 max-[389px]:fixed max-[389px]:bottom-0 max-[389px]:left-0 max-[389px]:right-0 max-[389px]:z-50 max-[389px]:bg-white max-[389px]:border-t max-[389px]:shadow-lg min-[390px]:relative">
              <div className="max-[389px]:hidden">
                <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
              </div>
              
              {/* Mobile Tab Bar */}
              <div className="hidden max-[389px]:flex max-[389px]:justify-around max-[389px]:py-2">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex flex-col items-center px-3 py-1 ${
                    activeTab === 'account' ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <User className="w-5 h-5 mb-1" />
                  <span className="text-xs">Tài khoản</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex flex-col items-center px-3 py-1 ${
                    activeTab === 'notifications' ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Bell className="w-5 h-5 mb-1" />
                  <span className="text-xs">Thông báo</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex flex-col items-center px-3 py-1 ${
                    activeTab === 'orders' ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Package className="w-5 h-5 mb-1" />
                  <span className="text-xs">Đơn hàng</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 max-[389px]:order-1 max-[389px]:pb-16">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Profile;
