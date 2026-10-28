import React, { createContext, useContext, useState } from 'react';

const DonationContext = createContext(null);

export function DonationProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    campaignId: null,
    campaignTitle: 'Where It Is Needed Most (General Fund)',
    presetAmount: 1000,
  });

  const [receiptModal, setReceiptModal] = useState({
    isOpen: false,
    receiptData: null,
  });

  const openDonationModal = ({ campaignId = null, campaignTitle = 'Where It Is Needed Most (General Fund)', presetAmount = 1000 } = {}) => {
    setModalState({
      isOpen: true,
      campaignId,
      campaignTitle,
      presetAmount,
    });
  };

  const closeDonationModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const showReceipt = (receiptData) => {
    setReceiptModal({
      isOpen: true,
      receiptData,
    });
  };

  const closeReceipt = () => {
    setReceiptModal({
      isOpen: false,
      receiptData: null,
    });
  };

  return (
    <DonationContext.Provider
      value={{
        modalState,
        openDonationModal,
        closeDonationModal,
        receiptModal,
        showReceipt,
        closeReceipt,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const context = useContext(DonationContext);
  if (!context) throw new Error('useDonation must be used within a DonationProvider');
  return context;
}
