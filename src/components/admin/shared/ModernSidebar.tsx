import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
  color: string;
}

interface ModernSidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({
  isCollapsed,
  isMobileOpen,
  onToggle,
  onMobileClose
}) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { 
      name: "Dashboard", 
      path: "/admin/dashboard", 
      icon: <LayoutDashboard className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600"
    },
    { 
      name: "Quản lý sách", 
      path: "/admin/products", 
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-emerald-500 to-emerald-600"
    },
    { 
      name: "Quản lý người dùng", 
      path: "/admin/users", 
      icon: <Users className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600"
    },
    { 
      name: "Quản lý đơn hàng", 
      path: "/admin/orders", 
      icon: <ShoppingCart className="w-5 h-5" />,
      badge: 3,
      color: "from-orange-500 to-orange-600"
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-slate-800
        shadow-lg z-50 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-72'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className={`p-6 border-b border-slate-700 ${isCollapsed ? 'px-4' : ''}`}>
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">BookStore</h1>
                    <p className="text-xs text-slate-400">Admin Dashboard</p>
                  </div>
                </div>
              )}

              {isCollapsed && (
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              )}

              {/* Collapse Toggle - Hidden on mobile */}
              <button
                onClick={onToggle}
                className="hidden lg:flex items-center justify-center w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-slate-300" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 relative z-10">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onMobileClose}
                    className={`
                      group relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                      ${isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full"></div>
                    )}

                    {/* Icon */}
                    <div className="relative flex items-center justify-center w-10 h-10">
                      {item.icon}
                      
                      {/* Badge */}
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <span className="font-medium truncate block">{item.name}</span>
                        {isActive && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-slate-400">Đang xem</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hover tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.name}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default ModernSidebar;
