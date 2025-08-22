import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  User,
  ShoppingCart,

  ChevronDown,
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { LoginModal } from "../ui/LoginModal";
import { Search } from "../user/search";

const categories = [
  "điện gia dụng",
  "xe cộ",
  "mẹ & bé",
  "khỏe đẹp",
  "nhà cửa",
  "sách",
  "thể thao",
  "harry potter",
  "lịch treo tường 2024",
  "nguyên nhật ánh",
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  // Removed searchQuery state - using Search component instead
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { totalItems } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAccountDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Removed handleSearch - using Search component instead

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      setShowAccountDropdown(!showAccountDropdown);
    } else {
      // Show login modal instead of navigating to login page
      setShowLoginModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowAccountDropdown(false);
    navigate("/");
  };

  const handleAccountInfo = () => {
    setShowAccountDropdown(false);
    navigate("/account");
  };

  const handleMyOrders = () => {
    setShowAccountDropdown(false);
    navigate("/orders");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };
  return (
    <>
      {/* Top notice */}
      <div className="w-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm py-2 text-center flex items-center justify-center">
        <span className="mr-2">Freeship đơn từ 45k, giảm nhiều hơn cùng</span>
        <img 
          src="https://salt.tikicdn.com/ts/upload/a7/18/8c/910f3a83b017b7ced73e80c7ed4154b0.png" 
          alt="Freeship Xtra" 
          className="h-4 inline-block"
        />
      </div>

      {/* Header */}
      <header className="border-b border-slate-200 px-3 pt-3 md:pt-4 w-full">
        <div className="flex flex-col gap-2 md:gap-3">
          <div className="flex items-center gap-3 md:gap-5 w-full">
            {/* Logo */}
            <a
              href="#"
              className="flex flex-col items-center gap-1 shrink-0"
              aria-label="Tốt & Nhanh"
            >
              <img
                src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
                alt="TIKI logo"
                className="h-9 w-auto object-contain"
              />
              <span className="text-sm font-bold text-sky-700 sm:text-base">
                Tốt & Nhanh
              </span>
            </a>

            {/* Search Component */}
            <div className="flex-1">
              <Search
                placeholder="100% hàng thật"
                className="w-full"
                maxResults={6}
              />
            </div>

            {/* Quick actions */}
            <nav
              aria-label="Liên kết nhanh"
              className="flex items-center gap-3 sm:gap-4"
            >
              <button
                onClick={handleHomeClick}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition"
                aria-label="Trang chủ"
              >
                <HomeIcon className="h-5 w-5" />
                <span className="hidden xl:inline text-sm">Trang chủ</span>
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleAccountClick}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition"
                  aria-label={isAuthenticated ? "Tài khoản" : "Đăng nhập"}
                >
                  {isAuthenticated ? (
                    <>
                      <img 
                        src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png" 
                        alt="account" 
                        className="h-5 w-5"
                      />
                      <span className="hidden xl:inline text-sm">Tài khoản</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <User className="h-5 w-5" />
                      <span className="hidden xl:inline text-sm">Đăng nhập</span>
                    </>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isAuthenticated && showAccountDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={handleAccountInfo}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Thông tin tài khoản
                    </button>
                    <button
                      onClick={handleMyOrders}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Đơn hàng của tôi
                    </button>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleCartClick}
                className="relative inline-flex items-center text-slate-600 hover:text-sky-600 transition"
                aria-label="Giỏ hàng"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1.5 -right-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-600 px-1.5 text-[10px] font-semibold text-white">
                  {totalItems}
                </span>
              </button>
            </nav>
          </div>

          {/* Category scroller */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 pl-28 text-sm scrollbar-none border-none -mt-6">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryClick(c)}
                className="shrink-0 rounded-full px-2.5 py-1 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition whitespace-nowrap"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Header;
