import React, { useState } from 'react';
import { Categories, ProductList } from '../components';
import type { Category, Book } from '../types';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCategorySelect = (category: Category) => {
    console.log('Selected category:', category);
    setSelectedCategory(category);
  };

  const handleBookClick = (book: Book) => {
    console.log('Selected book:', book);
    // Bạn có thể thêm logic xử lý khi user click vào book
    // Ví dụ: navigate to book detail page
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Categories */}
      <Categories onCategorySelect={handleCategorySelect} />

      {/* Main Content - Product List */}
      <ProductList
        selectedCategory={selectedCategory}
        onBookClick={handleBookClick}
      />
    </div>
  );
};

export default Home;