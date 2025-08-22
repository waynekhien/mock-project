import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { OrderSuccessMain, OrderSuccessInfo } from '../components/user/checkout';
import { ordersApi } from '../services/api';
import type { Order } from '../types';

const OrderSuccessContent: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get orderId from URL params
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('Không tìm thấy mã đơn hàng');
        setLoading(false);
        return;
      }

      try {
        const orderData = await ordersApi.getById(orderId);
        setOrder(orderData);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError('Không thể tải thông tin đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleBackToHome = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="w-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm py-2 text-center">
        Freeship đơn từ 45k, giảm nhiều hơn cùng{" "}
        <span className="font-semibold">FREESHIP XTRA</span>
      </div>
      {/* Header theo thiết kế Tiki */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="logo">
                <a href="/">
                  <img 
                    src="https://salt.tikicdn.com/ts/upload/c1/64/f7/4e6e925ea554fc698123ea71ed7bda26.png" 
                    alt="tiki-logo" 
                    width="72" 
                    height="72"
                    className="w-18 h-18"
                  />
                </a>
              </div>
              <span className="w-px h-8 bg-gray-300"></span>
              <span className="text-lg font-medium text-gray-800">Đặt hàng thành công</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Đang tải thông tin đơn hàng...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-red-500 text-lg">{error}</div>
            </div>
          ) : order ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - OrderSuccessMain chiếm 2/3 diện tích */}
              <div className="lg:col-span-2">
                <OrderSuccessMain
                  totalPrice={order.totalAmount}
                  paymentMethod={order.paymentMethodDisplay || (order.paymentMethod === 'cash' ? 'Thanh toán tiền mặt' : 'Thanh toán bằng thẻ/chuyển khoản')}
                  deliveryMethod={order.deliveryMethod}
                  deliveryTime={order.deliveryTime}
                  onBackToHome={handleBackToHome}
                />
              </div>

              {/* Right column - OrderSuccessInfo chiếm 1/3 diện tích */}
              <div className="lg:col-span-1">
                <OrderSuccessInfo
                  orderId={order.id.toString()}
                  orderDate={new Date(order.createdAt || Date.now()).toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric'
                  })}
                  order={order}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Không tìm thấy thông tin đơn hàng</div>
            </div>
          )}
        </div>
      </div>

      {/* Footer theo thiết kế Tiki */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-sm text-gray-600 mb-3">
            Bằng việc tiến hành Đặt Mua, bạn đồng ý với các Điều kiện Giao dịch chung:
          </p>
          <div className="flex flex-wrap items-center space-x-1 text-sm">
            <a href="https://tiki.vn/quy-che-hoat-dong-sgdtmdt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Quy chế hoạt động
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://hotro.tiki.vn/knowledge-base/post/778-chinh-sach-giai-quyet-khieu-nai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Chính sách giải quyết khiếu nại
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://hotro.tiki.vn/knowledge-base/post/772-chinh-sach-bao-hanh-tai-tiki-nhu-the-nao?" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Chính sách bảo hành
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://tiki.vn/bao-mat-thanh-toan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Chính sách bảo mật thanh toán
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://tiki.vn/bao-mat-thong-tin-ca-nhan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Chính sách bảo mật thông tin cá nhân
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            © 2019 - Bản quyền của Công Ty Cổ Phần Ti Ki - Tiki.vn
          </p>
        </div>
      </footer>
    </div>
  );
};

const OrderSuccess: React.FC = () => {
  return <OrderSuccessContent />;
};

export default OrderSuccess;
