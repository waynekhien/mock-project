import React, { useState, useEffect } from 'react';
import { categoriesApi } from '../../../services/api';
import type { Category } from '../../../types';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: Category) => {
    // Handle category navigation
    console.log('Navigate to category:', category.slug);
  };

  if (loading) {
    return (
      <div>
        <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex-shrink-0 text-center animate-pulse">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Khám phá theo danh mục</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm mb-2">Lỗi khi tải danh mục: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-red-600 hover:text-red-700 text-sm font-medium underline"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Khám phá theo danh mục</h2>
      
      <div className="flex space-x-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="flex-shrink-0 text-center cursor-pointer group"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                <img
                  src={category.image || 'https://salt.tikicdn.com/cache/280x280/ts/category/ed/20/60/afa9b3b474bf7ad70c11c414f85e4359.png'}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            <p className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200 font-medium max-w-20 mx-auto leading-tight">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
