import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Box, Typography, Button,
  Grid, TextField, FormControlLabel, Checkbox, Stack, Chip,
  Divider, Alert, IconButton, CircularProgress
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { useDonation } from '../../context/DonationContext';
import { api } from '../../api/client';
import { formatINR } from '../../utils/formatters';
import UPIPaymentCard from './UPIPaymentCard';

const impactDescriptions = {
  500: 'Provides a complete school learning kit and stationery for 1 child.',
  1000: 'Funds diagnostic screenings and essential medicines for 2 rural elderly patients.',
  2500: 'Provides wholesome daily meals and nutrition for a vulnerable family for an entire month.',
  5000: 'Plants and nurtures 25 native trees with community groundwater pits.',
  10000: 'Funds a vocational tailoring workstation for a woman artisan micro-entrepreneur.',
};

export default function DonationModal() {
  const { modalState, closeDonationModal, showReceipt } = useDonation();
  const { isOpen, campaignId: initialCampaignId, campaignTitle: initialCampaignTitle, presetAmount } = modalState;

  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState(initialCampaignId || '');
  const [selectedCampaignTitle, setSelectedCampaignTitle] = useState(initialCampaignTitle || 'General NGO Fund');
  const [amount, setAmount] = useState(presetAmount || 1000);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showQrDetails, setShowQrDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    address: '',
    isAnonymous: false,
    notes: '',
  });

  useEffect(() => {
    if (isOpen) {
      setSelectedCampaignId(initialCampaignId || '');
      setSelectedCampaignTitle(initialCampaignTitle || 'General NGO Fund');
      setAmount(presetAmount || 1000);
      setCustomAmount('');
      setError('');
      setShowQrDetails(false);

      api.getCampaigns().then(setCampaigns).catch(console.warn);
    }
  }, [isOpen, initialCampaignId, initialCampaignTitle, presetAmount]);

  if (!isOpen) return null;

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
    setError('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handlePayAndRedirectUpi = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide your name and email address to receive your official 80G tax receipt.');
      return;
    }
    if (amount < 50) {
      setError('Minimum donation amount is ₹50.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const upiUrl = `upi://pay?pa=tarun-tiwari@ptyes&pn=Tarun%20Tiwari&am=${amount}&cu=INR&tn=${encodeURIComponent(`Donation - ${selectedCampaignTitle}`)}`;

      const res = await api.submitUpiPayment({
        campaign_id: selectedCampaignId || null,
        campaign_title: selectedCampaignTitle,
        amount,
        donor_name: formData.name.trim(),
        donor_email: formData.email.trim(),
        donor_phone: formData.phone.trim() || null,
        donor_pan: formData.pan.trim() || null,
        address: formData.address.trim() || null,
        upi_utr: 'UPI-DIRECT',
        is_anonymous: formData.isAnonymous,
        notes: formData.notes.trim() || null,
      });

      // Redirect/launch UPI app
      window.location.href = upiUrl;

      // Open official receipt modal
      closeDonationModal();
      showReceipt(res.receipt);
    } catch (err) {
      setError(err.message || 'Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleUtrVerified = async (utrNumber) => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please provide your name and email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await api.submitUpiPayment({
        campaign_id: selectedCampaignId || null,
        campaign_title: selectedCampaignTitle,
        amount,
        donor_name: formData.name.trim(),
        donor_email: formData.email.trim(),
        donor_phone: formData.phone.trim() || null,
        donor_pan: formData.pan.trim() || null,
        address: formData.address.trim() || null,
        upi_utr: utrNumber,
        is_anonymous: formData.isAnonymous,
        notes: formData.notes.trim() || null,
      });

      closeDonationModal();
      showReceipt(res.receipt);
    } catch (err) {
      setError(err.message || 'Failed to submit verification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeDonationModal} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: '#E4F6ED', display: 'grid', placeItems: 'center', color: '#087A52' }}>
            <FavoriteRoundedIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} color="#172B3A" lineHeight={1.2}>
              Support Helping India
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Direct UPI: <strong>tarun-tiwari@ptyes</strong> · 50% Tax Exemption
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={closeDonationModal} size="small" aria-label="close">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2.5 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Step 1: Cause Selector */}
        <Box mb={2.5}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={0.8}>
            1. SELECT INITIATIVE TO SUPPORT
          </Typography>
          <TextField
            select
            fullWidth
            size="small"
            value={selectedCampaignId}
            onChange={(e) => {
              const id = e.target.value;
              setSelectedCampaignId(id);
              const found = campaigns.find((c) => c.id === id);
              setSelectedCampaignTitle(found ? found.title : 'General NGO Fund');
            }}
            SelectProps={{ native: true }}
          >
            <option value="">General NGO Fund (Where Needed Most)</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.category}: {c.title}
              </option>
            ))}
          </TextField>
        </Box>

        {/* Step 2: Amount Selector */}
        <Box mb={2.5}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
            2. CHOOSE DONATION AMOUNT
          </Typography>
          <Grid container spacing={1} mb={1.5}>
            {[500, 1000, 2500, 5000, 10000].map((val) => (
              <Grid item xs={4} sm key={val}>
                <Button
                  fullWidth
                  variant={amount === val && !customAmount ? 'contained' : 'outlined'}
                  color={amount === val && !customAmount ? 'primary' : 'inherit'}
                  onClick={() => handleAmountSelect(val)}
                  sx={{
                    py: 1,
                    px: 0.5,
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    borderColor: '#D4E2DA',
                  }}
                >
                  {formatINR(val)}
                </Button>
              </Grid>
            ))}
          </Grid>

          <TextField
            fullWidth
            size="small"
            placeholder="Or enter custom amount in Rupees"
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1, color: '#087A52', fontWeight: 800 }}>₹</Typography>,
            }}
          />

          {impactDescriptions[amount] && (
            <Box sx={{ mt: 1.5, p: 1.5, bgcolor: '#F0F9F4', borderRadius: 2, border: '1px solid #D1EADE' }}>
              <Typography variant="caption" color="#087A52" fontWeight={600} display="block">
                ✨ <strong>Your impact:</strong> {impactDescriptions[amount]}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Step 3: Donor Details */}
        <Box mb={3}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
            3. DONOR DETAILS (FOR OFFICIAL 80G RECEIPT)
          </Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Email Address *"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Mobile Number (Optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="PAN Number (Optional for 80G)"
                placeholder="ABCDE1234F"
                value={formData.pan}
                onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                helperText="Required for Section 80G tax benefit certificate"
              />
            </Grid>
          </Grid>

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
              />
            }
            label={
              <Typography variant="caption" color="text.secondary">
                Keep my donation anonymous on public supporters wall
              </Typography>
            }
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Step 4: Pay to tarun-tiwari@ptyes */}
        <Box mb={2}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
            4. PAY DIRECTLY VIA UPI (GOOGLE PAY, PHONEPE, PAYTM, BHIM)
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            onClick={handlePayAndRedirectUpi}
            disabled={loading}
            endIcon={<LaunchRoundedIcon />}
            sx={{
              py: 1.5,
              fontSize: '1.05rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              boxShadow: '0 6px 20px rgba(245, 158, 11, 0.35)',
              mb: 1.5,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : `Pay ${formatINR(amount)} to tarun-tiwari@ptyes`}
          </Button>

          <Button
            variant="text"
            size="small"
            fullWidth
            onClick={() => setShowQrDetails(!showQrDetails)}
            sx={{ color: '#087A52', fontWeight: 700 }}
          >
            {showQrDetails ? 'Hide QR Code & Bank Account' : 'Show QR Code & Yes Bank Account Details'}
          </Button>
        </Box>

        {showQrDetails && (
          <Box sx={{ mt: 2 }}>
            <UPIPaymentCard
              amount={amount}
              campaignTitle={selectedCampaignTitle}
              onVerifyUtr={handleUtrVerified}
              loading={loading}
              donorName={formData.name}
              donorEmail={formData.email}
              donorPhone={formData.phone}
              donorPan={formData.pan}
            />
          </Box>
        )}

        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mt: 2.5, color: '#526677' }}>
          <ShieldRoundedIcon sx={{ fontSize: 16, color: '#087A52' }} />
          <Typography variant="caption">
            Direct UPI to Tarun Tiwari · Verified Indian Public Charitable Trust
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
