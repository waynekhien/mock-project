import React from 'react';
import { useBestSellers } from '../../../hooks';

const TopBestSellers: React.FC = () => {
  const { bestSellers, loading, error } = useBestSellers(10);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="space-y-3">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1">
                  <div className="w-3 h-3 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded flex-1 max-w-xs"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Top Bán Chạy Sản Phẩm Nhà Sách Tiki
        </h2>
        <div className="text-red-600 text-sm text-center py-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Top Bán Chạy Sản Phẩm Nhà Sách Tiki
      </h2>
      
      <ol className="space-y-3">
        {bestSellers.map((book) => (
          <li key={book.id} className="flex items-start justify-between">
            {/* Left side: Number + Book title */}
            <div className="flex items-start space-x-2 flex-1 pr-4">
              <span className="text-gray-500 font-medium text-sm mt-0.5 flex-shrink-0">
                {book.rank}.
              </span>
              <a 
                href={book.url}
                className="text-blue-600 hover:text-blue-700 text-sm leading-relaxed hover:underline transition-colors duration-200 flex-1"
              >
                {book.title}
              </a>
            </div>
            
            {/* Right side: Price */}
            <div className="flex-shrink-0">
              <span className="text-black text-sm font-medium">
                {formatPrice(book.price)}
                <sup className="text-xs">₫</sup>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopBestSellers;
