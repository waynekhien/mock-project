import React, { useState, useEffect } from 'react';
import { booksApi } from '../../../services/api';
import type { Category } from '../../../types';

interface CategoriesProps {
  className?: string;
  onCategorySelect?: (category: Category) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  className = '',
  onCategorySelect
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        
        const books = await booksApi.getAll();
        const uniqueCategories = new Map<number, Category>();

        books.forEach(book => {
          if (book.categories && !uniqueCategories.has(book.categories.id)) {
            uniqueCategories.set(book.categories.id, book.categories);
          }
        });

        const categoriesArray = Array.from(uniqueCategories.values());
        setCategories(categoriesArray);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: Category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <div className="text-center py-4">
          <p className="text-red-600 text-sm mb-2">Error loading</p>
          <button
            onClick={handleRetry}
            className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="pb-4 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-900">Khám phá theo danh mục</h2>
      </div>

      {/* Categories List */}
      <div className="pt-2">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-gray-100 last:border-b-0">
            <button
              className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-150"
              onClick={() => toggleCategory(category.id)}
            >
              <span className="text-sm text-gray-700 font-medium">
                {category.name}
              </span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  expandedCategories.has(category.id) ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Subcategories or description */}
            {expandedCategories.has(category.id) && (
              <div className="bg-gray-50 border-t border-gray-100">
                {category.description ? (
                  <div className="px-3 py-3">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                    {category.slug && (
                      <span className="inline-block mt-2 text-xs text-gray-500">
                        #{category.slug}
                      </span>
                    )}
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className="block mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View all →
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-3">
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View category →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Categories;

