import React from 'react';

import OrderItem from './OrderItem';
import type { Order } from '../../../types';

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
    <div className="space-y-4 max-[389px]:space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse max-[389px]:p-4 max-[389px]:rounded-none max-[389px]:shadow-none max-[389px]:border-x-0">
          <div className="flex justify-between items-start mb-4 max-[389px]:flex-col max-[389px]:gap-2">
            <div className="flex items-center gap-3 max-[389px]:w-full max-[389px]:justify-between">
              <div className="h-4 bg-gray-200 rounded w-24 max-[389px]:w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-16 max-[389px]:w-12"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20 max-[389px]:w-16"></div>
            </div>
            <div className="text-right max-[389px]:w-full max-[389px]:text-left">
              <div className="h-4 bg-gray-200 rounded w-16 mb-1 max-[389px]:w-12"></div>
              <div className="h-4 bg-gray-200 rounded w-24 max-[389px]:w-16"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-4 max-[389px]:gap-3">
            <div className="w-16 h-16 bg-gray-200 rounded-lg max-[389px]:w-12 max-[389px]:h-12"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 max-[389px]:w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 max-[389px]:w-3/4"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t max-[389px]:flex-col max-[389px]:gap-3 max-[389px]:pt-3">
            <div className="flex gap-4 max-[389px]:w-full max-[389px]:gap-2">
              <div className="h-4 bg-gray-200 rounded w-20 max-[389px]:w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-24 max-[389px]:w-20"></div>
            </div>
            <div className="flex items-center gap-4 max-[389px]:w-full max-[389px]:justify-between max-[389px]:gap-2">
              <div className="text-right max-[389px]:text-left">
                <div className="h-4 bg-gray-200 rounded w-16 mb-1 max-[389px]:w-12"></div>
                <div className="h-5 bg-gray-200 rounded w-20 max-[389px]:w-16"></div>
              </div>
              <div className="flex gap-2 max-[389px]:gap-1">
                <div className="h-8 bg-gray-200 rounded w-20 max-[389px]:w-16 max-[389px]:h-6"></div>
                <div className="h-8 bg-gray-200 rounded w-16 max-[389px]:w-14 max-[389px]:h-6"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="text-center py-16 max-[389px]:py-8">
      <div className="mx-auto w-32 h-32 mb-6 max-[389px]:w-24 max-[389px]:h-24 max-[389px]:mb-4">
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
                <div class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center max-[389px]:w-24 max-[389px]:h-24">
                  <svg class="w-16 h-16 text-gray-400 max-[389px]:w-12 max-[389px]:h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
                  </svg>
                </div>
              `;
            }
          }}
        />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2 max-[389px]:text-base">Chưa có đơn hàng</h3>
      <p className="text-gray-600 mb-6 max-[389px]:text-sm max-[389px]:mb-4">
        Bạn chưa có đơn hàng nào. Hãy khám phá và mua sắm ngay!
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors max-[389px]:px-4 max-[389px]:py-2 max-[389px]:text-sm"
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

