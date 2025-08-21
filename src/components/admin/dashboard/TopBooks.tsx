import React from 'react';
import { Star } from 'lucide-react';

interface Book {
  name: string;
  sales: number;
  rating: number;
  revenue: number;
}

interface TopBooksProps {
  books: Book[];
}

const TopBooks: React.FC<TopBooksProps> = ({ books }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Sách bán chạy</h2>
        <p className="text-gray-600 text-sm mt-1">Top sách có doanh số cao</p>
      </div>
      
      <div className="p-6 space-y-3">
        {books.map((book, index) => (
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
                  <span className="text-gray-600 text-sm">{book.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{book.revenue.toLocaleString()}đ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBooks;
