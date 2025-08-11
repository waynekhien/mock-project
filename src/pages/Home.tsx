import React, { useState } from "react";
import {
  BadgeCheck,
  Truck,
  RefreshCw,
  Clock,
  Tag,
} from "lucide-react";
import type { Book, Category } from "../types";
import { Categories, ProductList, Header, Footer } from "../components";

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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleBookClick = (book: Book) => {
    console.log('Selected book:', book);
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

      {/* Main layout with sidebar */}
      <div className="flex">
        {/* Categories Sidebar */}
        <Categories onCategorySelect={handleCategorySelect} />

        {/* Main Content */}
        <ProductList
          selectedCategory={selectedCategory}
          onBookClick={handleBookClick}
          className="flex-1"
        />
      </div>
      
      <Footer />
    </div>
  );
}