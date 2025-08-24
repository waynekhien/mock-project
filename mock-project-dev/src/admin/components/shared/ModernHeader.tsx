import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  ChevronRight,
  Home,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface ModernHeaderProps {
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const ModernHeader: React.FC<ModernHeaderProps> = ({
  onToggleSidebar,
  onToggleMobileSidebar,
  isSidebarCollapsed
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Breadcrumb mapping
  const breadcrumbMap: Record<string, string> = {
    '/admin/dashboard': 'Dashboard',
    '/admin/products': 'Quản lý sách',
    '/admin/users': 'Quản lý người dùng',
    '/admin/orders': 'Quản lý đơn hàng',
  };

  const currentPageName = breadcrumbMap[location.pathname] || 'Admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <Home className="w-4 h-4 text-slate-400" />
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="font-medium text-slate-900">{currentPageName}</span>
            </div>

            {/* Desktop Sidebar Toggle */}
            <button
              onClick={onToggleSidebar}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors"
              title={isSidebarCollapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
            >
              {isSidebarCollapsed ? (
                <Maximize2 className="w-4 h-4 text-slate-600" />
              ) : (
                <Minimize2 className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-slate-800">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}` 
                      : user?.firstName || user?.lastName || 'Admin'}
                  </p>
                  <p className="text-xs text-slate-500">Quản trị viên</p>
                </div>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50">
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 rounded-xl transition-colors">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700">Hồ sơ cá nhân</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 rounded-xl transition-colors">
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700">Cài đặt</span>
                    </button>
                    <hr className="my-2 border-slate-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default ModernHeader;
