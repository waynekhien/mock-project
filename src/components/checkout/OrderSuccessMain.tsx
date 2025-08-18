import React from 'react';

interface OrderSuccessMainProps {
  totalPrice: number;
  paymentMethod: string;
  onBackToHome: () => void;
}

const OrderSuccessMain: React.FC<OrderSuccessMainProps> = ({ 
  totalPrice, 
  paymentMethod, 
  onBackToHome 
}) => {

  return (
    <div className="w-full h-full">
      {/* Main Content - All in one box */}
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden h-full">
          {/* Success Header with Gradient - Inside the box */}
          <div className="relative bg-gradient-to-r from-cyan-400 to-blue-500 text-white overflow-hidden p-8">
            {/* Confetti animations */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Various confetti elements */}
              <div className="absolute top-4 left-1/4 w-2 h-2 bg-yellow-300 rounded animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-8 right-1/4 w-1 h-4 bg-orange-400 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-12 left-1/3 w-3 h-1 bg-pink-400 rounded animate-bounce" style={{animationDelay: '0.8s'}}></div>
              <div className="absolute top-6 right-1/3 w-2 h-2 bg-green-400 rounded animate-pulse" style={{animationDelay: '1.1s'}}></div>
              <div className="absolute top-10 left-1/5 w-1 h-3 bg-purple-400 rounded animate-bounce" style={{animationDelay: '1.4s'}}></div>
              <div className="absolute top-4 right-1/5 w-2 h-1 bg-red-400 rounded animate-pulse" style={{animationDelay: '1.7s'}}></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-6">
                {/* Success Character */}
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  {/* Character decorations */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-orange-400 rounded-full animate-bounce"></div>
                </div>

                {/* Success Message */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-2">Yay, đặt hàng thành công!</h1>
                  <p className="text-xl text-blue-100">Chuẩn bị tiền mặt {totalPrice.toLocaleString('vi-VN')} ₫</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information - Below the gradient header */}
          <div className="p-8">
            {/* Payment Method Row */}
            <div className="flex justify-between items-center py-4 border-b">
              <span className="text-gray-600 text-lg">Phương thức thanh toán</span>
              <span className="font-medium text-lg">{paymentMethod}</span>
            </div>

            {/* Total Row */}
            <div className="flex justify-between items-center py-6">
              <span className="text-gray-600 text-lg">Tổng cộng</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {totalPrice.toLocaleString('vi-VN')} ₫
                </div>
                <div className="text-sm text-gray-500">(Đã bao gồm VAT nếu có)</div>
              </div>
            </div>

            {/* Back to Home Button */}
            <button 
              onClick={onBackToHome}
              className="w-full mt-6 py-4 px-6 bg-white border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-lg"
            >
              Quay về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessMain;
