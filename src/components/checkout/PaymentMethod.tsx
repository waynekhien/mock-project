import React, { useState } from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import { usePayment } from '../../contexts/PaymentContext';

interface PaymentOption {
  id: string;
  name: string;
  description?: string;
  icon: React.ReactNode;
  type: 'cash' | 'card' | 'ewallet';
}

interface InstallmentOption {
  id: string;
  name: string;
  bank: string;
  minAmount: number;
  description: string;
  logo: string;
}

const PaymentMethod: React.FC = () => {
  const { selectedPayment, setSelectedPayment } = usePayment();
  const [showInstallments, setShowInstallments] = useState(false);

  const paymentOptions: PaymentOption[] = [
    {
      id: 'cash',
      name: 'Thanh toán tiền mặt',
      icon: <CreditCard className="w-5 h-5 text-blue-500" />,
      type: 'cash'
    },
    {
      id: 'bank_transfer',
      name: 'Thanh toán bằng thẻ/chuyển khoản',
      icon: <Smartphone className="w-5 h-5 text-red-500" />,
      type: 'ewallet'
    }
  ];

  const installmentOptions: InstallmentOption[] = [
    {
      id: 'shinhan-platinum',
      name: 'Freeship',
      bank: 'Shinhan Bank',
      minAmount: 0,
      description: 'Thẻ Shinhan Platinum - Không giới hạn',
      logo: '/shinhan-logo.png'
    },
    {
      id: 'shinhan-classic',
      name: 'Freeship',
      bank: 'Shinhan Bank', 
      minAmount: 0,
      description: 'Thẻ Shinhan Classic - Không giới hạn',
      logo: '/shinhan-logo.png'
    },
    {
      id: 'discount-30k-200k',
      name: 'Giảm 30k',
      bank: 'Shinhan Bank',
      minAmount: 200000,
      description: 'Đơn từ 200k - Không giới hạn',
      logo: '/shinhan-logo.png'
    },
    {
      id: 'discount-50k-300k',
      name: 'Giảm 50k',
      bank: 'Shinhan Bank',
      minAmount: 300000,
      description: 'Đơn từ 300k - Không giới hạn',
      logo: '/shinhan-logo.png'
    },
    {
      id: 'discount-70k-500k',
      name: 'Giảm 70k',
      bank: 'Shinhan Bank',
      minAmount: 500000,
      description: 'Đơn từ 500k - Không giới hạn',
      logo: '/shinhan-logo.png'
    },
    {
      id: 'discount-100k-700k',
      name: 'Giảm 100k',
      bank: 'Shinhan Bank',
      minAmount: 700000,
      description: 'Đơn từ 700k - Không giới hạn',
      logo: '/shinhan-logo.png'
    },
    {
      id: 'discount-150k-1m',
      name: 'Giảm 150k',
      bank: 'Shinhan Bank',
      minAmount: 1000000,
      description: 'Đơn từ 1 triệu - Không giới hạn',
      logo: '/shinhan-logo.png'
    },
    {
      id: 'discount-30k-200k-2',
      name: 'Giảm 30k',
      bank: 'Shinhan Bank',
      minAmount: 200000,
      description: 'Đơn từ 200k - Không giới hạn',
      logo: '/shinhan-logo.png'
    },
    {
      id: 'discount-50k-300k-2',
      name: 'Giảm 50k',
      bank: 'Shinhan Bank',
      minAmount: 300000,
      description: 'Đơn từ 300k - Không giới hạn',
      logo: '/shinhan-logo.png'
    },
    {
      id: 'discount-70k-500k-2',
      name: 'Giảm 70k',
      bank: 'Shinhan Bank',
      minAmount: 500000,
      description: 'Đơn từ 500k - Không giới hạn',
      logo: '/shinhan-logo.png'
    },
    {
      id: 'tikicard-freeship',
      name: 'Freeship',
      bank: 'TiKiCARD',
      minAmount: 0,
      description: 'TiKiCARD - Không giới hạn',
      logo: '/tiki-logo.png'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Chọn hình thức thanh toán</h2>
      
      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`relative p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedPayment === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPayment(option.id)}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={selectedPayment === option.id}
                onChange={() => setSelectedPayment(option.id)}
                className="w-4 h-4 text-blue-600"
              />
              <div className="flex items-center space-x-2">
                {option.icon}
                <span className="font-medium text-gray-900">{option.name}</span>
              </div>
            </div>
            {option.description && (
              <p className="text-sm text-gray-600 mt-1 ml-7">{option.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Installment Options */}
      <div className="border-t pt-6">
        <button
          onClick={() => setShowInstallments(!showInstallments)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <CreditCard className="w-4 h-4" />
          <span>Ưu đãi thanh toán thẻ</span>
        </button>

        {showInstallments && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {installmentOptions.map((option) => (
              <div
                key={option.id}
                className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-600">{option.name}</span>
                  <img
                    src={option.logo}
                    alt={option.bank}
                    className="h-6 w-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600">{option.description}</p>
                <p className="text-xs text-orange-500 mt-1">Không giới hạn</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
