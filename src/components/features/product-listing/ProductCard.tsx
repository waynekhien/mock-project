import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../../types';

interface ProductCardProps {
  book: Book;
  className?: string;
  onBookClick?: (book: Book) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  book,
  className = '',
  onBookClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onBookClick) {
      onBookClick(book);
    } else {
      // Default behavior: navigate to product detail page
      navigate(`/product/${book.id}`);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const getDiscountPercentage = () => {
    if (book.original_price && book.current_seller.price < book.original_price) {
      const discount = ((book.original_price - book.current_seller.price) / book.original_price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <div 
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${className}`}
      onClick={handleClick}
    >
      {/* Book Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {book.images && book.images.length > 0 ? (
          <img
            src={book.images[0].medium_url || book.images[0].base_url}
            alt={book.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>
        )}

        {/* Rating Badge */}
        {book.rating_average > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {formatRating(book.rating_average)}
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-4">
        {/* Book Title */}
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {book.name}
        </h3>

        {/* Authors */}
        {book.authors && book.authors.length > 0 && (
          <p className="text-xs text-gray-600 mb-2">
            {book.authors.map(author => author.name).join(', ')}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-red-600 font-bold text-lg">
              {formatPrice(book.current_seller.price)}
            </span>
            {book.original_price && book.current_seller.price < book.original_price && (
              <span className="text-gray-400 text-sm line-through">
                {formatPrice(book.original_price)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Sold */}
        {book.quantity_sold && (
          <p className="text-xs text-gray-500 mb-2">
            {book.quantity_sold.text}
          </p>
        )}

        {/* Seller Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="truncate">{book.current_seller.name}</span>
          {book.current_seller.is_best_store && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium ml-2">
              Best Store
            </span>
          )}
        </div>

        {/* Category */}
        <div className="mt-2">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
            {book.categories.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
