import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface PaymentContextType {
  selectedPayment: string;
  setSelectedPayment: (payment: string) => void;
  getPaymentMethodName: () => string;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('cash');

  const getPaymentMethodName = () => {
    switch (selectedPayment) {
      case 'cash':
        return 'Thanh toán tiền mặt';
      case 'bank_transfer':
        return 'Thanh toán bằng thẻ/chuyển khoản';
      default:
        return 'Thanh toán tiền mặt';
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        selectedPayment,
        setSelectedPayment,
        getPaymentMethodName
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
