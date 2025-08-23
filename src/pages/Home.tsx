import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  BadgeCheck,
  Truck,
  RefreshCw,
  Clock,
  Tag,
} from "lucide-react";
import type { Book, Category } from "../types";
import { Categories, ProductList, Header, Footer } from "../components";
import { BannerCarousel, CategoryList, ProductFilter, TopBestSellers } from "../components/user/home";

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Get search query from URL
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
      // Clear category selection when searching
      setSelectedCategory(null);
    } else {
      // Clear search query when no search param
      setSearchQuery('');
    }
  }, [searchParams]);

  const handleBookClick = (book: Book) => {
    // Navigate to product detail page
    navigate(`/product/${book.id}`);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
  }, []);

  const handleFiltersChange = useCallback((filters: string[]) => {
    setActiveFilters(filters);
  }, []);
  return (
    <div className="min-h-screen bg-white text-slate-800 max-[389px]:w-screen max-[389px]:overflow-x-hidden">
      <Header />

      {/* Commitments row - Hidden on screens smaller than 390px */}
      <section
        aria-label="Cam kết"
        className="border-b border-slate-100 px-3 w-full hidden min-[390px]:block"
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

      {/* Main layout */}
      <div className="max-w-7xl mx-auto py-6 space-y-8 max-[389px]:py-0 max-[389px]:space-y-0 max-[389px]:mx-0 max-[389px]:max-w-none max-[389px]:w-full">
        {/* Original layout with sidebar */}
        <div className="flex gap-4 max-[389px]:flex-col max-[389px]:gap-0 max-[389px]:w-full">
          {/* Categories Sidebar - sát bên trái hoàn toàn - Hidden on screens smaller than 390px */}
          <div className="w-64 flex-shrink-0 pl-4 hidden min-[390px]:block">
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-4">
              <Categories onCategorySelect={handleCategorySelect} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-4 pr-4 max-[389px]:pr-0 max-[389px]:space-y-0 max-[389px]:w-full max-[389px]:flex-none">
            {/* Banner Carousel - ô riêng biệt */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 hidden min-[390px]:block">
              <BannerCarousel />
            </div>

            {/* Category List - ô riêng biệt - Hidden on screens smaller than 390px */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6 hidden min-[390px]:block">
              <CategoryList />
            </div>

            {/* Product Filter - ô riêng biệt */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 max-[389px]:w-full max-[389px]:max-w-full max-[389px]:overflow-hidden max-[389px]:rounded-none max-[389px]:border-x-0 max-[389px]:shadow-none max-[389px]:mx-0">
              <ProductFilter
                onSortChange={handleSortChange}
                onFiltersChange={handleFiltersChange}
              />
            </div>

            {/* Product List - riêng biệt, không có border */}
            <div className="max-[389px]:w-full max-[389px]:max-w-full max-[389px]:overflow-hidden max-[389px]:mx-0">
              <ProductList
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                sortBy={sortBy}
                activeFilters={activeFilters}
                onBookClick={handleBookClick}
              />
            </div>
            
            {/* Top Best Sellers - Hidden on screens smaller than 390px */}
            <div className="mt-8 hidden min-[390px]:block">
              <TopBestSellers />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - Hidden on screens smaller than 390px */}
      <div className="hidden min-[390px]:block">
        <Footer />
      </div>
    </div>
  );
}