import { useState, useEffect } from 'react';
import { booksApi } from '../services/api';
import type { Book } from '../types';

interface BestSellerBook {
  id: string;
  title: string;
  price: number;
  url?: string;
  rank: number;
  sold?: number;
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
      
      // Fetch all books from API
      const books: Book[] = await booksApi.getAll();
      
      // Sort by sold quantity (using quantity_sold.value) and take top N
      const sortedBooks = books
        .filter(book => book.quantity_sold && book.quantity_sold.value > 0) // Only books with sales data
        .sort((a, b) => (b.quantity_sold?.value || 0) - (a.quantity_sold?.value || 0))
        .slice(0, limit);
      
      // Transform to BestSellerBook format
      const topBooks: BestSellerBook[] = sortedBooks.map((book, index) => ({
        id: book.id,
        title: book.name,
        price: book.list_price,
        url: `#/product/${book.id}`, // Internal link to product detail
        rank: index + 1,
        sold: book.quantity_sold?.value
      }));

      // If we don't have enough books with sales data, fill with regular books
      if (topBooks.length < limit) {
        const remainingBooks = books
          .filter(book => !topBooks.find(tb => tb.id === book.id))
          .slice(0, limit - topBooks.length)
          .map((book, index) => ({
            id: book.id,
            title: book.name,
            price: book.list_price,
            url: `#/product/${book.id}`,
            rank: topBooks.length + index + 1,
            sold: book.quantity_sold?.value || 0
          }));
        
        topBooks.push(...remainingBooks);
      }
      
      setBestSellers(topBooks);
    } catch (err) {
      console.error('Error fetching best sellers:', err);
      setError('Không thể tải dữ liệu sản phẩm bán chạy');
      
      // Fallback to mock data
      const mockData: BestSellerBook[] = [
        {
          id: '1',
          title: 'Người Ăn Chay',
          price: 108000,
          url: '#/product/1',
          rank: 1,
          sold: 1500
        },
        {
          id: '2',
          title: 'Sách - 12 Nguyên tắc cốt lõi hợp tác làm ăn chung, Chia thế nào để khoá rủi ro, minh bạch, bền vững',
          price: 139000,
          url: '#/product/2',
          rank: 2,
          sold: 1200
        },
        {
          id: '3',
          title: 'Thuyền',
          price: 97200,
          url: '#/product/3',
          rank: 3,
          sold: 1100
        },
        {
          id: '4',
          title: 'Sách - Khoá Học Cấp Tốc Về Tư Bản Và Tiền Bạc - Bài Học Từ Thành Phố Đắt Đỏ Nhất Thế Giới',
          price: 149000,
          url: '#/product/4',
          rank: 4,
          sold: 950
        },
        {
          id: '5',
          title: 'Tư duy dã tràng - Tim trí giao tranh',
          price: 121000,
          url: '#/product/5',
          rank: 5,
          sold: 890
        },
        {
          id: '6',
          title: 'Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ',
          price: 143400,
          url: '#/product/6',
          rank: 6,
          sold: 780
        },
        {
          id: '7',
          title: 'Khi Mọi Điều Không Như Ý',
          price: 79000,
          url: '#/product/7',
          rank: 7,
          sold: 650
        },
        {
          id: '8',
          title: 'Lên Đỉnh Núi Mở Tiệm Bánh Mì - Triết lí Wazawaza: Những con người hạnh phúc, 2 loại bánh mì, và doanh thu thường niên 300 triệu Yên',
          price: 86400,
          url: '#/product/8',
          rank: 8,
          sold: 520
        },
        {
          id: '9',
          title: 'Thế Hệ Lo Âu',
          price: 157880,
          url: '#/product/9',
          rank: 9,
          sold: 480
        },
        {
          id: '10',
          title: 'Tư Duy Nhanh Và Chậm (Tái Bản)',
          price: 201760,
          url: '#/product/10',
          rank: 10,
          sold: 430
        }
      ].slice(0, limit);
      
      setBestSellers(mockData);
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
