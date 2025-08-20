import React from 'react';
import { DeliveryMethod, PaymentMethod, DeliveryAddress, OrderSummary } from '../components/checkout';
import { DeliveryProvider } from '../contexts/DeliveryContext';
import { PaymentProvider } from '../contexts/PaymentContext';

const Checkout: React.FC = () => {
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
              <span className="text-lg font-medium text-gray-800">Thanh toán</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <PaymentProvider>
            <DeliveryProvider>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - Delivery method and Payment method */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Delivery Method - Top */}
                  <DeliveryMethod />

                  {/* Payment Method - Below delivery method */}
                  <PaymentMethod />
                </div>

                {/* Right column - Delivery address and Order summary */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Delivery Address - Top right */}
                  <DeliveryAddress />

                  {/* Order Summary - Bottom right */}
                  <OrderSummary />
                </div>
              </div>
            </DeliveryProvider>
          </PaymentProvider>
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

export default Checkout;
