import React, { useState } from 'react';
import { ShoppingCart, Minus, Plus, CreditCard } from 'lucide-react';
import Button from '../../ui/Button';

interface PurchaseSectionProps {
  onAddToCart: (quantity: number) => void;
  onBuyNow: (quantity: number) => void;
  price: number;
  formatPrice: (price: number) => string;
}

const PurchaseSection: React.FC<PurchaseSectionProps> = ({
  onAddToCart,
  onBuyNow,
  price,
  formatPrice
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  const handleBuyNow = () => {
    onBuyNow(quantity);
  };

  const totalPrice = price * quantity;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900 min-w-[80px]">Số lượng:</span>
            <div className="flex items-center border rounded-lg bg-white">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 min-w-[60px] text-center border-x font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-50 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tạm tính */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tạm tính:</span>
              <span className="text-lg font-semibold text-red-600">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={handleBuyNow}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold transition-all hover:shadow-lg transform hover:scale-105"
            >
              Mua ngay
            </Button>
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold transition-all hover:shadow-lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Thêm vào giỏ
            </Button>
            <Button
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold transition-all hover:shadow-lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Mua trước trả sau
            </Button>
            
          </div>
        </div>

        {/* Delivery and Services Information
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center space-x-3 text-sm">
            <Truck className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-900">Miễn phí vận chuyển</span>
              <span className="text-gray-600 ml-1">cho đơn hàng từ 149k</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-900">Giao hàng nhanh</span>
              <span className="text-gray-600 ml-1">trong 2-3 ngày</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <RotateCcw className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-900">Đổi trả miễn phí</span>
              <span className="text-gray-600 ml-1">trong 30 ngày</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <CreditCard className="w-5 h-5 text-purple-600 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-900">Trả góp 0%</span>
              <span className="text-gray-600 ml-1">qua thẻ tín dụng</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PurchaseSection;

