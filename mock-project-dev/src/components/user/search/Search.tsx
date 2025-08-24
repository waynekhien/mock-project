import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../../types';
import { booksApi } from '../../../services/api';

// BookImage component with error handling
const BookImage: React.FC<{ book: Book }> = ({ book }) => {
  const [imageError, setImageError] = useState(false);

  // Get image URL from images array base_url
  const imageUrl = book.images && book.images.length > 0 ? book.images[0].base_url : null;

  return (
    <div className="flex-shrink-0 w-12 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-md overflow-hidden border border-gray-200 shadow-sm">
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={book.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      )}
    </div>
  );
};

interface SearchProps {
  placeholder?: string;
  className?: string;
  onResultClick?: (book: Book) => void;
  showResults?: boolean;
  maxResults?: number;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Tìm kiếm sách, tác giả...',
  className = '',
  onResultClick,
  showResults = true,
  maxResults = 8
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<number | undefined>(undefined);

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Get all books and filter client-side
      const allBooks = await booksApi.getAll();

      // Filter books based on search query
      const searchTerm = searchQuery.toLowerCase();

      const filteredBooks = allBooks.filter(book => {
        const nameMatch = book.name.toLowerCase().includes(searchTerm);
        const descMatch = book.short_description?.toLowerCase().includes(searchTerm);
        const fullDescMatch = book.description?.toLowerCase().includes(searchTerm);
        const authorMatch = book.authors?.some(author =>
          author.name.toLowerCase().includes(searchTerm)
        );
        const categoryMatch = book.categories?.name.toLowerCase().includes(searchTerm);

        return nameMatch || descMatch || fullDescMatch || authorMatch || categoryMatch;
      });

      setResults(filteredBooks);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Lỗi khi tìm kiếm');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  const debouncedSearch = (searchQuery: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // If input is empty, clear search results and navigate to home
    if (value.trim() === '') {
      navigate('/');
      setIsOpen(false);
      setResults([]);
      setHasSearched(false);
    } else {
      debouncedSearch(value);
      setIsOpen(value.length >= 2);
    }
  };

  // Handle result click
  const handleResultClick = (book: Book) => {
    if (onResultClick) {
      onResultClick(book);
    } else {
      navigate(`/product/${book.id}`);
    }
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Handle search submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to home page with search query
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Handle clear
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setError(null);
    setHasSearched(false);
    setLoading(false);
    setIsOpen(false);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Navigate to home to show all books
    navigate('/');
    inputRef.current?.focus();
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const displayResults = results.slice(0, maxResults);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="w-full px-4 py-2 pl-10 pr-10 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onFocus={() => query.length >= 2 && setIsOpen(true)}
            />

            {/* Search Icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Clear Button */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Tìm kiếm
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && isOpen && (query.length >= 2) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-gray-600">Đang tìm kiếm...</span>
            </div>
          )}

          {error && (
            <div className="p-4 text-sm text-red-600 bg-red-50">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {!loading && !error && hasSearched && displayResults.length === 0 && (
            <div className="p-4 text-sm text-gray-500 text-center">
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p>Không tìm thấy kết quả cho "{query}"</p>
                <p className="text-xs text-gray-400 mt-1">Thử tìm kiếm với từ khóa khác</p>
              </div>
            </div>
          )}

          {!loading && !error && displayResults.length > 0 && (
            <>
              {displayResults.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleResultClick(book)}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  {/* Book Image */}
                  <BookImage book={book} />

                  {/* Book Info */}
                  <div className="ml-3 flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {book.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {book.authors?.map(author => author.name).join(', ')}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm font-semibold text-blue-600">
                        {formatPrice(book.current_seller?.price || book.list_price)}
                      </span>
                      {book.categories && (
                        <span className="ml-2 text-xs text-gray-400">
                          {book.categories.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Show more results info */}
              {results.length > maxResults && (
                <div className="p-3 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500">
                    Hiển thị {maxResults} trong tổng số {results.length} kết quả
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Nhập từ khóa cụ thể hơn để thu hẹp kết quả
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

