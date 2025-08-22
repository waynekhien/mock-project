import React from "react";
import {
  Users,
  BookOpen,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useUserManagement } from "../../hooks/admin/useUserManagement";
import { useOrderManagement } from "../../hooks/admin/useOrderManagement";
import { useBookManagement } from "../../hooks/admin/useBookManagement";
import {
  StatsCard,
  RecentOrders,
  TopBooks
} from "../../components/admin/dashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { users, loading: usersLoading } = useUserManagement();
  const { orders, loading: ordersLoading } = useOrderManagement();
  const { books, loading: booksLoading } = useBookManagement();

  // Calculate statistics with real data
  const calculateStats = () => {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    // Calculate orders today vs yesterday
    const ordersToday = orders.filter(order => 
      new Date(order.createdAt) >= new Date(today.toDateString())
    ).length;
    
    const ordersYesterday = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(yesterday.toDateString()) && 
             orderDate < new Date(today.toDateString());
    }).length;

    // Calculate revenue this month vs last month
    const revenueThisMonth = orders
      .filter(order => 
        new Date(order.createdAt) >= thisMonth && 
        order.status !== 'cancelled'
      )
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const revenueLastMonth = orders
      .filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= lastMonth && 
               orderDate < thisMonth && 
               order.status !== 'cancelled';
      })
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Calculate percentage changes
    const ordersChange = ordersYesterday === 0 ? 
      (ordersToday > 0 ? "+100%" : "0%") : 
      `${ordersToday >= ordersYesterday ? '+' : ''}${Math.round(((ordersToday - ordersYesterday) / ordersYesterday) * 100)}%`;

    const revenueChange = revenueLastMonth === 0 ? 
      (revenueThisMonth > 0 ? "+100%" : "0%") : 
      `${revenueThisMonth >= revenueLastMonth ? '+' : ''}${Math.round(((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100)}%`;

    return {
      ordersToday,
      ordersChange,
      revenueChange
    };
  };

  const { ordersToday, ordersChange, revenueChange } = ordersLoading ? 
    { ordersToday: 0, ordersChange: "0%", revenueChange: "0%" } : 
    calculateStats();

  // Calculate real stats from API data
  const stats = [
    {
      title: "Tổng người dùng",
      value: usersLoading ? "..." : users.length.toString(),
      change: `+${users.length}`, // Show total count as "change"
      trend: "up" as const,
      icon: Users
    },
    {
      title: "Tổng sách",
      value: booksLoading ? "..." : books.length.toString(),
      change: `+${books.length}`, // Show total count as "change"
      trend: "up" as const,
      icon: BookOpen
    },
    {
      title: "Đơn hàng hôm nay",
      value: ordersLoading ? "..." : ordersToday.toString(),
      change: ordersChange,
      trend: ordersChange.startsWith('+') ? "up" as const : "down" as const,
      icon: ShoppingCart
    },
    {
      title: "Doanh thu tháng",
      value: ordersLoading ? "..." : `₫${calculateTotalRevenue()}`,
      change: revenueChange,
      trend: revenueChange.startsWith('+') ? "up" as const : "down" as const,
      icon: DollarSign
    }
  ];

  // Calculate total revenue from orders
  function calculateTotalRevenue(): string {
    if (ordersLoading || orders.length === 0) return "0";
    
    const total = orders
      .filter(order => order.status !== 'cancelled')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    
    // Format to millions
    if (total >= 1000000) {
      return `${(total / 1000000).toFixed(1)}M`;
    } else if (total >= 1000) {
      return `${(total / 1000).toFixed(0)}K`;
    }
    return total.toString();
  }

  // Get recent orders (last 5)
  const recentOrders = ordersLoading ? [] : orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map(order => ({
      id: order.id,
      customer: order.userName,
      amount: order.totalAmount,
      status: order.status,
      time: getTimeAgo(order.createdAt)
    }));

  // Helper function to calculate time ago
  function getTimeAgo(dateString: string): string {
    const now = new Date();
    const orderDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
    }
  }

  // Calculate top books based on order items
  const topBooks = (() => {
    if (ordersLoading || orders.length === 0) return [];
    
    const bookStats: { [key: string]: { name: string; sales: number; revenue: number } } = {};
    
    orders.forEach(order => {
      if (order.items) {
        order.items.forEach(item => {
          const bookId = item.productId;
          if (!bookStats[bookId]) {
            bookStats[bookId] = {
              name: item.productName,
              sales: 0,
              revenue: 0
            };
          }
          bookStats[bookId].sales += item.quantity;
          bookStats[bookId].revenue += item.total;
        });
      }
    });

    return Object.values(bookStats)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4)
      .map(book => ({
        ...book,
        rating: 4.5 + Math.random() * 0.5 // Mock rating for now
      }));
  })();

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Chào mừng {user?.firstName || user?.lastName || 'Admin'} đến với bảng điều khiển
        </p>
      </div>

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
          {/* Top Books */}
          <TopBooks books={topBooks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;