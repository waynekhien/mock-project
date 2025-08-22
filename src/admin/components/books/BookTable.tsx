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
    { key: "image", label: "Ảnh", width: "w-20" },
    { key: "id", label: "ID", sortable: true, width: "w-24" },
    { key: "name", label: "Tên sách", sortable: true },
    { key: "categories", label: "Danh mục" },
    { key: "list_price", label: "Giá bán", sortable: true },
    { key: "original_price", label: "Giá gốc", sortable: true },
    { key: "rating_average", label: "Đánh giá", sortable: true },
  ];

  // Format data for AdminTable
  const formattedBooks = books.map(book => {
    // Get base_url from first image only
    const imageUrl = book.images && book.images.length > 0 && book.images[0].base_url
      ? book.images[0].base_url
      : null;

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
      title="Quản lý sách"
      searchPlaceholder="Tìm kiếm sách..."
      itemsPerPage={8}
    />
  );
};

export default BookTable;
