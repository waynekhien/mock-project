import React from "react";
import { BookForm, BookTable } from "../../components/admin/books";
import { useBookManagement } from "../../hooks/admin";

const BooksAdmin: React.FC = () => {
  const {
    books,
    loading,
    error,
    isEditing,
    currentBook,
    handleInputChange,
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
    resetForm,
  } = useBookManagement();

  console.log('Rendering books:', books.length);

  if (loading) {
    console.log('Loading state is true');
    return <div className="text-center p-4">Đang tải...</div>;
  }
  
  if (error) {
    console.log('Error state:', error);
    return <div className="text-center text-red-500 p-4">Lỗi: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Sách</h2>

      <BookForm
        book={currentBook}
        isEditing={isEditing}
        onSubmit={handleAddOrUpdate}
        onChange={handleInputChange}
        onCancel={resetForm}
      />

      <BookTable
        books={books}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={(id) => alert(`Xem chi tiết: ${id}`)}
      />
    </div>
  );
};

export default BooksAdmin;
