import React, { useCallback } from 'react';
import type { Book } from '../../../types';
import ProductCard from '../product-listing/ProductCard';
import { useRelatedProducts } from '../../../hooks';

// Error Boundary Component
class RelatedProductsErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('RelatedProducts Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm tương tự</h3>
          <div className="text-center py-8 text-gray-500">
            <p>Không thể tải sản phẩm tương tự</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface RelatedProductsProps {
  currentBook: Book;
  onProductClick?: (bookId: string) => void;
}

const RelatedProductsContent: React.FC<RelatedProductsProps> = ({
  currentBook,
  onProductClick,
}) => {

  const {
    relatedProducts,
    loading,
    error,
    retryCount,
    handleRetry
  } = useRelatedProducts({ currentBook, initialTab: 'category' });

  // Always show only 5 products
  const productsToShow = relatedProducts.slice(0, 5);

  const handleProductClick = useCallback((productId: string) => {
    if (onProductClick) {
      onProductClick(productId);
    }
  }, [onProductClick]);

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
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
            {currentBook?.categories?.name
              ? `Chưa có sản phẩm nào khác trong danh mục "${currentBook.categories.name}"`
              : 'Chưa có sản phẩm nào khác tương tự'
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
          <div className="mt-4 text-xs text-gray-400">
            <p>Debug: Category ID = {currentBook?.categories?.id || 'N/A'}</p>
            <p>Debug: Category Name = {currentBook?.categories?.name || 'N/A'}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {productsToShow.map((product: Book) => (
            <div
              key={product.id}
              className="group transform transition-all duration-300 ease-out"
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
    </div>
  );
};

// Main component with error boundary
const RelatedProducts: React.FC<RelatedProductsProps> = (props) => {
  return (
    <RelatedProductsErrorBoundary>
      <RelatedProductsContent {...props} />
    </RelatedProductsErrorBoundary>
  );
};

export default RelatedProducts;
