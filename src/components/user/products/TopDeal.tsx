import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBestSellers } from '../../../hooks';
import { booksApi } from '../../../services/api';
import type { Book } from '../../../types';
import ProductCard from './ProductCard';

const TopDeal: React.FC = () => {
  const { bestSellers, loading: bestSellersLoading, error } = useBestSellers(5);
  const [topDeals, setTopDeals] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleProductClick = useCallback((productId: string) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  // Fetch full book data to get images
  useEffect(() => {
    const fetchBooksWithImages = async () => {
      if (bestSellersLoading || bestSellers.length === 0) {
        setLoading(bestSellersLoading);
        return;
      }

      try {
        setLoading(true);
        const books = await booksApi.getAll();
        
        // Map bestsellers with full book data including images
        const booksWithImages = bestSellers.map(seller => {
          const fullBook = books.find(book => book.id === seller.id);
          
          if (fullBook) {
            return fullBook; // Use the full book data directly
          }
          
          // Fallback if book not found in full data
          return {
            id: seller.id,
            name: seller.title,
            list_price: seller.price,
            original_price: seller.price,
            current_seller: {
              id: 1,
              sku: '',
              name: 'Tiki Trading',
              link: '',
              logo: '',
              price: seller.price,
              product_id: seller.id,
              store_id: 1,
              is_best_store: true,
              is_offline_installment_supported: null
            },
            rating_average: seller.rating || 0,
            quantity_sold: {
              text: `${seller.sold || 0}`,
              value: seller.sold || 0
            },
            book_cover: null,
            categories: { id: 1, name: 'Sách' },
            description: '',
            short_description: '',
            images: [],
            specifications: [],
            authors: []
          } as Book;
        });
        
        setTopDeals(booksWithImages);
      } catch (err) {
        console.error('Error fetching books with images:', err);
        setTopDeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooksWithImages();
  }, [bestSellers, bestSellersLoading]);

  // Loading skeleton component with TailwindCSS animations (same as RelatedProducts)
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-48"></div>
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

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h3 className="text-lg font-semibold text-gray-900">� Sản phẩm bán chạy</h3>
        </div>
        <div className="text-center py-12 text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2">Không thể tải dữ liệu sản phẩm bán chạy</p>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (topDeals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Top Deal</h3>
        </div>
        <div className="text-center py-12 text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-lg font-medium mb-2">Hiện tại không có sản phẩm bán chạy</p>
          <p className="text-sm">Chưa có sản phẩm nào có dữ liệu bán hàng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mt-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Top Deal</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {topDeals.map((book: Book) => (
          <div
            key={book.id}
            className="group transform transition-all duration-300 ease-out"
          >
            <ProductCard
              book={book}
              onBookClick={(book) => handleProductClick(book.id)}
              className="h-full transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:-translate-y-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeal;

