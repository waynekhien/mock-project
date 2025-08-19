import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliveryProvider } from '../contexts/DeliveryContext';
import { useCart } from '../contexts/CartContext';
import { useDelivery } from '../contexts/DeliveryContext';
import { OrderSuccessMain, OrderSuccessInfo } from '../components/checkout';

const OrderSuccessContent: React.FC = () => {
  const navigate = useNavigate();
  const { clearCart, totalPrice } = useCart();
  const { getDeliveryFee, getDeliveryDiscount } = useDelivery();

  // Calculate total price including delivery fees
  const shippingFee = getDeliveryFee();
  const shippingDiscount = getDeliveryDiscount();
  const finalTotal = totalPrice + shippingFee + shippingDiscount;

  // Generate realistic order ID based on current timestamp and total
  const timestamp = Date.now();
  const orderIdSuffix = (finalTotal.toString().slice(-3) + Math.floor(Math.random() * 100).toString().padStart(2, '0'));
  const orderId = `TK${timestamp.toString().slice(-8)}${orderIdSuffix}`;
  const orderDate = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric'
  });

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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left column - OrderSuccessMain chiếm 3/4 diện tích */}
            <div className="lg:col-span-3">
              <OrderSuccessMain 
                totalPrice={finalTotal}
                paymentMethod="Thanh toán tiền mặt"
                onBackToHome={handleBackToHome}
              />
            </div>
            
            {/* Right column - OrderSuccessInfo chiếm 1/4 diện tích */}
            <div className="lg:col-span-1">
              <OrderSuccessInfo orderId={orderId} orderDate={orderDate} />
            </div>
          </div>
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
  return (
    <DeliveryProvider>
      <OrderSuccessContent />
    </DeliveryProvider>
  );
};

export default OrderSuccess;
