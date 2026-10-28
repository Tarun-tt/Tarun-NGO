import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import DonationModal from '../donation/DonationModal';
import DonationReceiptModal from '../donation/DonationReceiptModal';
import { useDonation } from '../../context/DonationContext';

export default function Layout() {
  const { receiptModal, closeReceipt } = useDonation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FFFFFF' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />

      {/* Global Modals */}
      <DonationModal />
      <DonationReceiptModal
        open={receiptModal.isOpen}
        onClose={closeReceipt}
        receipt={receiptModal.receiptData}
      />
    </Box>
  );
}
