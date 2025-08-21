import React, { useState } from 'react';
import { BookOpen, DollarSign, Star, Save, X, AlertCircle, User, Tag, Plus, Minus } from 'lucide-react';

interface BookForm {
  id?: string;
  name: string;
  description: string;
  short_description: string;
  list_price: number;
  original_price: number;
  book_cover: string | null;
  rating_average: number;
  images?: Array<{ base_url: string }>;
  authors: Array<{
    id?: number;
    name: string;
    slug?: string;
  }>;
  categories: {
    id?: number;
    name: string;
    is_leaf?: boolean;
  };
  specifications: Array<{
    name: string;
    attributes: Array<{
      code: string;
      name: string;
      value: string;
    }>;
  }>;
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newAuthor, setNewAuthor] = useState('');
  const [newSpecName, setNewSpecName] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!book.name.trim()) {
      newErrors.name = 'Tên sách là bắt buộc';
    }

    if (!book.short_description.trim()) {
      newErrors.short_description = 'Mô tả ngắn là bắt buộc';
    }

    if (book.list_price <= 0) {
      newErrors.list_price = 'Giá bán phải lớn hơn 0';
    }

    if (book.original_price <= 0) {
      newErrors.original_price = 'Giá gốc phải lớn hơn 0';
    }

    if (book.list_price > book.original_price) {
      newErrors.list_price = 'Giá bán không được lớn hơn giá gốc';
    }

    if (book.rating_average < 0 || book.rating_average > 5) {
      newErrors.rating_average = 'Đánh giá phải từ 0 đến 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    }
  };

  const addAuthor = () => {
    if (newAuthor.trim()) {
      const updatedAuthors = [...(book.authors || []), { name: newAuthor.trim() }];
      onChange({
        target: { name: 'authors', value: updatedAuthors }
      } as any);
      setNewAuthor('');
    }
  };

  const removeAuthor = (index: number) => {
    const updatedAuthors = book.authors.filter((_, i) => i !== index);
    onChange({
      target: { name: 'authors', value: updatedAuthors }
    } as any);
  };

  const addSpecification = () => {
    if (newSpecName.trim() && newSpecValue.trim()) {
      const generalSpec = book.specifications?.find(s => s.name === 'Thông tin chung') || {
        name: 'Thông tin chung',
        attributes: []
      };

      const updatedAttributes = [...generalSpec.attributes, {
        code: newSpecName.toLowerCase().replace(/\s+/g, '_'),
        name: newSpecName.trim(),
        value: newSpecValue.trim()
      }];

      const updatedSpecs = book.specifications?.filter(s => s.name !== 'Thông tin chung') || [];
      updatedSpecs.push({ ...generalSpec, attributes: updatedAttributes });

      onChange({
        target: { name: 'specifications', value: updatedSpecs }
      } as any);

      setNewSpecName('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (attrIndex: number) => {
    const generalSpec = book.specifications?.find(s => s.name === 'Thông tin chung');
    if (generalSpec) {
      const updatedAttributes = generalSpec.attributes.filter((_, i) => i !== attrIndex);
      const updatedSpecs = book.specifications?.filter(s => s.name !== 'Thông tin chung') || [];
      updatedSpecs.push({ ...generalSpec, attributes: updatedAttributes });

      onChange({
        target: { name: 'specifications', value: updatedSpecs }
      } as any);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? "Chỉnh sửa sách" : "Thêm sách mới"}
              </h3>
              <p className="text-sm text-gray-600">
                {isEditing ? "Cập nhật thông tin sách" : "Điền thông tin để thêm sách mới"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Book Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên sách <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nhập tên sách"
                value={book.name}
                onChange={onChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                required
              />
              {errors.name && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả ngắn <span className="text-red-500">*</span>
              </label>
              <textarea
                name="short_description"
                placeholder="Nhập mô tả ngắn về sách"
                value={book.short_description}
                onChange={onChange}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                  errors.short_description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                required
              />
              {errors.short_description && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.short_description}
                </div>
              )}
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả chi tiết
              </label>
              <textarea
                name="description"
                placeholder="Nhập mô tả chi tiết về sách"
                value={book.description}
                onChange={onChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              />
            </div>

            {/* Authors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tác giả
              </label>
              <div className="space-y-3">
                {/* Existing Authors */}
                {book.authors && book.authors.length > 0 && (
                  <div className="space-y-2">
                    {book.authors.map((author, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="flex-1 text-sm">{author.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAuthor(index)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add New Author */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập tên tác giả"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAuthor())}
                  />
                  <button
                    type="button"
                    onClick={addAuthor}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="categories"
                  placeholder="Nhập danh mục sách"
                  value={book.categories?.name || ''}
                  onChange={(e) => onChange({
                    target: {
                      name: 'categories',
                      value: { name: e.target.value, is_leaf: false }
                    }
                  } as any)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Book Cover */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ảnh bìa sách
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  name="book_cover"
                  placeholder="Nhập URL ảnh bìa sách"
                  value={
                    book.book_cover ||
                    (book.images && book.images.length > 0 ? book.images[0].base_url : '') ||
                    ''
                  }
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                {(book.book_cover || (book.images && book.images.length > 0 && book.images[0].base_url)) && (
                  <div className="relative w-32 h-40 border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={book.book_cover || (book.images && book.images.length > 0 ? book.images[0].base_url : '')}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDEyOCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA2NEg4MFY5Nkg0OFY2NEoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2Zz4K';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá gốc <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="original_price"
                    placeholder="0"
                    value={book.original_price || ''}
                    onChange={onChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.original_price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    min="0"
                    step="1000"
                    required
                  />
                </div>
                {errors.original_price && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.original_price}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá bán <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="list_price"
                    placeholder="0"
                    value={book.list_price || ''}
                    onChange={onChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.list_price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    min="0"
                    step="1000"
                    required
                  />
                </div>
                {errors.list_price && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.list_price}
                  </div>
                )}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đánh giá trung bình
              </label>
              <div className="relative">
                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  name="rating_average"
                  placeholder="4.5"
                  value={book.rating_average || ''}
                  onChange={onChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.rating_average ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
              {errors.rating_average && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.rating_average}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">Điểm đánh giá từ 0-5 sao</p>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật</h4>

          {/* Existing Specifications */}
          {book.specifications && book.specifications.length > 0 && (
            <div className="mb-6">
              {book.specifications.map((spec, specIndex) => (
                <div key={specIndex} className="mb-4">
                  <h5 className="font-medium text-gray-700 mb-2">{spec.name}</h5>
                  <div className="space-y-2">
                    {spec.attributes.map((attr, attrIndex) => (
                      <div key={attrIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <span className="text-sm font-medium text-gray-600">{attr.name}:</span>
                          <span className="text-sm text-gray-800">{attr.value}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSpecification(attrIndex)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add New Specification */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Tên thông số (VD: ISBN-13)"
              value={newSpecName}
              onChange={(e) => setNewSpecName(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Giá trị (VD: 9781853260278)"
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
            />
            <button
              type="button"
              onClick={addSpecification}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Thêm thông số
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
            Hủy
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            {isEditing ? "Cập nhật sách" : "Thêm sách"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookFormComponent;
