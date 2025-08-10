import React from "react";
import {
  Home as HomeIcon,
  User,
  ShoppingCart,
  Search,
  BadgeCheck,
  Truck,
  RefreshCw,
  Clock,
  Tag,
} from "lucide-react";

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

const commitments = [
  {
    icon: <BadgeCheck className="h-5 w-5 text-sky-600" aria-hidden />,
    title: "100% hàng thật",
  },
  {
    icon: <Truck className="h-5 w-5 text-sky-600" aria-hidden />,
    title: "Freeship mọi đơn",
  },
  {
    icon: <RefreshCw className="h-5 w-5 text-sky-600" aria-hidden />,
    title: "Hoàn 200% nếu hàng giả",
  },
  {
    icon: <Clock className="h-5 w-5 text-sky-600" aria-hidden />,
    title: "30 ngày đổi trả",
  },
  {
    icon: <Truck className="h-5 w-5 text-sky-600" aria-hidden />,
    title: "Giao nhanh 2h",
  },
  {
    icon: <Tag className="h-5 w-5 text-sky-600" aria-hidden />,
    title: "Giá siêu rẻ",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
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
            <form className="flex-1" role="search" aria-label="Tìm kiếm">
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
                  className="w-full rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-200/60 pl-10 pr-20 py-2.5 text-sm outline-none transition"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 text-sky-600 font-medium border-l border-slate-300 hover:bg-sky-100 rounded-r-xl"
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
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition"
                aria-label="Trang chủ"
              >
                <HomeIcon className="h-5 w-5" />
                <span className="hidden xl:inline text-sm">Trang chủ</span>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-sky-600 transition"
                aria-label="Tài khoản"
              >
                <User className="h-5 w-5" />
                <span className="hidden xl:inline text-sm">Tài khoản</span>
              </a>
              <a
                href="#"
                className="relative inline-flex items-center text-slate-600 hover:text-sky-600 transition"
                aria-label="Giỏ hàng"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1.5 -right-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-600 px-1.5 text-[10px] font-semibold text-white">
                  0
                </span>
              </a>
            </nav>
          </div>

          {/* Category scroller */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 pl-28 text-sm scrollbar-none border-none -mt-6">
            {categories.map((c) => (
              <a
                key={c}
                href="#"
                className="shrink-0 rounded-full px-2.5 py-1 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition whitespace-nowrap"
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Commitments row */}
      <section
        aria-label="Cam kết"
        className="border-b border-slate-100 px-3 w-full"
      >
        <div className="flex gap-4 overflow-x-auto py-3 md:py-4 scrollbar-none">
          <span className="shrink-0 font-bold bold inline-flex items-center gap-2 text-sky-700">
            Cam kết
          </span>
          {commitments.map((item, index) => (
            <React.Fragment key={item.title}>
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                {React.cloneElement(item.icon, {
                  className: item.icon.props.className,
                })}
                <span className="text-slate-800">{item.title}</span>
              </span>
              {index < commitments.length - 1 && (
                <span className="text-slate-300">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <main className="px-3 py-8 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="aspect-[4/3] w-full rounded-lg bg-slate-100" />
              <div className="mt-3 h-4 w-3/4 rounded bg-slate-100" />
              <div className="mt-2 h-4 w-1/2 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200 px-3 py-6 text-center text-xs text-slate-500 w-full">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
