import React from 'react';
import type { Book } from '../../../types';

interface ProductDetailsProps {
  book: Book;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ book }) => {
  // Extract data from book specifications only, no fallbacks
  const getSpecificationValue = (searchTerms: string[]): string | null => {
    if (!book.specifications) return null;
    
    for (const spec of book.specifications) {
      for (const attr of spec.attributes) {
        const attrNameLower = attr.name.toLowerCase();
        if (searchTerms.some(term => attrNameLower.includes(term.toLowerCase()))) {
          return attr.value;
        }
      }
    }
    return null;
  };

  const getPublicationDate = () => {
    return getSpecificationValue(['ngày xuất bản', 'publication date', 'xuất bản']);
  };

  const getDimensions = () => {
    return getSpecificationValue(['kích thước', 'dimensions', 'size']);
  };

  const getPageCount = () => {
    return getSpecificationValue(['số trang', 'page count', 'pages', 'trang']);
  };

  const getPublisher = () => {
    return getSpecificationValue(['nhà xuất bản', 'publisher']);
  };

  const getTranslator = () => {
    return getSpecificationValue(['dịch giả', 'translator', 'dịch']);
  };

  const getCoverType = () => {
    return getSpecificationValue(['loại bìa', 'cover type', 'bìa']);
  };

  const getBookcare = () => {
    return getSpecificationValue(['bookcare']);
  };

  // Create array of detail items that have data
  const detailItems = [
    {
      label: 'Bookcare',
      value: getBookcare()
    },
    {
      label: 'Công ty phát hành',
      value: book.current_seller?.name
    },
    {
      label: 'Ngày xuất bản',
      value: getPublicationDate()
    },
    {
      label: 'Kích thước',
      value: getDimensions()
    },
    {
      label: 'Dịch Giả',
      value: getTranslator()
    },
    {
      label: 'Loại bìa',
      value: getCoverType()
    },
    {
      label: 'Số trang',
      value: getPageCount()
    },
    {
      label: 'Nhà xuất bản',
      value: getPublisher()
    }
  ].filter(item => item.value); // Only show items that have actual data

  // Don't render the component if no data is available
  if (detailItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-100 px-4 py-3 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Thông tin chi tiết</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {detailItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 transition-colors">
            <span className="text-gray-600 text-sm">{item.label}</span>
            <span className="text-gray-900 font-medium text-sm">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
