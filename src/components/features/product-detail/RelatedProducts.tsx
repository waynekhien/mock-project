import React, { useState, useEffect } from 'react';
import type { Book } from '../../../types';
import ProductCard from '../product-listing/ProductCard';
import { booksApi } from '../../../services/api';

interface RelatedProductsProps {
  currentBook: Book;
  onProductClick?: (bookId: string) => void;
  onAddToCart?: (book: Book) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentBook,
  onProductClick
}) => {
  const [relatedProducts, setRelatedProducts] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'category' | 'author'>('category');
  const [error, setError] = useState<string | null>(null);

  // Fetch related products from API
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!currentBook) return;
      
      setLoading(true);
      setError(null);

      try {
        let products: Book[] = [];
        
        if (activeTab === 'category') {
          // Get products from same category using existing API
          products = await booksApi.getByCategory(currentBook.categories.id);
          // Filter out current book
          products = products.filter(book => book.id !== currentBook.id);
        } else {
          // Get all books and filter by author
          if (currentBook.authors && currentBook.authors.length > 0) {
            const allBooks = await booksApi.getAll();
            const currentAuthorId = currentBook.authors[0].id;
            products = allBooks.filter(book => 
              book.id !== currentBook.id &&
              book.authors?.some(author => author.id === currentAuthorId)
            );
          }
        }
        
        // Limit to 6 products
        setRelatedProducts(products.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch related products');
        
        // Fallback to mock data if API fails
        const mockRelatedProducts: Book[] = [
          {
            ...currentBook,
            id: '1',
            name: 'Sách tương tự 1 - Cùng thể loại',
            authors: [{ id: 1, name: 'Tác giả A', slug: 'tac-gia-a' }],
            current_seller: { 
              ...currentBook.current_seller,
              id: 1,
              name: 'Nhà sách A',
              price: 150000,
              is_best_store: false
            },
            original_price: 200000,
            rating_average: 4.5,
          },
          {
            ...currentBook,
            id: '2',
            name: 'Sách tương tự 2 - Cùng tác giả',
            authors: currentBook.authors,
            current_seller: { 
              ...currentBook.current_seller,
              id: 2,
              name: 'Nhà sách B',
              price: 120000,
              is_best_store: true
            },
            original_price: 150000,
            rating_average: 4.2,
          },
          {
            ...currentBook,
            id: '3',
            name: 'Sách tương tự 3 - Cùng thể loại',
            authors: [{ id: 2, name: 'Tác giả B', slug: 'tac-gia-b' }],
            current_seller: { 
              ...currentBook.current_seller,
              id: 3,
              name: 'Nhà sách C',
              price: 180000,
              is_best_store: false
            },
            rating_average: 4.7,
          }
        ];
        
        setRelatedProducts(mockRelatedProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentBook, activeTab]);

  const handleProductClick = (productId: string) => {
    if (onProductClick) {
      onProductClick(productId);
    }
  };

  const handleTabChange = (tab: 'category' | 'author') => {
    setActiveTab(tab);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm tương tự</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sản phẩm tương tự</h3>
        
        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleTabChange('category')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'category'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cùng thể loại
          </button>
          <button
            onClick={() => handleTabChange('author')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'author'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            disabled={!currentBook.authors || currentBook.authors.length === 0}
          >
            Cùng tác giả
          </button>
        </div>
      </div>

      {relatedProducts.length === 0 && !loading ? (
        <div className="text-center py-12 text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2">Không tìm thấy sản phẩm tương tự</p>
          <p className="text-sm">
            {activeTab === 'category' 
              ? `Chưa có sản phẩm nào khác trong thể loại "${currentBook.categories.name}"`
              : 'Chưa có sản phẩm nào khác từ tác giả này'
            }
          </p>
          {error && (
            <p className="text-xs text-red-500 mt-2">
              Lỗi khi tải dữ liệu: {error}
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {relatedProducts.slice(0, 6).map((product: Book) => (
            <ProductCard
              key={product.id}
              book={product}
              onBookClick={(book) => handleProductClick(book.id)}
              className="h-full"
            />
          ))}
        </div>
      )}

      {relatedProducts.length > 6 && (
        <div className="text-center mt-6">
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Xem thêm sản phẩm tương tự →
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
