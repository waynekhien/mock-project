import React, { useCallback, useState } from 'react';
import type { Book } from '../../../types';
import ProductCard from '../product-listing/ProductCard';
import { useRelatedProducts } from '../../../hooks';

interface RelatedProductsProps {
  currentBook: Book;
  onProductClick?: (bookId: string) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentBook,
  onProductClick,
}) => {
  const [showAll, setShowAll] = useState(false);

  const {
    relatedProducts,
    loading,
    error,
    activeTab,
    retryCount,
    hasAuthors,
    handleTabChange,
    handleRetry
  } = useRelatedProducts({ currentBook });

  // Calculate how many products to show
  const displayLimit = showAll ? relatedProducts.length : 6;
  const productsToShow = relatedProducts.slice(0, displayLimit);

  const handleProductClick = useCallback((productId: string) => {
    if (onProductClick) {
      onProductClick(productId);
    }
  }, [onProductClick]);

  // const handleAddToCart = useCallback((book: Book) => {
  //   if (onAddToCart) {
  //     onAddToCart(book);
  //   }
  // }, [onAddToCart]);

  const handleViewMore = useCallback(() => {
    setShowAll(!showAll);
  }, [showAll]);

  // Loading skeleton component with TailwindCSS animations
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-40"></div>
        <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-24"></div>
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-24 ml-1"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="aspect-[3/4] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-2/3"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Sản phẩm tương tự</h3>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1 w-fit shadow-inner">
          <button
            onClick={() => handleTabChange('category')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ease-out ${
              activeTab === 'category'
                ? 'bg-white text-blue-600 shadow-md transform scale-105 ring-2 ring-blue-100'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-102'
            }`}
          >
            <span className="hidden sm:inline">Cùng thể loại</span>
            <span className="sm:hidden">Thể loại</span>
          </button>
          <button
            onClick={() => handleTabChange('author')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 ease-out ${
              activeTab === 'author'
                ? 'bg-white text-blue-600 shadow-md transform scale-105 ring-2 ring-blue-100'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-102'
            } ${!hasAuthors ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!hasAuthors}
            title={!hasAuthors ? 'Không có thông tin tác giả' : ''}
          >
            <span className="hidden sm:inline">Cùng tác giả</span>
            <span className="sm:hidden">Tác giả</span>
          </button>
        </div>
      </div>

      {/* Retry button for errors */}
      {error && retryCount > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-yellow-800">
              Đang thử lại... (Lần thử {retryCount}/2)
            </p>
            <button
              onClick={handleRetry}
              className="text-sm text-yellow-600 hover:text-yellow-800 font-medium"
            >
              Thử lại ngay
            </button>
          </div>
        </div>
      )}

      {relatedProducts.length === 0 && !loading ? (
        <div className="text-center py-12 text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2">Không tìm thấy sản phẩm tương tự</p>
          <p className="text-sm mb-4">
            {activeTab === 'category'
              ? `Chưa có sản phẩm nào khác trong thể loại "${currentBook.categories?.name || 'này'}"`
              : `Chưa có sản phẩm nào khác từ tác giả "${currentBook.authors?.[0]?.name || 'này'}"`
            }
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-600 mb-2">
                Lỗi khi tải dữ liệu: {error}
              </p>
              <button
                onClick={handleRetry}
                className="text-sm text-red-600 hover:text-red-800 font-medium underline"
              >
                Thử lại
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={`grid gap-4 transition-all duration-500 ease-in-out ${
          showAll
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
            : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
        }`}>
          {productsToShow.map((product: Book, index) => (
            <div
              key={product.id}
              className={`group transform transition-all duration-500 ease-out ${
                showAll ? 'animate-fadeInUp' : 'animate-fade-in'
              }`}
              style={{
                animationDelay: showAll ? `${index * 100}ms` : '0ms'
              }}
            >
              <ProductCard
                book={product}
                onBookClick={(book) => handleProductClick(book.id)}
                className="h-full transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:-translate-y-1"
              />
            </div>
          ))}
        </div>
      )}

      {relatedProducts.length > 6 && (
        <div className="text-center mt-8">
          <button
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md group"
            onClick={handleViewMore}
          >
            {showAll ? (
              <>
                <svg className="mr-2 w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Thu gọn
              </>
            ) : (
              <>
                Xem thêm {relatedProducts.length - 6} sản phẩm
                <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
