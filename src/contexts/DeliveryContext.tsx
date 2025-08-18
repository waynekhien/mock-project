import React, { createContext, useContext, useState } from 'react';

interface DeliveryContextType {
  selectedDelivery: string;
  setSelectedDelivery: (delivery: string) => void;
  getDeliveryFee: () => number;
  getDeliveryDiscount: () => number;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
};

export const DeliveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDelivery, setSelectedDelivery] = useState<string>('now');

  const getDeliveryFee = () => {
    switch (selectedDelivery) {
      case 'now':
        return 25000;
      case 'standard':
        return 16000;
      default:
        return 0;
    }
  };

  const getDeliveryDiscount = () => {
    // Miễn phí vận chuyển cho cả hai loại
    return -getDeliveryFee();
  };

  return (
    <DeliveryContext.Provider value={{
      selectedDelivery,
      setSelectedDelivery,
      getDeliveryFee,
      getDeliveryDiscount
    }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryProvider;
