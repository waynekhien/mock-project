import React from 'react';

import OrderItem from './OrderItem';
import type { Order } from '../../types';

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  onViewDetails: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
  onCancelOrder?: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  loading,
  onViewDetails,
  onReorder,
  onCancelOrder
}) => {
  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="text-right">
              <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-5 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-32 h-32 mb-6">
        <img
          src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
          alt="Chưa có đơn hàng"
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback to icon if image fails
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
                  </svg>
                </div>
              `;
            }
          }}
        />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng</h3>
      <p className="text-gray-600 mb-6">
        Bạn chưa có đơn hàng nào. Hãy khám phá và mua sắm ngay!
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Tiếp tục mua sắm
      </button>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (orders.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          onViewDetails={onViewDetails}
          onReorder={onReorder}
          onCancelOrder={onCancelOrder}
        />
      ))}
    </div>
  );
};

export default OrderList;
