import React from 'react';
import { Star, Award } from 'lucide-react';
import type { Book } from '../../../types';

interface ProductBasicInfoProps {
  book: Book;
  discountPercentage: number;
  formatPrice: (price: number) => string;
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
  book,
  discountPercentage,
  formatPrice
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        {/* Badge for official/authentic - only show if seller is best store */}
        {book.current_seller?.is_best_store && (
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-green-500 to-green-600">
              <Award className="w-3 h-3 mr-1" />
              Best Seller
            </span>
          </div>
        )}

        {/* Authors */}
        {book.authors && book.authors.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Tác giả:</span>
            <div className="flex flex-wrap gap-1">
              {book.authors.map((author, index) => (
                <button key={author.id} className="text-sm text-blue-600 hover:underline transition-colors">
                  {author.name}{index < book.authors!.length - 1 ? ',' : ''}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
          {book.name}
        </h1>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(Number(book.rating_average || 0))
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {Number(book.rating_average || 0).toFixed(1)}
            </span>
          </div>
          {book.quantity_sold && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-1 h-1 bg-gray-400 rounded-full mx-2"></span>
              <span>{book.quantity_sold.text}</span>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-red-600">
                {formatPrice(book.current_seller?.price || book.list_price)}
              </span>
              {book.original_price && book.current_seller?.price && book.current_seller.price < book.original_price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(book.original_price)}
                  </span>
                  <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>
            <div className="text-sm text-gray-600">
              Giá đã bao gồm VAT. Phí vận chuyển và các chi phí khác (nếu có)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInfo;

