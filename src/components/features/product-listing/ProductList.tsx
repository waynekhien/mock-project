import React, { useState, useEffect } from 'react';
import { booksApi } from '../../../services/api';
import type { Book, Category } from '../../../types';
import ProductCard from './ProductCard';
import { Pagination } from '../../ui';

export interface ProductListProps {
  className?: string;
  selectedCategory?: Category | null;
  searchQuery?: string;
  sortBy?: string;
  activeFilters?: string[];
  onBookClick?: (book: Book) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  className = '',
  selectedCategory,
  searchQuery,
  sortBy = 'popular',
  activeFilters = [],
  onBookClick
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const ITEMS_PER_PAGE = 20;

  // Apply filters function
  const applyFilters = (books: Book[], filters: string[]): Book[] => {
    if (filters.length === 0) return books;

    return books.filter(book => {
      // Check each active filter
      for (const filter of filters) {
        switch (filter) {
          case 'fast-delivery':
            // Assume books with fast delivery have a specific property or seller
            // For demo, we'll check if current_seller exists (indicating fast delivery)
            if (!book.current_seller) return false;
            break;

          case 'top-deal':
            // Check if book has significant discount
            const originalPrice = book.list_price || 0;
            const currentPrice = book.current_seller?.price || originalPrice;
            const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
            if (discount < 20) return false; // At least 20% discount for top deal
            break;

          case 'freeship':
            // Assume freeship is available for books above certain price or from certain sellers
            const price = book.current_seller?.price || book.list_price || 0;
            if (price < 150000) return false; // Freeship for orders above 150k
            break;

          case 'high-rating':
            // Filter books with rating >= 4 stars
            const rating = typeof book.rating_average === 'number' ? book.rating_average : parseFloat(book.rating_average || '0');
            if (rating < 4) return false;
            break;

          default:
            break;
        }
      }
      return true; // Book passes all active filters
    });
  };

  // Sort books function
  const sortBooks = (books: Book[], sortBy: string): Book[] => {
    const sortedBooks = [...books];

    switch (sortBy) {
      case 'price-asc':
        return sortedBooks.sort((a, b) => {
          const priceA = a.current_seller?.price || a.list_price || 0;
          const priceB = b.current_seller?.price || b.list_price || 0;
          return priceA - priceB;
        });

      case 'price-desc':
        return sortedBooks.sort((a, b) => {
          const priceA = a.current_seller?.price || a.list_price || 0;
          const priceB = b.current_seller?.price || b.list_price || 0;
          return priceB - priceA;
        });

      case 'newest':
        return sortedBooks.sort((a, b) => {
          // Use id as proxy for creation time (higher id = newer)
          const idA = parseInt(a.id.toString()) || 0;
          const idB = parseInt(b.id.toString()) || 0;
          return idB - idA;
        });

      case 'best-seller':
        return sortedBooks.sort((a, b) => {
          const soldA = a.quantity_sold?.value || 0;
          const soldB = b.quantity_sold?.value || 0;
          return soldB - soldA;
        });

      case 'rating':
        return sortedBooks.sort((a, b) => {
          const ratingA = typeof a.rating_average === 'number' ? a.rating_average : parseFloat(a.rating_average || '0');
          const ratingB = typeof b.rating_average === 'number' ? b.rating_average : parseFloat(b.rating_average || '0');
          return ratingB - ratingA;
        });

      case 'popular':
      default:
        // Keep original order or sort by a combination of factors
        return sortedBooks.sort((a, b) => {
          const ratingA = typeof a.rating_average === 'number' ? a.rating_average : parseFloat(a.rating_average || '0');
          const ratingB = typeof b.rating_average === 'number' ? b.rating_average : parseFloat(b.rating_average || '0');
          const scoreA = ratingA * 0.3 + (a.quantity_sold?.value || 0) * 0.7;
          const scoreB = ratingB * 0.3 + (b.quantity_sold?.value || 0) * 0.7;
          return scoreB - scoreA;
        });
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get all books and filter client-side
        const allBooks = await booksApi.getAll();
        let filteredBooks = allBooks;

        // Filter by category if selected
        if (selectedCategory) {
          filteredBooks = allBooks.filter(book =>
            book.categories?.id === selectedCategory.id
          );
        }

        // Filter by search query if provided
        if (searchQuery && searchQuery.trim()) {
          const searchTerm = searchQuery.toLowerCase().trim();
          filteredBooks = filteredBooks.filter(book => {
            return (
              book.name.toLowerCase().includes(searchTerm) ||
              book.short_description?.toLowerCase().includes(searchTerm) ||
              book.description?.toLowerCase().includes(searchTerm) ||
              book.authors?.some(author =>
                author.name.toLowerCase().includes(searchTerm)
              ) ||
              book.categories?.name.toLowerCase().includes(searchTerm)
            );
          });
        }

        // Apply filters
        const filteredByFilters = applyFilters(filteredBooks, activeFilters);

        // Apply sorting
        const sortedBooks = sortBooks(filteredByFilters, sortBy);
        setBooks(sortedBooks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch books');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    setCurrentPage(1); // Reset về trang 1 khi filters thay đổi
  }, [selectedCategory, searchQuery, sortBy, activeFilters]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-trigger useEffect
    window.location.reload();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tính toán sản phẩm cho trang hiện tại
  const totalItems = books.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className={`flex-1 p-8 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-lg text-gray-600">Loading books...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex-1 p-8 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <div className="text-red-600 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Books</h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button 
                  onClick={handleRetry}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className={`flex-1 p-8 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No Books Found</h3>
              <p className="text-gray-500">
                {searchQuery
                  ? `No books found for "${searchQuery}".`
                  : selectedCategory
                    ? `No books found in "${selectedCategory.name}" category.`
                    : 'No books available at the moment.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 p-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : selectedCategory
                ? selectedCategory.name
                : 'All Books'
            }
          </h1>
          <p className="text-gray-600">
            {books.length} book{books.length !== 1 ? 's' : ''} found
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory && !searchQuery && ` in ${selectedCategory.name}`}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {currentBooks.map((book) => (
            <ProductCard
              key={book.id}
              book={book}
              onBookClick={onBookClick}
              className="h-full"
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      </div>
    </div>
  );
};

export default ProductList;
