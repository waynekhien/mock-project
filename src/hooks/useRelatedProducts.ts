import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [activeTab] = useState<TabType>(initialTab); // Remove setActiveTab since we're only using category
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const debounceTimeoutRef = useRef<number | undefined>(undefined);



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
    try {
      if (!currentBook) {
        setRelatedProducts([]);
        setLoading(false);
        return;
      }

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

      let products: Book[] = [];

      // Get books by same category using getAll and filter client-side
      if (currentBook.categories?.id) {
        console.log('Fetching related products for category:', currentBook.categories.id, currentBook.categories.name);
        try {
          // Get all books and filter by same category
          const allBooks = await booksApi.getAll();
          console.log('Total books from API:', allBooks.length);

          // Filter by same category and exclude current book
          products = allBooks.filter(book =>
            book.categories?.id === currentBook.categories?.id &&
            book.id !== currentBook.id
          );
          console.log('Filtered products (same category, excluding current):', products.length, 'items');
        } catch (apiError) {
          console.error('Failed to fetch books:', apiError);
          products = [];
        }
      } else {
        console.warn('No category ID found for current book:', currentBook.categories);
      }

      const limitedProducts = products.slice(0, 6);

      if (limitedProducts.length > 0) {
        setRelatedProducts(limitedProducts);
        setCachedData(cacheKey, limitedProducts);
        setRetryCount(0);
      } else {
        // If no related products found, show empty array
        setRelatedProducts([]);
      }
    } catch (err) {
      console.error('Error in fetchRelatedProducts:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch related products';
      setError(errorMessage);

      if (retryAttempt < 2) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchRelatedProducts(retryAttempt + 1);
        }, 1000 * (retryAttempt + 1));
      } else {
        setRelatedProducts([]);
      }
    } finally {
      setLoading(false);
    }
  }, [currentBook, activeTab, getCacheKey, getCachedData, setCachedData]);

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

  const handleRetry = useCallback(() => {
    setRetryCount(0);
    fetchRelatedProducts();
  }, [fetchRelatedProducts]);

  return {
    relatedProducts,
    loading,
    error,
    retryCount,
    handleRetry
  };
};
