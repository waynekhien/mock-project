import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  User,
  ShoppingCart,
  Search,
} from "lucide-react";
import Cart from "../ui/Cart";
import { useCart } from "../../contexts/CartContext";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAccountClick = () => {
    // For now, just show alert - can be replaced with actual auth logic
    alert("Chức năng đăng nhập/tài khoản đang được phát triển");
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };
  return (
    <>
      {/* Top notice */}
      <div className="w-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm py-2 text-center">
        Freeship đơn từ 45k, giảm nhiều hơn cùng{" "}
        <span className="font-semibold">FREESHIP XTRA</span>
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

            {/* Search with inside button */}
            <form className="flex-1" role="search" aria-label="Tìm kiếm" onSubmit={handleSearch}>
              <label htmlFor="search" className="sr-only">
                Tìm kiếm
              </label>
              <div className="relative flex w-full">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                  aria-hidden
                />
                <input
                  id="search"
                  type="search"
                  placeholder="100% hàng thật"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-200/60 pl-10 pr-20 py-2.5 text-sm outline-none transition"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 text-sky-600 font-medium border-l border-slate-300 hover:bg-sky-100 rounded-r-xl transition-colors"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>

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
              <button
                onClick={handleAccountClick}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition"
                aria-label="Tài khoản"
              >
                <User className="h-5 w-5" />
                <span className="hidden xl:inline text-sm">Tài khoản</span>
              </button>
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
      
      {/* Cart Popup */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Header;
