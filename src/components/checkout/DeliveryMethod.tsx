import React from 'react';
import { Truck } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useDelivery } from '../../contexts/DeliveryContext';

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  estimatedTime: string;
  icon: React.ReactNode;
}

const DeliveryMethod: React.FC = () => {
  const { selectedDelivery, setSelectedDelivery } = useDelivery();
  const { items } = useCart();

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'now',
      name: 'Giao siêu tốc 2h',
      description: 'Giao siêu tốc 2h, trước 13h hôm nay',
      price: 25000,
      discount: 25000,
      estimatedTime: '2h',
      icon: <img src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png" alt="NOW" className="w-8 h-5" />
    },
    {
      id: 'standard',
      name: 'Giao tiết kiệm',
      description: 'Giao hàng tiêu chuẩn',
      price: 16000,
      discount: 16000,
      estimatedTime: '1-2 ngày',
      icon: <Truck className="w-5 h-5 text-blue-500" />
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Chọn hình thức giao hàng</h2>
      
      <div className="space-y-3">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            className={`relative p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedDelivery === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedDelivery(option.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={selectedDelivery === option.id}
                  onChange={() => setSelectedDelivery(option.id)}
                  className="w-4 h-4 text-blue-600"
                />
                <div className="flex items-center space-x-2">
                  {option.icon}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{option.name}</span>
                      {option.discount && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                          -{formatPrice(option.discount).replace('đ', 'K')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex flex-col items-end">
                  {/* <span className="text-sm text-gray-500 line-through">
                    {(option.price / 1000).toFixed(0)}K
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(selectedDelivery === 'now' || selectedDelivery === 'standard') && (
        <div className="mt-4 border border-green-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-50 p-3 border-b border-green-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700 font-medium">
                {selectedDelivery === 'now' 
                  ? 'Gói: Giao siêu tốc 2h, trước 13h hôm nay'
                  : 'Gói: Giao tiết kiệm, 1-2 ngày'
                }
              </span>
            </div>
          </div>
          
          {/* Product details */}
          {items.length > 0 && (
            <div className="bg-white">
              {/* Shipping info - only show once */}
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {selectedDelivery === 'now' ? (
                      <>
                        <span className="text-red-500 font-bold text-sm">NOW</span>
                        <span className="text-sm text-gray-600">GIAO SIÊU TỐC 2H</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">25.000 đ</span>
                          <span className="text-sm font-medium text-green-600">MIỄN PHÍ</span>
                          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs text-blue-600">?</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-blue-500 font-bold text-sm">STANDARD</span>
                        <span className="text-sm text-gray-600">GIAO TIẾT KIỆM</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">16.000 đ</span>
                          <span className="text-sm font-medium text-green-600">MIỄN PHÍ</span>
                          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs text-blue-600">?</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Products list */}
              {items.map((item) => (
                <div key={item.id} className="p-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-600">SL: x{item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-col items-end">
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                        <span className="text-sm font-bold text-red-600">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryMethod;
