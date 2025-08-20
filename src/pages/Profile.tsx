import React from 'react';
import { Header } from '../components/layout';
import { AccountInfo } from '../components/profile';
import { useAuth } from '../contexts/AuthContext';
import { User, Bell, ShoppingBag } from 'lucide-react';

const ProfileSidebar: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-8 h-8 text-blue-500" />
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

      {/* Navigation Menu */}
      <nav className="space-y-2">
        <a
          href="/profile"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 bg-blue-50 border-l-4 border-blue-500 rounded-r"
        >
          <User className="w-5 h-5" />
          <span>Thông tin tài khoản</span>
        </a>
        <a
          href="/notifications"
          className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
        >
          <Bell className="w-5 h-5" />
          <span>Thông báo của tôi</span>
        </a>
        <a
          href="/orders"
          className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Quản lý đơn hàng</span>
        </a>
      </nav>
    </div>
  );
};

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-600">Trang chủ</a>
              </li>
              <li>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-800">Thông tin tài khoản</span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <AccountInfo />
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Profile;
