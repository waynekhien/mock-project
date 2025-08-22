import React from 'react';
import { Star } from 'lucide-react';
import { useBestSellers } from '../../../hooks';

const TopBooks: React.FC = () => {
  const { bestSellers, loading, error } = useBestSellers(5); // Top 5 for admin dashboard

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sách bán chạy</h2>
          <p className="text-gray-600 text-sm mt-1">Top sách có doanh số cao</p>
        </div>
        
        <div className="p-6 space-y-3 animate-pulse">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center gap-3 p-3">
              <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || bestSellers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sách bán chạy</h2>
          <p className="text-gray-600 text-sm mt-1">Top sách có doanh số cao</p>
        </div>
        
        <div className="p-6 text-center text-gray-500">
          {error || 'Không có dữ liệu sách bán chạy'}
        </div>
      </div>
    );
  }

  // Calculate estimated revenue (price * sold quantity for display)
  const getBooksWithRevenue = () => {
    return bestSellers.map(book => ({
      name: book.title,
      sales: book.sold || 0,
      rating: book.rating || 0, // Use real rating from database
      revenue: book.price * (book.sold || 0) // Total revenue
    }));
  };

  const booksWithRevenue = getBooksWithRevenue();
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Sách bán chạy</h2>
        <p className="text-gray-600 text-sm mt-1">Top sách có doanh số cao</p>
      </div>
      
      <div className="p-6 space-y-3">
        {booksWithRevenue.map((book, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-lg font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{book.name}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-gray-600 text-sm">{book.sales} bán</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-gray-600 text-sm">{book.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {book.revenue >= 1000000 
                  ? `${(book.revenue / 1000000).toFixed(1)}tr đ`
                  : `${book.revenue.toLocaleString()} đ`
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBooks;
