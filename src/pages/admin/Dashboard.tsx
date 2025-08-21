import React, { useState } from "react";
import {
  Users,
  BookOpen,
  ShoppingCart,
  DollarSign,
  BarChart3
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import {
  StatsCard,
  WelcomeSection,
  RecentOrders,
  QuickActions,
  TopBooks
} from "../../components/admin/dashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);



  // Mock data - trong thực tế sẽ lấy từ API
  const stats = [
    {
      title: "Tổng người dùng",
      value: "1,234",
      change: "+12%",
      trend: "up" as const,
      icon: Users
    },
    {
      title: "Tổng sách",
      value: "856",
      change: "+5%",
      trend: "up" as const,
      icon: BookOpen
    },
    {
      title: "Đơn hàng hôm nay",
      value: "342",
      change: "+8%",
      trend: "up" as const,
      icon: ShoppingCart
    },
    {
      title: "Doanh thu tháng",
      value: "₫45.2M",
      change: "+18%",
      trend: "up" as const,
      icon: DollarSign
    }
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Nguyễn Văn A", amount: 250000, status: "pending", time: "10 phút trước" },
    { id: "ORD-002", customer: "Trần Thị B", amount: 180000, status: "delivered", time: "25 phút trước" },
    { id: "ORD-003", customer: "Lê Văn C", amount: 320000, status: "shipping", time: "1 giờ trước" },
    { id: "ORD-004", customer: "Phạm Thị D", amount: 150000, status: "confirmed", time: "2 giờ trước" },
    { id: "ORD-005", customer: "Hoàng Minh E", amount: 420000, status: "pending", time: "3 giờ trước" },
  ];

  const topBooks = [
    { name: "Đắc Nhân Tâm", sales: 156, revenue: 2340000, rating: 4.8 },
    { name: "Sapiens", sales: 134, revenue: 2010000, rating: 4.7 },
    { name: "Atomic Habits", sales: 98, revenue: 1470000, rating: 4.9 },
    { name: "Rich Dad Poor Dad", sales: 87, revenue: 1305000, rating: 4.6 },
  ];

  const quickActions = [
    {
      title: "Thêm sách mới",
      icon: BookOpen,
      href: "/admin/products",
      description: "Thêm sách vào kho",
      color: "green" as const
    },
    {
      title: "Xem đơn hàng",
      icon: ShoppingCart,
      href: "/admin/orders",
      description: "Quản lý đơn hàng",
      color: "orange" as const
    },
    {
      title: "Quản lý user",
      icon: Users,
      href: "/admin/users",
      description: "Xem người dùng",
      color: "purple" as const
    },
    {
      title: "Thống kê chi tiết",
      icon: BarChart3,
      href: "/admin/analytics",
      description: "Xem báo cáo",
      color: "blue" as const
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };



  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <WelcomeSection
        userName={user?.firstName || user?.lastName}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={{
              direction: stat.trend,
              value: stat.change
            }}
            color={
              stat.title.includes('người dùng') ? 'blue' :
              stat.title.includes('sách') ? 'green' :
              stat.title.includes('đơn hàng') ? 'orange' :
              'purple'
            }
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="xl:col-span-2">
          <RecentOrders
            orders={recentOrders}
            onViewAll={() => window.location.href = '/admin/orders'}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions actions={quickActions} />

          {/* Top Books */}
          <TopBooks books={topBooks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;