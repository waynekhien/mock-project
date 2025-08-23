import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Package,
  RefreshCw,
  Star
} from "lucide-react";
import { BookForm, BookDetailModal } from "../components/books";
import {
  PageHeader,
  ActionButton,
  ModernDataTable
} from "../components/shared";
import { useBookManagement } from "../hooks";
import type { Book } from "../../types";

const ProductsAdmin: React.FC = () => {
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

  const [showForm, setShowForm] = useState(false);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showBookDetail, setShowBookDetail] = useState(false);





  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditBook = (id: string) => {
    handleEdit(id);
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    await handleAddOrUpdate(e);
    setShowForm(false);
  };

  const handleFormCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const handleViewDetail = (book: Book) => {
    setSelectedBook(book);
    setShowBookDetail(true);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
    setShowBookDetail(false);
  };

  const handleEditFromDetail = (book: Book) => {
    handleEdit(book.id);
    setShowForm(true);
    setShowBookDetail(false);
  };

  const handleRefresh = () => {
    // Trigger refresh logic
    window.location.reload();
  };



  // Table columns for ModernDataTable
  const tableColumns = [
    {
      key: 'images',
      label: 'Ảnh',
      width: 'w-20',
      render: (value: any[], row: any) => {
        // Get base_url from first image
        const imageUrl = value && value.length > 0 && value[0].base_url ? value[0].base_url : null;

        return imageUrl ? (
          <img
            src={imageUrl}
            alt={row.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-gray-400" />
          </div>
        );
      }
    },

    { key: 'name', label: 'Tên sách', sortable: true },

    {
      key: 'list_price',
      label: 'Giá bán',
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold text-emerald-600">
          {value?.toLocaleString()}đ
        </span>
      )
    },
    {
      key: 'rating_average',
      label: 'Đánh giá',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="font-medium">{value || 0}</span>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-slate-600 font-medium">Đang tải dữ liệu sách...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-500" />
          </div>
          <div className="text-red-600 font-bold text-lg">Có lỗi xảy ra</div>
          <div className="text-red-500 text-sm mt-2">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50">
      {/* Header */}
      <PageHeader
        title="Quản lý sách"
        description="Quản lý danh mục sách trong cửa hàng"
        icon={BookOpen}
        iconColor="green"
        stats={[
          { icon: Package, label: "Tổng sách", value: books.length }
        ]}
        actions={
          <ActionButton
            onClick={handleAddNew}
            icon={Plus}
            variant="success"
          >
            Thêm sách mới
          </ActionButton>
        }
      />





      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <BookForm
              book={{
                ...currentBook,
                authors: currentBook.authors || [],
                categories: currentBook.categories || { id: Date.now(), name: "", is_leaf: false },
                specifications: currentBook.specifications || []
              } as any}
              isEditing={isEditing}
              onSubmit={handleFormSubmit}
              onChange={handleInputChange}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <ModernDataTable
        data={books}
        columns={tableColumns}
        title="Danh sách sách"
        searchPlaceholder="Tìm kiếm theo tên sách, tác giả..."
        onView={(id: string) => {
          const book = books.find(b => b.id === id);
          if (book) handleViewDetail(book);
        }}
        onEdit={handleEditBook}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
        loading={loading}
      />



      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={showBookDetail}
        onClose={handleCloseDetail}
        onEdit={handleEditFromDetail}
        onDelete={(bookId: string) => handleDelete(bookId)}
      />
    </div>
  );
};




export default ProductsAdmin;
