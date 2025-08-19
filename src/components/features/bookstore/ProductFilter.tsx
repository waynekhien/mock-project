import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

interface SortOption {
  value: string;
  label: string;
}

const ProductFilter: React.FC = () => {
  const [filters, setFilters] = useState<FilterOption[]>([
    { 
      id: 'fast-delivery', 
      label: 'Giao siêu tốc 2H', 
      icon: 'https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png', 
      active: false 
    },
    { 
      id: 'top-deal', 
      label: 'Top Deal', 
      icon: 'https://salt.tikicdn.com/ts/upload/f8/77/0b/0923990ed377f50c3796f9e6ce0dddde.png', 
      active: false 
    },

    { 
      id: 'freeship', 
      label: 'Freeship Xtra', 
      icon: 'https://salt.tikicdn.com/ts/upload/a7/18/8c/910f3a83b017b7ced73e80c7ed4154b0.png', 
      active: false 
    },
    { 
      id: 'high-rating', 
      label: 'từ 4 sao', 
      icon: 'star', 
      active: false 
    }
  ]);

  const [sortBy, setSortBy] = useState('popular');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions: SortOption[] = [
    { value: 'popular', label: 'Phổ biến' },
    { value: 'price-asc', label: 'Giá thấp → cao' },
    { value: 'price-desc', label: 'Giá cao → thấp' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'best-seller', label: 'Bán chạy' },
    { value: 'rating', label: 'Đánh giá cao' }
  ];

  const toggleFilter = (filterId: string) => {
    setFilters(prev => 
      prev.map(filter => 
        filter.id === filterId 
          ? { ...filter, active: !filter.active }
          : filter
      )
    );
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsDropdownOpen(false);
  };

  const clearAllFilters = () => {
    setFilters(prev => prev.map(filter => ({ ...filter, active: false })));
  };

  const activeFiltersCount = filters.filter(f => f.active).length;

  return (
    <div>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Tất cả sản phẩm</h2>
          <div className="flex items-center space-x-4">
            {/* Active filters count */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {activeFiltersCount} bộ lọc đang áp dụng
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Xóa tất cả
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <label
              key={filter.id}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filter.active}
                onChange={() => toggleFilter(filter.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                {filter.icon.startsWith('http') ? (
                  <img 
                    src={filter.icon} 
                    alt={filter.label} 
                    className="w-12 h-12 object-contain"
                  />
                ) : filter.icon === 'star' ? (
                  <div className="flex space-x-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className={`w-4 h-4 ${
                          star <= 4 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300 fill-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-2xl">{filter.icon}</span>
                )}
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {filter.label}
                </span>
              </div>
            </label>
          ))}
        </div>

        {/* Active filters summary */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-blue-700 font-medium">
                  Đang lọc theo: {filters.filter(f => f.active).map(f => f.label).join(', ')}
                </span>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Bỏ lọc
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sort Section - di chuyển xuống dưới */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Sắp xếp</span>
          
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded hover:border-gray-400 transition-colors duration-200 bg-white"
            >
              <span className="text-sm text-gray-900">
                {sortOptions.find(opt => opt.value === sortBy)?.label}
              </span>
              <svg 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="py-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                        sortBy === option.value 
                          ? 'text-blue-600 bg-blue-50 font-medium' 
                          : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductFilter;
