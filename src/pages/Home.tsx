import React, { useState, useEffect } from "react";
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
import { BannerCarousel, CategoryList, ProductFilter } from "../components/features/bookstore";

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
    console.log('Selected book:', book);
    // Navigate to product detail page
    navigate(`/product/${book.id}`);
  };

  const handleCategorySelect = (category: Category) => {
    console.log('Selected category:', category);
    setSelectedCategory(category);
  };
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header />

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

      {/* Main layout */}
      <div className="max-w-7xl mx-auto py-6 space-y-8">
        {/* Original layout with sidebar */}
        <div className="flex gap-4">
          {/* Categories Sidebar - sát bên trái hoàn toàn */}
          <div className="w-64 flex-shrink-0 pl-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-4">
              <Categories onCategorySelect={handleCategorySelect} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-4 pr-4">
            {/* Banner Carousel - ô riêng biệt */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
              <BannerCarousel />
            </div>

            {/* Category List - ô riêng biệt */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-6">
              <CategoryList />
            </div>

            {/* Product Filter - ô riêng biệt */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300">
              <ProductFilter />
            </div>

            {/* Product List - riêng biệt, không có border */}
            <ProductList
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onBookClick={handleBookClick}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}