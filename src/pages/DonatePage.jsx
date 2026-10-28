import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, Stack, Button, TextField,
  FormControlLabel, Checkbox, Chip, Divider, Alert, Tooltip
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import UPIPaymentCard from '../components/donation/UPIPaymentCard';
import { api } from '../api/client';
import { useDonation } from '../context/DonationContext';
import { formatINR } from '../utils/formatters';

const impactDescriptions = {
  500: 'Rescues a child from labor (like 7-year-old Priya) with a complete school kit, books, uniform & bridge classes.',
  1000: 'Funds diagnostic screenings and vision restoration surgery for 2 rural elders (like 68-year-old Ramu Kaka).',
  2500: 'Sends a full month of emergency grocery rations (rice, atta, dal, oil) for stranded flood survivors in Bihar.',
  5000: 'Supplies emergency 4-ply thermal blankets & warm porridge protecting homeless families from freezing winter.',
  10000: 'Equips a rural mother with an industrial sewing workstation, unlocking permanent financial self-reliance.',
};

const impactImages = {
  500: './images/incident-priya-education.jpg',
  1000: './images/incident-elderly-healthcare.jpg',
  2500: './images/incident-flood-relief.jpg',
  5000: './images/incident-winter-drive.jpg',
  10000: './images/incident-women-coop.jpg',
};

