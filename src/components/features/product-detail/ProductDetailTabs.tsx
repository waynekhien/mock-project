import React from 'react';
import type { Book } from '../../../types';

interface ProductDetailTabsProps {
  book: Book;
}

const ProductDetailTabs: React.FC<ProductDetailTabsProps> = ({ book }) => {
  return (
    <>
      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg shadow-sm mt-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            <button className="py-4 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">
              Thông tin chi tiết
            </button>
            <button className="py-4 text-gray-600 hover:text-gray-900 text-sm transition-colors">
              Đánh giá ({book.rating_average ? '234' : '0'})
            </button>
            <button className="py-4 text-gray-600 hover:text-gray-900 text-sm transition-colors">
              Hỏi & Đáp
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Product Description */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin sản phẩm</h3>

              {book.short_description && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <p className="text-gray-700 leading-relaxed">{book.short_description}</p>
                </div>
              )}

              {book.description && (
                <div className="prose max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: book.description }}
                  />
                </div>
              )}
            </div>

            {/* Specifications */}
            {book.specifications && book.specifications.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông số kỹ thuật</h4>
                <div className="space-y-4">
                  {book.specifications.map((spec, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b">
                        <h5 className="font-medium text-gray-900">{spec.name}</h5>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {spec.attributes.map((attr, attrIndex) => (
                            <div key={attrIndex} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                              <span className="text-gray-600 text-sm">{attr.name}:</span>
                              <span className="text-gray-900 font-medium text-sm text-right">{attr.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailTabs;
