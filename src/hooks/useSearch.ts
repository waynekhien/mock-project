import { useState, useEffect, useCallback, useRef } from 'react';
import type { Book } from '../types';
import { booksApi } from '../services/api';

interface UseSearchOptions {
  minQueryLength?: number;
  debounceMs?: number;
}

export const useSearch = ({ minQueryLength = 2, debounceMs = 300 }: UseSearchOptions = {}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  const debounceTimeoutRef = useRef<number | undefined>(undefined);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < minQueryLength) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Get all books and filter client-side since API doesn't support search
      const allBooks = await booksApi.getAll();
      
      // Filter books based on search query
      const filteredBooks = allBooks.filter(book => {
        const searchTerm = searchQuery.toLowerCase();
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

      setResults(filteredBooks);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted, ignore
        return;
      }
      
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Lỗi khi tìm kiếm');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [minQueryLength]);

  // Debounced search
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      performSearch(searchQuery);
    }, debounceMs);
  }, [performSearch, debounceMs]);

  // Update query and trigger search
  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    debouncedSearch(newQuery);
  }, [debouncedSearch]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
    setHasSearched(false);
    setLoading(false);
    
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    query,
    results,
    loading,
    error,
    hasSearched,
    updateQuery,
    clearSearch,
    performSearch: () => performSearch(query)
  };
};

export default useSearch;
