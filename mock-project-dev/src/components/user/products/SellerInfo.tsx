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
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'w-12 h-12 rounded-lg border bg-gray-100 flex items-center justify-center';
                fallback.innerHTML = '<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>';
                parent.insertBefore(fallback, target);
              }
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

