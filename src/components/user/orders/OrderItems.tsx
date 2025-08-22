import React from 'react';
import { Package, RotateCcw, X, Calculator, Truck, Tag, DollarSign } from 'lucide-react';
import type { Order } from '../../../types';

interface OrderItemsProps {
  order: Order;
  onCancelOrder?: () => void;
}

const OrderItems: React.FC<OrderItemsProps> = ({ order, onCancelOrder }) => {
  const calculateSubtotal = () => {
    return order.items.reduce((sum, item) => sum + item.total, 0);
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="bg-white border rounded-lg">
      {/* Header */}
      <div className="border-b p-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          Sản phẩm
        </h3>
      </div>

      {/* Table Header */}
      <div className="border-b bg-gray-50">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-700">
          <div className="col-span-5">Sản phẩm</div>
          <div className="col-span-2 text-center">Giá</div>
          <div className="col-span-1 text-center">Số lượng</div>
          <div className="col-span-2 text-center">Giảm giá</div>
          <div className="col-span-2 text-center">Tạm tính</div>
        </div>
      </div>

      {/* Items List */}
      <div>
        {order.items.map((item, index) => (
          <div key={index} className="border-b last:border-b-0">
            {/* Main Row */}
            <div className="grid grid-cols-12 gap-4 p-4 items-center">
              {/* Product Info */}
              <div className="col-span-5 flex gap-3">
                <img
                  src={item.productImage || '/placeholder-book.jpg'}
                  alt={item.productName}
                  className="w-16 h-16 rounded-lg object-cover bg-gray-100 border flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-book.jpg';
                  }}
                />
                <div className="min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    {item.productName}
                  </h4>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center">
                <span className="text-sm font-medium text-gray-900">
                  {item.price.toLocaleString('vi-VN')} ₫
                </span>
              </div>

              {/* Quantity */}
              <div className="col-span-1 text-center">
                <span className="text-sm text-gray-900">
                  {item.quantity}
                </span>
              </div>

              {/* Discount */}
              <div className="col-span-2 text-center">
                <span className="text-sm text-gray-900">
                  {(() => {
                    const originalPrice = item.originalPrice || item.price;
                    const discount = (originalPrice - item.price) * item.quantity;
                    return discount > 0 ? `-${discount.toLocaleString('vi-VN')} ₫` : '0 ₫';
                  })()}
                </span>
              </div>

              {/* Subtotal */}
              <div className="col-span-2 text-center">
                <span className="text-sm font-semibold text-gray-900">
                  {item.total.toLocaleString('vi-VN')} ₫
                </span>
              </div>
            </div>

            {/* Details Row */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-4 text-xs">
                {/* 30 Day Return Badge */}
                <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  <RotateCcw className="w-3 h-3" />
                  30 NGÀY ĐỔI TRẢ
                </div>

                {/* SKU */}
                <span className="text-gray-500">
                  Sku: {item.productId || '983107424927'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary - Căn phải */}
      <div className="border-t p-4">
        <div className="flex justify-end">
          <div className="w-80 space-y-3">
            {/* Tạm tính */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Tạm tính
              </span>
              <span className="text-gray-900 font-medium">{subtotal.toLocaleString('vi-VN')} ₫</span>
            </div>

            {/* Phí vận chuyển */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Phí vận chuyển
              </span>
              {subtotal >= 150000 ? (
                <span className="text-green-600 font-medium">Miễn phí</span>
              ) : (
                <span className="text-gray-900 font-medium">25.000 ₫</span>
              )}
            </div>

            {/* Giảm giá vận chuyển - chỉ hiện khi có miễn phí */}
            {subtotal >= 150000 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Giảm giá vận chuyển
                </span>
                <span className="text-green-600 font-medium">-25.000 ₫</span>
              </div>
            )}

            {/* Đường kẻ ngăn cách */}
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Tổng cộng
                </span>
                <span className="text-xl font-bold text-red-600">
                  {order.totalAmount.toLocaleString('vi-VN')} ₫
                </span>
              </div>
            </div>

            {/* Action Button - Nằm dưới tổng cộng */}
            {order.status === 'pending' && (
              <div className="pt-4">
                <button
                  onClick={onCancelOrder}
                  className="w-full bg-yellow-500 text-white font-medium py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Huỷ đơn hàng
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;

