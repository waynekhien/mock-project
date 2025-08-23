import React from 'react';

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  orderCounts?: {
    all: number;
    pending: number;
    processing: number;
    shipping: number;
    delivered: number;
    cancelled: number;
  };
}

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, onTabChange, orderCounts }) => {
  const tabs = [
    { id: 'all', label: 'Tất cả đơn', count: orderCounts?.all },
    { id: 'pending', label: 'Chờ thanh toán', count: orderCounts?.pending },
    { id: 'processing', label: 'Đang xử lý', count: orderCounts?.processing },
    { id: 'shipping', label: 'Đang vận chuyển', count: orderCounts?.shipping },
    { id: 'delivered', label: 'Đã giao', count: orderCounts?.delivered },
    { id: 'cancelled', label: 'Đã huỷ', count: orderCounts?.cancelled },
  ];

  return (
    <div className="border rounded-lg overflow-hidden max-[389px]:border-none max-[389px]:rounded-none">
      <div className="flex border-b bg-gray-50 max-[389px]:overflow-x-auto max-[389px]:scrollbar-hide max-[389px]:bg-white max-[389px]:border-b-0 max-[389px]:px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 px-4 py-3 text-sm font-medium text-center border-b-2 transition-colors whitespace-nowrap
              max-[389px]:flex-none max-[389px]:px-3 max-[389px]:py-2 max-[389px]:text-xs max-[389px]:border-b-0
              max-[389px]:bg-gray-100 max-[389px]:rounded-full max-[389px]:mr-2 max-[389px]:border-0
              ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600 bg-blue-50 max-[389px]:bg-blue-100 max-[389px]:text-blue-700'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 max-[389px]:text-gray-700 max-[389px]:hover:bg-gray-200'
              }
            `}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span className={`
                ml-2 px-2 py-1 text-xs rounded-full max-[389px]:ml-1 max-[389px]:px-1 max-[389px]:text-xs
                ${activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600 max-[389px]:bg-blue-200'
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderTabs;

