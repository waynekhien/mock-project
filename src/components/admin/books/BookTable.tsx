import React from 'react';
import { AdminTable } from '../shared';
import type { Book } from '../../../types';

interface BookTableProps {
  books: Book[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDetail: (id: string) => void;
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const columns = [
    { key: "image", label: "Ảnh" },
    { key: "id", label: "ID" },
    { key: "name", label: "Tên sách" },
    { key: "categories", label: "Danh mục" },
    { key: "list_price", label: "Giá bán" },
    { key: "original_price", label: "Giá gốc" },
    { key: "rating_average", label: "Đánh giá" },
  ];

  // Format data for AdminTable
  const formattedBooks = books.map(book => {
    // Get the first image from images array or book_cover
    const imageUrl = book.images && book.images.length > 0 
      ? book.images[0].base_url || book.images[0].thumbnail_url 
      : book.book_cover;
    
    return {
      id: book.id,
      image: imageUrl,
      name: book.name,
      categories: book.categories?.name || 'N/A',
      list_price: book.list_price ? `${book.list_price.toLocaleString()}đ` : 'N/A',
      original_price: book.original_price ? `${book.original_price.toLocaleString()}đ` : 'N/A',
      rating_average: book.rating_average || 0,
    };
  });

  if (books.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
        <p className="text-gray-500">Không có sách nào để hiển thị</p>
      </div>
    );
  }

  return (
    <AdminTable
      data={formattedBooks}
      columns={columns}
      onEdit={onEdit}
      onDelete={onDelete}
      onDetail={onDetail}
    />
  );
};

export default BookTable;
