import React, { useState } from 'react';
import {
  Container, Box, Typography, Paper, TextField, Button, Grid,
  Stack, Divider, CircularProgress, Alert, Card, CardContent
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { api } from '../api/client';
import { useDonation } from '../context/DonationContext';
import { formatINR, formatDate } from '../utils/formatters';

export default function ReceiptLookupPage() {
  const { showReceipt } = useDonation();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [receipts, setReceipts] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter your donor email address or Donation Reference ID.');
      return;
    }

    setLoading(true);
    setError('');
    setReceipts(null);

    try {
      const isEmail = query.includes('@');
      const results = await api.lookupReceipts({
        email: isEmail ? query.trim() : undefined,
        reference_id: !isEmail ? query.trim() : undefined,
      });

      setReceipts(results);
      if (results.length === 0) {
        setError('No donation records found for the provided information. Please verify your email or reference ID.');
      }
    } catch (err) {
      setError(err.message || 'Lookup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, bgcolor: '#F8FAF9', minHeight: '80vh' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              bgcolor: '#E4F6ED',
              color: '#087A52',
              display: 'grid',
              placeItems: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            <ReceiptLongRoundedIcon sx={{ fontSize: 32 }} />
          </Box>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, mb: 1.5 }}>
            Download Your Section 80G Tax Receipt
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Retrieve past donation certificates anytime for your annual Income Tax assessment. Enter the email address used during donation or your unique transaction reference.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            border: '1px solid #DCE6E1',
            bgcolor: '#FFFFFF',
            mb: 4,
          }}
        >
          <Box component="form" onSubmit={handleSearch}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <TextField
                fullWidth
                placeholder="Enter Donor Email (e.g. name@gmail.com) or Reference ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={<SearchRoundedIcon />}
                sx={{ py: 1.4, px: 3.5, whiteSpace: 'nowrap', fontWeight: 800 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Find Receipts'}
              </Button>
            </Stack>
          </Box>
        </Paper>

        {error && (
          <Alert severity="warning" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Results List */}
        {receipts && receipts.length > 0 && (
          <Stack spacing={2.5}>
            <Typography variant="h5" fontWeight={800} color="#172B3A">
              Found {receipts.length} Donation Certificate{receipts.length > 1 ? 's' : ''}
            </Typography>

            {receipts.map((r, i) => (
              <Card key={i} sx={{ borderRadius: 3, border: '1px solid #D5E8DD' }}>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} sm={8}>
                      <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                        <VerifiedUserRoundedIcon sx={{ color: '#087A52', fontSize: 18 }} />
                        <Typography variant="caption" fontWeight={800} color="#087A52">
                          RECEIPT NO: {r.receiptNumber || 'PENDING ASSIGNMENT'}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" fontWeight={800} color="#172B3A">
                        {r.payment?.campaignTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Donor: <strong>{r.donor?.name}</strong> · Date: {formatDate(r.date)} · Ref: {r.referenceId}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                      <Typography variant="h5" fontWeight={800} color="#087A52" mb={1.5}>
                        {formatINR(r.payment?.amount)}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<ReceiptLongRoundedIcon />}
                        onClick={() => showReceipt(r)}
                        sx={{ fontWeight: 700 }}
                      >
                        View & Print 80G Receipt
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
