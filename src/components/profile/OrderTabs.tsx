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
    <div className="border rounded-lg overflow-hidden">
      <div className="flex border-b bg-gray-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex-1 px-4 py-3 text-sm font-medium text-center border-b-2 transition-colors
              ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }
            `}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span className={`
                ml-2 px-2 py-1 text-xs rounded-full
                ${activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
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
