import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { Seller } from '../../../types';

interface SellerInfoProps {
  seller: Seller;
}

const SellerInfo: React.FC<SellerInfoProps> = ({ seller }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={seller.logo}
            alt={seller.name}
            className="w-12 h-12 rounded-lg object-cover border"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/48x48?text=Store';
            }}
          />
          <div>
            <h3 className="font-medium text-gray-900">{seller.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              {seller.is_best_store && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Uy tín
                </span>
              )}
            </div>
          </div>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:underline transition-colors">
          Xem shop
        </button>
      </div>
    </div>
  );
};

export default SellerInfo;
