import React from 'react';
import {
  X,
  BookOpen,
  Star,
  DollarSign,
  User,
  Tag,
  Calendar,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../../components/ui';
import type { Book } from '../../../types';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (book: Book) => void;
  onDelete?: (bookId: string) => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!isOpen || !book) return null;

  const handleEdit = () => {
    if (onEdit) {
      onEdit(book);
    }
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      onDelete(book.id);
      onClose();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Chi tiết sách</h2>
              <p className="text-gray-600 text-sm">Thông tin đầy đủ về sách</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                title="Chỉnh sửa"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                title="Xóa"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Book Cover */}
            <div className="lg:col-span-1">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                {book.images && book.images.length > 0 && book.images[0].base_url ? (
                  <img
                    src={book.images[0].base_url}
                    alt={book.name}
                    className="w-full max-w-xs mx-auto rounded-lg shadow-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`${book.images && book.images.length > 0 && book.images[0].base_url ? 'hidden' : ''} py-12`}>
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Không có ảnh bìa</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-medium">{book.id}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Đánh giá:</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(Number(book.rating_average || 0))}</div>
                    <span className="text-sm font-medium">({Number(book.rating_average || 0)})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Book Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{book.name}</h3>
                
                {/* Authors */}
                {book.authors && book.authors.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Tác giả:</span>
                    <div className="flex flex-wrap gap-1">
                      {book.authors.map((author, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {author.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category */}
                {book.categories && (
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Danh mục:</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {book.categories.name}
                    </span>
                  </div>
                )}

                {/* Pricing */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Giá niêm yết:</span>
                    <span className="text-xl font-bold text-green-600">
                      {formatPrice(book.list_price || 0)}
                    </span>
                  </div>
                  {book.original_price && book.original_price !== book.list_price && (
                    <div className="text-gray-500 line-through">
                      {formatPrice(book.original_price)}
                    </div>
                  )}
                </div>
              </div>

              {/* Short Description */}
              {book.short_description && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Mô tả ngắn</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {book.short_description}
                  </p>
                </div>
              )}

              {/* Full Description */}
              {book.description && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Mô tả chi tiết</h4>
                  <div 
                    className="text-gray-700 bg-gray-50 p-4 rounded-lg prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: book.description }}
                  />
                </div>
              )}

              {/* Specifications */}
              {book.specifications && book.specifications.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Thông số kỹ thuật</h4>
                  <div className="space-y-4">
                    {book.specifications.map((spec, specIndex) => (
                      <div key={specIndex}>
                        <h5 className="font-medium text-gray-800 mb-2">{spec.name}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {spec.attributes.map((attr, attrIndex) => (
                            <div key={attrIndex} className="flex justify-between p-2 bg-gray-50 rounded">
                              <span className="text-gray-600 text-sm">{attr.name}:</span>
                              <span className="text-gray-900 text-sm font-medium">{attr.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            <Calendar className="w-4 h-4 inline mr-1" />
            Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
          </div>
          
          <div className="flex gap-2">
            {book.images && book.images.length > 0 && book.images[0].base_url && (
              <Button
                variant="outline"
                onClick={() => window.open(book.images[0].base_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Xem ảnh gốc
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Đóng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
