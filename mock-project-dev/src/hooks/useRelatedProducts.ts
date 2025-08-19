import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Book } from '../types';
import { booksApi } from '../services/api';

type TabType = 'category' | 'author';

// Simple cache for related products
const relatedProductsCache = new Map<string, { data: Book[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface UseRelatedProductsOptions {
  currentBook: Book | null;
  initialTab?: TabType;
}

export const useRelatedProducts = ({ currentBook, initialTab = 'category' }: UseRelatedProductsOptions) => {
  const [relatedProducts, setRelatedProducts] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const debounceTimeoutRef = useRef<number | undefined>(undefined);

  // Memoize author availability check
  const hasAuthors = useMemo(() => {
    return currentBook?.authors && currentBook.authors.length > 0;
  }, [currentBook?.authors]);

  // Generate mock data based on current book
  const generateMockData = useCallback((type: TabType): Book[] => {
    if (!currentBook) return [];
    
    const mockBooks: Book[] = [];
    const basePrice = currentBook.current_seller?.price || 100000;
    
    for (let i = 1; i <= 3; i++) {
      const mockBook: Book = {
        ...currentBook,
        id: `mock-${type}-${i}`,
        name: type === 'category' 
          ? `Sách cùng thể loại ${i} - ${currentBook.categories?.name || 'Thể loại'}`
          : `Sách cùng tác giả ${i} - ${currentBook.authors?.[0]?.name || 'Tác giả'}`,
        authors: type === 'author' && currentBook.authors 
          ? currentBook.authors 
          : [{ id: i, name: `Tác giả ${String.fromCharCode(64 + i)}`, slug: `tac-gia-${i}` }],
        current_seller: {
          ...currentBook.current_seller,
          id: i,
          name: `Nhà sách ${String.fromCharCode(64 + i)}`,
          price: Math.round(basePrice * (0.8 + Math.random() * 0.4)),
          is_best_store: i === 2
        },
        original_price: Math.round(basePrice * (1.2 + Math.random() * 0.3)),
        rating_average: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        book_cover: currentBook.book_cover || null,
        images: currentBook.images || []
      };
      mockBooks.push(mockBook);
    }
    
    return mockBooks;
  }, [currentBook]);

  // Get cache key for current request
  const getCacheKey = useCallback((bookId: string, tab: TabType) => {
    return `${bookId}-${tab}`;
  }, []);

  // Check if cached data is still valid
  const getCachedData = useCallback((cacheKey: string): Book[] | null => {
    const cached = relatedProductsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }, []);

  // Cache the fetched data
  const setCachedData = useCallback((cacheKey: string, data: Book[]) => {
    relatedProductsCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }, []);

  // Fetch related products from API with retry logic and caching
  const fetchRelatedProducts = useCallback(async (retryAttempt = 0) => {
    if (!currentBook) return;
    
    const cacheKey = getCacheKey(currentBook.id, activeTab);
    
    // Check cache first
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      setRelatedProducts(cachedData);
      setLoading(false);
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      let products: Book[] = [];
      
      // Try the optimized related products endpoint first
      try {
        products = await booksApi.getRelated(currentBook.id, activeTab, 6);
      } catch (relatedApiError) {
        // Fallback to individual API calls if optimized endpoint fails
        if (activeTab === 'category') {
          products = await booksApi.getByCategory(currentBook.categories.id);
          products = products.filter(book => book.id !== currentBook.id);
        } else {
          if (hasAuthors) {
            try {
              const currentAuthorId = currentBook.authors![0].id;
              products = await booksApi.getByAuthor(currentAuthorId);
              products = products.filter(book => book.id !== currentBook.id);
            } catch (authorApiError) {
              const allBooks = await booksApi.getAll();
              const currentAuthorId = currentBook.authors![0].id;
              products = allBooks.filter(book => 
                book.id !== currentBook.id &&
                book.authors?.some(author => author.id === currentAuthorId)
              );
            }
          }
        }
      }
      
      const limitedProducts = products.slice(0, 6);
      
      if (limitedProducts.length > 0) {
        setRelatedProducts(limitedProducts);
        setCachedData(cacheKey, limitedProducts);
        setRetryCount(0);
      } else {
        const mockData = generateMockData(activeTab);
        setRelatedProducts(mockData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch related products';
      setError(errorMessage);
      
      if (retryAttempt < 2 && (errorMessage.includes('network') || errorMessage.includes('timeout'))) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchRelatedProducts(retryAttempt + 1);
        }, 1000 * (retryAttempt + 1));
      } else {
        setRelatedProducts(generateMockData(activeTab));
      }
    } finally {
      setLoading(false);
    }
  }, [currentBook, activeTab, hasAuthors, generateMockData, getCacheKey, getCachedData, setCachedData]);

  // Debounced fetch function
  const debouncedFetch = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      fetchRelatedProducts();
    }, 300);
  }, [fetchRelatedProducts]);

  // Fetch related products when dependencies change
  useEffect(() => {
    debouncedFetch();
    
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [debouncedFetch]);

  const handleTabChange = useCallback((tab: TabType) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setError(null);
      setLoading(true);
    }
  }, [activeTab]);

  const handleRetry = useCallback(() => {
    setRetryCount(0);
    fetchRelatedProducts();
  }, [fetchRelatedProducts]);

  return {
    relatedProducts,
    loading,
    error,
    activeTab,
    retryCount,
    hasAuthors,
    handleTabChange,
    handleRetry
  };
};
