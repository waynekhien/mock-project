import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
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
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getDiscountPercentage = () => {
    if (book.original_price && book.current_seller?.price && book.current_seller.price < book.original_price) {
      const discount = ((book.original_price - book.current_seller.price) / book.original_price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < fullStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'
          }`}
        />
      );
    }
    
    return stars;
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <div 
      className={`bg-white border border-gray-300 rounded-lg flex w-full hover:shadow-lg transition-shadow duration-200 cursor-pointer m-1 max-[389px]:m-0.5 overflow-hidden ${className}`}
      onClick={handleClick}
    >
      <div className="h-full w-full flex flex-col">
        <a className="product-item block w-full">
          <span className="block w-full">
            {/* Product Image Container */}
            <div className="relative w-full">
              <div className="thumbnail w-full">
                <div className="image-wrapper w-full">
                  <picture className="webpimg-container w-full block">
                    {book.images && book.images.length > 0 ? (
                      <img
                        src={book.images[0].medium_url || book.images[0].base_url}
                        alt={book.name}
                        className="w-full aspect-square object-cover block"
                        style={{ opacity: 1 }}
                      />
                    ) : (
                      <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}
                  </picture>
                </div>
              </div>
              
              {/* Badges */}
              <div className="absolute top-2 left-2 z-2"></div>
              
              {/* Info badges overlay */}
              {discountPercentage > 0 && (
                <div className="info-badges absolute inset-0 z-2">
                  <picture className="webpimg-container">
                    <img 
                      src="https://salt.tikicdn.com/ts/upload/21/c9/ce/ecf520f4346274799396496b3cbbf7d8.png"
                      width="100%" 
                      height="100%" 
                      alt="product_image_badge" 
                      className="w-full h-full opacity-100"
                    />
                  </picture>
                </div>
              )}
            </div>

            {/* Product Content */}
            <div className="product-card-content p-3 max-[389px]:p-1.5 w-full max-w-full overflow-hidden box-border">
              <div className="info w-full max-w-full">
                <div className="flex flex-col gap-1 max-[389px]:gap-0.5 w-full max-w-full">
                  {/* Product Name */}
                  <div className="name-wrapper flex flex-col gap-1 h-14 max-[389px]:h-8 w-full max-w-full overflow-hidden">
                    <h3 className="text-sm max-[389px]:text-xs font-normal text-gray-800 line-clamp-2 leading-tight max-[389px]:leading-snug w-full max-w-full break-words overflow-hidden text-ellipsis">
                      {book.name}
                    </h3>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center max-[389px]:hidden">
                      <div className="flex items-center" style={{ fontSize: '12px' }}>
                        <div className="relative flex">
                          {renderStars(Number(book.rating_average || 0))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="price-section w-full max-w-full overflow-hidden">
                    <div className="price-discount w-full max-w-full">
                      <div className="price-discount__price text-red-500 font-medium text-base max-[389px]:text-xs max-[389px]:font-semibold w-full max-w-full truncate overflow-hidden">
                        {formatPrice(book.current_seller?.price || book.list_price)}
                        <sup className="max-[389px]:text-xs">₫</sup>
                      </div>
                    </div>
                    
                    {/* Discount and Original Price */}
                    {discountPercentage > 0 && (
                      <div className="flex gap-1 h-4.5 max-[389px]:h-3 items-center w-full max-w-full overflow-hidden">
                        <div className="price-discount__discount bg-red-100 text-red-600 text-xs max-[389px]:text-xs px-1 py-0.5 max-[389px]:px-0.5 max-[389px]:py-0 rounded flex-shrink-0">
                          -{discountPercentage}%
                        </div>
                        <div className="price-discount__original-price text-gray-400 text-xs max-[389px]:text-xs line-through truncate overflow-hidden flex-1 min-w-0">
                          {formatPrice(book.original_price || book.list_price)}
                          <sup className="max-[389px]:text-xs">₫</sup>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex flex-col gap-2 mt-2 max-[389px]:gap-0.5 max-[389px]:mt-0.5 w-full max-w-full overflow-hidden">
                <div className="flex flex-col gap-1.5 max-[389px]:gap-0.5 w-full max-w-full">
                  <div className="h-1 max-[389px]:h-0"></div>
                  
                  {/* Delivery Info */}
                  <div className="delivery-info flex items-center gap-1 max-[389px]:gap-0.5 w-full max-w-full overflow-hidden">
                    <img 
                      width="32" 
                      height="16" 
                      src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png" 
                      alt="tikinow"
                      className="max-[389px]:w-4 max-[389px]:h-2 flex-shrink-0"
                    />
                    <span className="text-xs max-[389px]:text-xs text-gray-600 max-[389px]:hidden truncate overflow-hidden flex-1 min-w-0">Giao siêu tốc 2h</span>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;