export default function DonatePage() {
  const [searchParams] = useSearchParams();
  const initialCampaign = searchParams.get('campaign') || '';
  const { showReceipt } = useDonation();

  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState(initialCampaign);
  const [selectedCampaignTitle, setSelectedCampaignTitle] = useState('General NGO Fund (Where Needed Most)');
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [donorData, setDonorData] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    address: '',
    isAnonymous: false,
    notes: '',
  });

  useEffect(() => {
    api.getCampaigns().then((data) => {
      setCampaigns(data);
      if (initialCampaign) {
        const found = data.find((c) => c.id === initialCampaign || c.slug === initialCampaign);
        if (found) {
          setSelectedCampaignId(found.id);
          setSelectedCampaignTitle(found.title);
        }
      }
    }).catch(console.warn);
  }, [initialCampaign]);

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
    setError('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleDirectUpiPay = async () => {
    if (!donorData.name.trim() || !donorData.email.trim()) {
      setError('Please provide your name and email address to receive your official 80G tax receipt.');
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
        donor_name: donorData.name.trim(),
        donor_email: donorData.email.trim(),
        donor_phone: donorData.phone.trim() || null,
        donor_pan: donorData.pan.trim() || null,
        address: donorData.address.trim() || null,
        upi_utr: 'UPI-DIRECT',
        is_anonymous: donorData.isAnonymous,
        notes: donorData.notes.trim() || null,
      });

      // Move user to UPI ID tarun-tiwari@ptyes
      window.location.href = upiUrl;

      // Show official receipt
      showReceipt(res.receipt);
    } catch (err) {
      setError(err.message || 'Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpiVerified = async (utr) => {
    if (!donorData.name.trim() || !donorData.email.trim()) {
      setError('Please provide your name and email address to receive your 80G tax receipt.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await api.submitUpiPayment({
        campaign_id: selectedCampaignId || null,
        campaign_title: selectedCampaignTitle,
        amount,
        donor_name: donorData.name.trim(),
        donor_email: donorData.email.trim(),
        donor_phone: donorData.phone.trim() || null,
        donor_pan: donorData.pan.trim() || null,
        address: donorData.address.trim() || null,
        upi_utr: utr,
        is_anonymous: donorData.isAnonymous,
        notes: donorData.notes.trim() || null,
      });

      showReceipt(res.receipt);
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: '#F8FAF9' }}>
      <Container maxWidth="lg">
        {/* Page Title */}
        <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 5 }}>
          <Chip
            icon={<VerifiedUserRoundedIcon sx={{ fontSize: '18px !important', color: '#087A52 !important' }} />}
            label="50% Tax Exemption Under Section 80G"
            sx={{ bgcolor: '#E4F6ED', color: '#087A52', fontWeight: 800, mb: 2 }}
          />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.3rem', md: '3.2rem' }, mb: 1.5 }}>
            Donate to Helping India
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            Direct transfer to verified UPI: <strong>tarun-tiwari@ptyes</strong> (Tarun Tiwari). Instant official 80G tax certificate issued.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Main Donation Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF' }}>
              {/* Step 1: Cause */}
              <Box mb={3.5}>
                <Typography variant="subtitle2" fontWeight={800} color="#172B3A" mb={1}>
                  1. SELECT INITIATIVE
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={selectedCampaignId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedCampaignId(id);
                    const found = campaigns.find((c) => c.id === id);
                    setSelectedCampaignTitle(found ? found.title : 'General NGO Fund (Where Needed Most)');
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

              {/* Step 2: Amount */}
              <Box mb={3.5}>
                <Typography variant="subtitle2" fontWeight={800} color="#172B3A" mb={1}>
                  2. SELECT DONATION AMOUNT
                </Typography>
                <Grid container spacing={1.5} mb={2}>
                  {[500, 1000, 2500, 5000, 10000].map((amt) => (
                    <Grid item xs={4} sm key={amt}>
                      <Button
                        fullWidth
                        variant={amount === amt && !customAmount ? 'contained' : 'outlined'}
                        color={amount === amt && !customAmount ? 'primary' : 'inherit'}
                        onClick={() => handleAmountSelect(amt)}
                        sx={{ py: 1.2, fontWeight: 800, borderColor: '#D4E2DA' }}
                      >
                        {formatINR(amt)}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                <TextField
                  fullWidth
                  placeholder="Or enter custom amount in Rupees"
                  type="number"
                  value={customAmount}
                  onChange={handleCustomChange}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1, color: '#087A52', fontWeight: 800 }}>₹</Typography>,
                  }}
                />

                {impactDescriptions[amount] && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: '#F0F9F4', borderRadius: 2.5, border: '1px solid #D1EADE', display: 'flex', alignItems: 'center', gap: 2 }}>
                    {impactImages[amount] && (
                      <Box
                        component="img"
                        src={impactImages[amount]}
                        alt="Tier Impact"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        sx={{ width: 64, height: 64, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
                      />
                    )}
                    <Box>
                      <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                        ✨ Verified Program Impact
                      </Typography>
                      <Typography variant="body2" color="#172B3A" fontWeight={600}>
                        {impactDescriptions[amount]}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Step 3: Donor Details */}
              <Box mb={3.5}>
                <Typography variant="subtitle2" fontWeight={800} color="#172B3A" mb={1}>
                  3. DONOR INFORMATION
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name *"
                      value={donorData.name}
                      onChange={(e) => setDonorData({ ...donorData, name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address *"
                      type="email"
                      value={donorData.email}
                      onChange={(e) => setDonorData({ ...donorData, email: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number (Optional)"
                      value={donorData.phone}
                      onChange={(e) => setDonorData({ ...donorData, phone: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="PAN Number (Optional for 80G)"
                      placeholder="ABCDE1234F"
                      value={donorData.pan}
                      onChange={(e) => setDonorData({ ...donorData, pan: e.target.value.toUpperCase() })}
                      helperText="Required for Section 80G Tax Exemption Certificate"
                    />
                  </Grid>
                </Grid>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={donorData.isAnonymous}
                      onChange={(e) => setDonorData({ ...donorData, isAnonymous: e.target.checked })}
                    />
                  }
                  label={
                    <Typography variant="caption" color="text.secondary">
                      Keep my name anonymous on the public supporters wall
                    </Typography>
                  }
                  sx={{ mt: 1 }}
                />
              </Box>

              {/* Step 4: Pay to tarun-tiwari@ptyes */}
              <Box mb={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={handleDirectUpiPay}
                  endIcon={<LaunchRoundedIcon />}
                  sx={{
                    py: 1.6,
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    boxShadow: '0 6px 20px rgba(245, 158, 11, 0.35)',
                    mb: 3,
                  }}
                >
                  Pay {formatINR(amount)} to tarun-tiwari@ptyes (Tarun Tiwari)
                </Button>

                <UPIPaymentCard
                  amount={amount}
                  campaignTitle={selectedCampaignTitle}
                  onVerifyUtr={handleUpiVerified}
                  loading={loading}
                  donorName={donorData.name}
                  donorEmail={donorData.email}
                  donorPhone={donorData.phone}
                  donorPan={donorData.pan}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Right Column: Bank Details & Trust Card */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              {/* Trust Community Image */}
              <Box
                sx={{
                  borderRadius: 3.5,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 8px 24px rgba(8, 122, 82, 0.08)',
                }}
              >
                <Box
                  component="img"
                  src="./images/volunteer-action.jpg"
                  alt="Every Rupee Counts - Helping India"
                  onError={(e) => {
                    e.currentTarget.src = './images/volunteer-action.jpg';
                  }}
                  sx={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    insetX: 0,
                    p: 2,
                    background: 'linear-gradient(to top, rgba(23, 43, 58, 0.95) 0%, rgba(23, 43, 58, 0) 100%)',
                    color: '#FFFFFF',
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={800}>
                    Direct Account Settlement
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#D4EBE0' }}>
                    No payment gateway aggregator commissions deducted. 100% of your funds reach the cause.
                  </Typography>
                </Box>
              </Box>

              {/* Yes Bank Card */}
              <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3.5, border: '2px solid #087A52', bgcolor: '#FAFDFB' }}>
                <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
                  <AccountBalanceRoundedIcon sx={{ color: '#087A52', fontSize: 26 }} />
                  <Typography variant="h6" fontWeight={800} color="#087A52">
                    Official Yes Bank Details
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                  Direct IMPS / NEFT / RTGS Transfer
                </Typography>

                <Stack spacing={1.5}>
                  <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #D5E8DD' }}>
                    <Typography variant="caption" color="text.secondary">Account Holder</Typography>
                    <Typography variant="subtitle2" fontWeight={800} color="#172B3A">Tarun Tiwari</Typography>
                  </Box>
                  <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #D5E8DD' }}>
                    <Typography variant="caption" color="text.secondary">Bank Name</Typography>
                    <Typography variant="subtitle2" fontWeight={800} color="#172B3A">Yes Bank</Typography>
                  </Box>
                  <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #D5E8DD' }}>
                    <Typography variant="caption" color="text.secondary">Account Number</Typography>
                    <Typography variant="subtitle2" fontWeight={800} color="#087A52">006691800137107</Typography>
                  </Box>
                  <Box sx={{ p: 1.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #D5E8DD' }}>
                    <Typography variant="caption" color="text.secondary">IFSC Code</Typography>
                    <Typography variant="subtitle2" fontWeight={800} color="#172B3A">YESB0000002</Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3.5, border: '1px solid #DDE7E2', bgcolor: '#FFFFFF' }}>
                <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                  <ShieldRoundedIcon sx={{ color: '#087A52', fontSize: 26 }} />
                  <Typography variant="h6" fontWeight={800} color="#172B3A">
                    100% Tax Deductible (80G)
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                  Every domestic donation to Helping India Foundation qualifies for a <strong>50% tax deduction under Section 80G</strong> of the Income Tax Act, 1961.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" color="text.secondary" display="block">
                  • <strong>Darpan ID:</strong> DL/2021/0289412
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  • <strong>Trust PAN:</strong> AAATH9921D
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  • <strong>80G Number:</strong> CIT(E)/DEL/80G/2021-22/A/1042
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  • <strong>Official UPI:</strong> tarun-tiwari@ptyes
                </Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
