import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleQuantityUpdate = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-sky-600" />
                <h2 className="text-lg font-semibold">Giỏ hàng</h2>
                {totalItems > 0 && (
                  <span className="bg-sky-100 text-sky-600 text-sm px-2 py-1 rounded-full">
                    {totalItems} sản phẩm
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 flex flex-col">
              {items.length === 0 ? (
                <div className="flex-1 flex items-center justify-center flex-col p-8">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">
                    Giỏ hàng trống
                  </h3>
                  <p className="text-gray-400 text-center">
                    Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
                  </p>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.map((item) => {
                      console.log('Cart item:', item); // Debug log
                      return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={item.image || '/placeholder-book.svg'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0 bg-gray-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-book.svg';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 line-clamp-2">
                            {item.name}
                          </h4>
                          {/* Hiển thị giá sau khi giảm (finalPrice) trước */}
                          <div className="mt-1">
                            <p className="text-sky-600 font-semibold text-sm">
                              {formatPrice(item.price)} {/* Giá cuối cùng (sau giảm) */}
                            </p>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <div className="flex items-center gap-2">
                                <p className="text-xs text-gray-500 line-through">
                                  {formatPrice(item.originalPrice)} {/* Giá gốc */}
                                </p>
                                <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">
                                  -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <div className="flex items-center gap-1 bg-white rounded border">
                            <button
                              onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                      )
                    })}
                  </div>

                  {/* Footer */}
                  <div className="border-t bg-white p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Tổng cộng:</span>
                      <span className="text-xl font-bold text-sky-600">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-sky-600 text-white py-3 rounded-lg font-medium hover:bg-sky-700 transition-colors"
                      >
                        Thanh toán
                      </button>
                      <button
                        onClick={clearCart}
                        className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
