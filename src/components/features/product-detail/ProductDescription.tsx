import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import type { Book } from '../../../types';

interface ProductDescriptionProps {
  book: Book;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ book }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Only show if there's actual description content
  if (!book.description && !book.short_description) {
    return null;
  }
  
  const truncatedDescription = book.description?.slice(0, 300) || '';
  const needsTruncation = book.description && book.description.length > 300;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Product Description */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
          Mô tả sản phẩm
        </h3>

        {/* Short Description */}
        {book.short_description && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <p className="text-gray-700 leading-relaxed">{book.short_description}</p>
          </div>
        )}

        {/* Full Description */}
        {book.description && (
          <div className="prose max-w-none">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: showFullDescription ? book.description : truncatedDescription
              }}
            />
            
            {needsTruncation && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-4 flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                {showFullDescription ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Thu gọn
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Xem thêm
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Product Specifications */}
        {/* {book.specifications && book.specifications.length > 0 && (
          <div className="mt-8">
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
        )} */}
      </div>
    </div>
  );
};

export default ProductDescription;
