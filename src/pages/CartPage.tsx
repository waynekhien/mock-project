import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import type { CartItem } from '../contexts/CartContext';
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
    // Navigate to checkout page (you can implement this later)
    alert('Chức năng thanh toán đang được phát triển');
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
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-8" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Giỏ hàng của bạn đang trống
              </h2>
              <p className="text-gray-600 mb-8">
                Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
              </p>
              <Button onClick={handleContinueShopping} className="px-8 py-3">
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={handleContinueShopping}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Tiếp tục mua sắm
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Giỏ hàng ({totalItems} sản phẩm)
              </h1>
            </div>
            
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Xóa tất cả
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Component hiển thị danh sách sản phẩm - Bên trái */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
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
                  <div className="space-y-4">
                    {/* Header của bảng */}
                    <div className="grid grid-cols-12 gap-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-700">
                      <div className="col-span-5">Sản phẩm</div>
                      <div className="col-span-2 text-center">Đơn giá</div>
                      <div className="col-span-2 text-center">Số lượng</div>
                      <div className="col-span-2 text-center">Thành tiền</div>
                      <div className="col-span-1 text-center">Thao tác</div>
                    </div>
                    
                    {/* Danh sách sản phẩm */}
                    {items.map((item: any) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center">
                        {/* Thông tin sản phẩm */}
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
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
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {item.name}
                            </h3>
                          </div>
                        </div>
                        
                        {/* Đơn giá */}
                        <div className="col-span-2 text-center">
                          <span className="text-sm font-medium text-gray-900">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        
                        {/* Số lượng */}
                        <div className="col-span-2 flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          
                          <span className="text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        {/* Thành tiền */}
                        <div className="col-span-2 text-center">
                          <span className="text-sm font-bold text-red-600">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                        
                        {/* Nút xóa */}
                        <div className="col-span-1 text-center">
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
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Tổng tiền
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Tạm tính ({totalItems} sản phẩm)
                    </span>
                    <span className="font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Giảm giá</span>
                    <span className="font-medium">
                      {formatPrice(0)}
                    </span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng</span>
                      <span className="text-red-600">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full py-3 text-lg bg-red-600 hover:bg-red-700"
                  >
                    Mua hàng ({totalItems})
                  </Button>
                </div>

              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
