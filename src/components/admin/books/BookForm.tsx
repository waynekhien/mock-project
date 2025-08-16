import React from 'react';

interface BookForm {
  id?: string;
  name: string;
  description: string;
  short_description: string;
  list_price: number;
  original_price: number;
  book_cover: string | null;
  rating_average: number;
}

interface BookFormProps {
  book: BookForm;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
}

const BookFormComponent: React.FC<BookFormProps> = ({
  book,
  isEditing,
  onSubmit,
  onChange,
  onCancel,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4">
        {isEditing ? "Sửa Sách" : "Thêm Sách mới"}
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên sách <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Nhập tên sách"
            value={book.name}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả ngắn <span className="text-red-500">*</span>
          </label>
          <textarea
            name="short_description"
            placeholder="Nhập mô tả ngắn về sách"
            value={book.short_description}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            rows={2}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả chi tiết <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            placeholder="Nhập mô tả chi tiết về nội dung sách"
            value={book.description}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá bán <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="list_price"
              placeholder="0"
              value={book.list_price}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
              min="0"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Giá bán hiện tại (VNĐ)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá gốc
            </label>
            <input
              type="number"
              name="original_price"
              placeholder="0"
              value={book.original_price}
              onChange={onChange}
              className="w-full p-2 border rounded-md"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Giá gốc trước khi giảm (VNĐ)</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Ảnh bìa sách
          </label>
          <input
            type="url"
            name="book_cover"
            placeholder="https://example.com/book-cover.jpg"
            value={book.book_cover || ""}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">Đường link ảnh bìa sách (HTTPS)</p>
        </div>

        {/* Preview ảnh nếu có URL */}
        {book.book_cover && (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Xem trước ảnh bìa:
            </label>
            <img 
              src={book.book_cover} 
              alt="Preview"
              className="h-32 w-32 object-cover rounded-md border"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Đánh giá trung bình
          </label>
          <input
            type="number"
            name="rating_average"
            placeholder="4.5"
            value={book.rating_average}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            min="0"
            max="5"
            step="0.1"
          />
          <p className="text-xs text-gray-500 mt-1">Điểm đánh giá từ 0-5 sao</p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {isEditing ? "Cập nhật" : "Thêm sách"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookFormComponent;
