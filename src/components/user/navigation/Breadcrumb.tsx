import React from 'react';

interface BreadcrumbProps {
  categoryName: string;
  productName: string;
  onNavigateHome: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  categoryName,
  productName,
  onNavigateHome
}) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <button onClick={onNavigateHome} className="hover:text-blue-600 transition-colors">
        Trang chủ
      </button>
      <span className="text-gray-400">/</span>
      <span className="hover:text-blue-600 cursor-pointer transition-colors">{categoryName}</span>
      <span className="text-gray-400">/</span>
      <span className="text-gray-900 truncate max-w-md">{productName}</span>
    </nav>
  );
};

export default Breadcrumb;

