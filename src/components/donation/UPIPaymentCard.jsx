import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, Stack, Paper, Chip,
  Snackbar, Alert, CircularProgress, Divider, Tooltip, Grid
} from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { formatINR } from '../../utils/formatters';

export default function UPIPaymentCard({
  amount = 1000,
  referenceId = '',
  campaignTitle = 'General NGO Fund',
  onVerifyUtr,
  loading = false,
  donorName = '',
  donorEmail = '',
  donorPhone = '',
  donorPan = ''
}) {
  const upiId = 'tarun-tiwari@ptyes';
  const payeeName = 'Tarun Tiwari';
  const qrImage = './upi-qr.png';
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [utr, setUtr] = useState('');
  const [utrError, setUtrError] = useState('');

  // Official NPCI UPI Deep Link Intent
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Donation ${referenceId || 'Helping India'}`)}`;

  const handlePayViaUpi = () => {
    // Direct redirect / launch UPI App
    window.location.href = upiDeepLink;
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const copyBankDetails = () => {
    const text = `Name: Tarun Tiwari\nBank: Yes Bank\nAccount: 006691800137107\nIFSC: YESB0000002`;
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 3000);
  };

  const handleUtrSubmit = (e) => {
    e.preventDefault();
    if (!utr || utr.trim().length < 4) {
      setUtrError('Please enter your UPI transaction / UTR reference number or click Continue.');
      return;
    }
    setUtrError('');
    if (onVerifyUtr) {
      onVerifyUtr(utr.trim());
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 4,
        border: '2px solid #087A52',
        background: '#FAFDFB',
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mb={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <QrCodeScannerRoundedIcon sx={{ color: '#087A52', fontSize: 28 }} />
          <Typography variant="h6" fontWeight={800} color="#172B3A">
            Direct UPI & Bank Payment
          </Typography>
        </Stack>
        <Chip
          label="0% Extra Fee"
          size="small"
          sx={{ bgcolor: '#E4F6ED', color: '#087A52', fontWeight: 800, fontSize: '0.75rem' }}
        />
      </Stack>

      {/* Main Big Direct Pay Button */}
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        onClick={handlePayViaUpi}
        endIcon={<LaunchRoundedIcon />}
        sx={{
          py: 1.6,
          mb: 3,
          fontSize: '1.05rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          boxShadow: '0 6px 20px rgba(245, 158, 11, 0.35)',
        }}
      >
        Pay {formatINR(amount)} to {upiId}
      </Button>

      {/* QR Code and Account Details Grid */}
      <Grid container spacing={3} alignItems="center" mb={3}>
        {/* QR Scanner */}
        <Grid item xs={12} sm={5} sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(8, 122, 82, 0.12)',
              border: '1.5px solid #D5E8DD',
              display: 'inline-block',
              maxWidth: 220,
              width: '100%',
            }}
          >
            <Box
              component="img"
              src={qrImage}
              alt="Scan UPI QR Code to pay Tarun Tiwari"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                display: 'block',
              }}
            />
            <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#526677', fontWeight: 700 }}>
              Scan to Pay {formatINR(amount)}
            </Typography>
          </Box>
        </Grid>

        {/* UPI & Bank Details Box */}
        <Grid item xs={12} sm={7}>
          <Stack spacing={2}>
            {/* UPI ID Box */}
            <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2.5, border: '1px solid #D5E8DD' }}>
              <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" mb={0.3}>
                PRIMARY UPI ID
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Typography variant="body1" fontWeight={800} color="#087A52" sx={{ fontFamily: 'monospace' }}>
                  {upiId}
                </Typography>
                <Button
                  size="small"
                  variant={copiedUpi ? 'contained' : 'outlined'}
                  color={copiedUpi ? 'success' : 'primary'}
                  onClick={copyUpiId}
                  startIcon={copiedUpi ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
                  sx={{ minWidth: 85 }}
                >
                  {copiedUpi ? 'Copied' : 'Copy'}
                </Button>
              </Stack>
            </Box>

            {/* Direct Yes Bank Transfer Details */}
            <Box sx={{ p: 2, bgcolor: '#F4FAF7', borderRadius: 2.5, border: '1px solid #C8E5D7' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccountBalanceRoundedIcon sx={{ color: '#087A52', fontSize: 20 }} />
                  <Typography variant="subtitle2" fontWeight={800} color="#172B3A">
                    Yes Bank Account
                  </Typography>
                </Stack>
                <Tooltip title="Copy all bank details">
                  <Button size="small" onClick={copyBankDetails} sx={{ p: 0.2, minWidth: 'auto', color: '#087A52' }}>
                    {copiedBank ? <CheckRoundedIcon fontSize="small" /> : <ContentCopyRoundedIcon fontSize="small" />}
                  </Button>
                </Tooltip>
              </Stack>

              <Typography variant="caption" color="text.secondary" display="block">
                • Account Holder: <strong>Tarun Tiwari</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • Bank: <strong>Yes Bank</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • Account Number: <strong style={{ color: '#087A52' }}>006691800137107</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • IFSC Code: <strong>YESB0000002</strong>
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2.5, borderColor: '#D5E8DD' }} />

      {/* Claim 80G Tax Receipt Form */}
      <Box component="form" onSubmit={handleUtrSubmit}>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <ReceiptLongRoundedIcon sx={{ color: '#087A52', fontSize: 22 }} />
          <Typography variant="subtitle2" fontWeight={800} color="#172B3A">
            Claim Your Section 80G Tax Receipt
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
          After completing your transfer in your UPI app, enter your <strong>UTR / Reference ID</strong> below to instantly view and download your 80G receipt.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="flex-start">
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. 431289104821 or UPI Ref"
            value={utr}
            onChange={(e) => {
              setUtr(e.target.value);
              if (utrError) setUtrError('');
            }}
            error={Boolean(utrError)}
            helperText={utrError}
            sx={{ bgcolor: '#FFFFFF' }}
            disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              whiteSpace: 'nowrap',
              minWidth: { xs: '100%', sm: 200 },
              py: 1,
              fontWeight: 800,
            }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : 'Confirm & Get 80G Receipt'}
          </Button>
        </Stack>
      </Box>

      <Snackbar open={copiedUpi} autoHideDuration={3000} onClose={() => setCopiedUpi(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          UPI ID <strong>{upiId}</strong> copied to clipboard!
        </Alert>
      </Snackbar>

      <Snackbar open={copiedBank} autoHideDuration={3000} onClose={() => setCopiedBank(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Bank account details copied!
        </Alert>
      </Snackbar>
    </Paper>
  );
}
