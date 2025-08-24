import { useState, useEffect } from 'react';
import { booksApi, ordersApi } from '../services/api';
import type { Book } from '../types';

interface BestSellerBook {
  id: string;
  title: string;
  price: number;
  url?: string;
  rank: number;
  sold?: number;
  rating?: number;
}

interface UseBestSellersReturn {
  bestSellers: BestSellerBook[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBestSellers = (limit: number = 10): UseBestSellersReturn => {
  const [bestSellers, setBestSellers] = useState<BestSellerBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBestSellers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all books and orders from API
      const [books, orders]: [Book[], any[]] = await Promise.all([
        booksApi.getAll(),
        ordersApi.getAll()
      ]);
      
      // Calculate actual sold quantities from orders
      const bookSales: { [bookId: string]: number } = {};
      
      orders.forEach((order: any) => {
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach((item: any) => {
            const productId = item.productId;
            const quantity = item.quantity || 0;
            
            if (productId) {
              bookSales[productId] = (bookSales[productId] || 0) + quantity;
            }
          });
        }
      });
      
      // Add sales data to books and sort by actual sold quantity
      const booksWithSales = books
        .map(book => ({
          ...book,
          actualSold: bookSales[book.id] || 0
        }))
        .filter(book => book.actualSold > 0) // Only books with actual sales
        .sort((a, b) => b.actualSold - a.actualSold)
        .slice(0, limit);
      
      // Transform to BestSellerBook format
      const topBooks: BestSellerBook[] = booksWithSales.map((book, index) => ({
        id: book.id,
        title: book.name,
        price: book.current_seller?.price || book.list_price, // Use current_seller price first, fallback to list_price
        url: `/product/${book.id}`,
        rank: index + 1,
        sold: book.actualSold,
        rating: typeof book.rating_average === 'number' ? book.rating_average : parseFloat(book.rating_average?.toString() || '0')
      }));

      // If we don't have enough books with sales data, fill with other books
      if (topBooks.length < limit) {
        const remainingBooks = books
          .filter(book => !topBooks.find(tb => tb.id === book.id))
          .slice(0, limit - topBooks.length)
          .map((book, index) => ({
            id: book.id,
            title: book.name,
            price: book.current_seller?.price || book.list_price, // Use current_seller price first, fallback to list_price
            url: `/product/${book.id}`,
            rank: topBooks.length + index + 1,
            sold: bookSales[book.id] || 0,
            rating: typeof book.rating_average === 'number' ? book.rating_average : parseFloat(book.rating_average?.toString() || '0')
          }));
        
        topBooks.push(...remainingBooks);
      }
      
      setBestSellers(topBooks);
    } catch (err) {
      console.error('Error fetching best sellers:', err);
      setError('Không thể tải dữ liệu sản phẩm bán chạy');
      setBestSellers([]);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchBestSellers();
  };

  useEffect(() => {
    fetchBestSellers();
  }, [limit]);

  return {
    bestSellers,
    loading,
    error,
    refetch
  };
};
