import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
// import type { CartItem } from '../contexts/CartContext';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    items, 
    totalItems, 
    totalPrice, 
    loading,
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 max-[389px]:bg-white py-8 max-[389px]:py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 max-[389px]:px-3">
            <div className="text-center py-16 max-[389px]:py-8">
              <ShoppingBag className="mx-auto h-24 w-24 max-[389px]:h-16 max-[389px]:w-16 text-gray-300 mb-8 max-[389px]:mb-4" />
              <h2 className="text-2xl max-[389px]:text-xl font-bold text-gray-900 mb-4 max-[389px]:mb-3">
                Giỏ hàng của bạn đang trống
              </h2>
              <p className="text-gray-600 mb-8 max-[389px]:mb-6 max-[389px]:text-sm">
                Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
              </p>
              <Button onClick={handleContinueShopping} className="px-8 py-3 max-[389px]:px-6 max-[389px]:py-2 max-[389px]:text-sm">
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        </div>
        {/* Footer - Hidden on mobile */}
        <div className="hidden min-[390px]:block">
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 max-[389px]:bg-white py-8 max-[389px]:py-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 max-[389px]:px-0 max-[389px]:max-w-none">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 max-[389px]:mb-4 max-[389px]:px-3 max-[389px]:py-3 max-[389px]:border-b max-[389px]:border-gray-200 max-[389px]:bg-white">
            <div className="flex items-center gap-4 max-[389px]:gap-2">
              <button
                onClick={handleContinueShopping}
                className="flex items-center gap-2 max-[389px]:gap-1 text-blue-600 hover:text-blue-800 transition-colors max-[389px]:text-sm"
              >
                <ArrowLeft className="h-5 w-5 max-[389px]:h-4 max-[389px]:w-4" />
                <span className="max-[389px]:hidden">Tiếp tục mua sắm</span>
              </button>
              <h1 className="text-2xl max-[389px]:text-lg font-bold text-gray-900">
                Giỏ hàng <span className="max-[389px]:hidden">({totalItems} sản phẩm)</span>
                <span className="hidden max-[389px]:inline">({totalItems})</span>
              </h1>
            </div>
            
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-2 max-[389px]:gap-1 text-red-600 hover:text-red-800 transition-colors max-[389px]:text-sm"
              >
                <Trash2 className="h-4 w-4 max-[389px]:h-3 max-[389px]:w-3" />
                <span className="max-[389px]:hidden">Xóa tất cả</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-[389px]:gap-0 max-[389px]:block">
            {/* Component hiển thị danh sách sản phẩm - Bên trái */}
            <div className="lg:col-span-2 max-[389px]:mb-20">
              <Card className="p-6 max-[389px]:p-0 max-[389px]:shadow-none max-[389px]:border-none max-[389px]:rounded-none max-[389px]:bg-transparent">
                <div className="mb-6 max-[389px]:mb-3 max-[389px]:px-3">
                  <h2 className="text-xl max-[389px]:text-lg font-bold text-gray-900">
                    Tất cả ({totalItems} sản phẩm)
                  </h2>
                </div>
                
                {loading && (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Đang tải giỏ hàng...</p>
                  </div>
                )}
                
                {!loading && (
                  <div className="space-y-4 max-[389px]:space-y-0">
                    {/* Header của bảng - Hidden on mobile */}
                    <div className="hidden min-[390px]:grid grid-cols-12 gap-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-700">
                      <div className="col-span-5">Sản phẩm</div>
                      <div className="col-span-2 text-center">Đơn giá</div>
                      <div className="col-span-2 text-center">Số lượng</div>
                      <div className="col-span-2 text-center">Thành tiền</div>
                      <div className="col-span-1 text-center">Thao tác</div>
                    </div>
                    
                    {/* Danh sách sản phẩm */}
                    {items.map((item: any) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center max-[389px]:grid-cols-1 max-[389px]:gap-3 max-[389px]:p-3 max-[389px]:border-b-2 max-[389px]:border-gray-100 max-[389px]:bg-white max-[389px]:mx-3 max-[389px]:rounded-lg max-[389px]:shadow-sm max-[389px]:mb-3">
                        {/* Thông tin sản phẩm */}
                        <div className="col-span-5 flex items-center gap-3 max-[389px]:col-span-1 max-[389px]:gap-3">
                          <div className="w-16 h-16 max-[389px]:w-20 max-[389px]:h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image || '/placeholder-product.jpg'}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-product.jpg';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm max-[389px]:text-base font-medium text-gray-900 truncate max-[389px]:line-clamp-2 max-[389px]:whitespace-normal">
                              {item.name}
                            </h3>
                          </div>
                        </div>
                        
                        {/* Đơn giá */}
                        <div className="col-span-2 text-center max-[389px]:hidden">
                          <span className="text-sm font-medium text-gray-900">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        
                        {/* Số lượng và giá trên mobile */}
                        <div className="col-span-2 flex items-center justify-center gap-2 max-[389px]:col-span-1 max-[389px]:justify-between max-[389px]:mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="w-6 h-6 max-[389px]:w-8 max-[389px]:h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="h-3 w-3 max-[389px]:h-4 max-[389px]:w-4" />
                            </button>
                            
                            <span className="text-sm max-[389px]:text-base font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 max-[389px]:w-8 max-[389px]:h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-3 w-3 max-[389px]:h-4 max-[389px]:w-4" />
                            </button>
                          </div>

                          {/* Price and total on mobile */}
                          <div className="hidden max-[389px]:block text-right">
                            <div className="text-sm text-gray-600">
                              {formatPrice(item.price)} x {item.quantity}
                            </div>
                            <div className="text-base font-bold text-red-600">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>

                          {/* Delete button on mobile */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors hidden max-[389px]:block"
                            title="Xóa sản phẩm"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                        
                        {/* Thành tiền - Desktop only */}
                        <div className="col-span-2 text-center hidden min-[390px]:block">
                          <span className="text-sm font-bold text-red-600">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                        
                        {/* Nút xóa - Desktop only */}
                        <div className="col-span-1 text-center hidden min-[390px]:block">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                            title="Xóa sản phẩm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Component tổng tiền - Bên phải */}
            <div className="lg:col-span-1 max-[389px]:fixed max-[389px]:bottom-0 max-[389px]:left-0 max-[389px]:right-0 max-[389px]:z-50 max-[389px]:bg-white max-[389px]:border-t max-[389px]:border-gray-200 max-[389px]:shadow-lg">
              <Card className="p-6 max-[389px]:p-4 sticky top-4 max-[389px]:static max-[389px]:shadow-none max-[389px]:border-none max-[389px]:rounded-none">
                <h2 className="text-lg max-[389px]:text-base font-bold text-gray-900 mb-6 max-[389px]:mb-3">
                  Tổng tiền
                </h2>
                
                <div className="space-y-4 mb-6 max-[389px]:space-y-2 max-[389px]:mb-4">
                  <div className="flex justify-between text-sm max-[389px]:text-sm">
                    <span className="text-gray-600">
                      Tạm tính ({totalItems} sản phẩm)
                    </span>
                    <span className="font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm max-[389px]:hidden">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>
                  
                  <div className="flex justify-between text-sm max-[389px]:hidden">
                    <span className="text-gray-600">Giảm giá</span>
                    <span className="font-medium">
                      {formatPrice(0)}
                    </span>
                  </div>
                  
                  <div className="border-t pt-4 max-[389px]:pt-2">
                    <div className="flex justify-between text-lg max-[389px]:text-base font-bold">
                      <span>Tổng cộng</span>
                      <span className="text-red-600">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 max-[389px]:mb-0">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full py-3 max-[389px]:py-3 text-lg max-[389px]:text-base bg-red-600 hover:bg-red-700"
                  >
                    Mua hàng ({totalItems})
                  </Button>
                </div>

              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* Footer - Hidden on mobile */}
      <div className="hidden min-[390px]:block">
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
