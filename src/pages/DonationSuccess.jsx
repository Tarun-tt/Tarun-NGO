import React, { useEffect, useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Paper, Button, Stack, Divider, Alert, CircularProgress } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { api } from '../api/client';
import { useDonation } from '../context/DonationContext';
import { formatINR, formatDate } from '../utils/formatters';

export default function DonationSuccess() {
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('ref');
  const { showReceipt } = useDonation();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(Boolean(refId));

  useEffect(() => {
    if (refId) {
      api.getReceipt(refId)
        .then(setReceipt)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [refId]);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F8FAF9', minHeight: '70vh' }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3.5, sm: 5 },
            borderRadius: 4,
            border: '2px solid #C8E5D7',
            bgcolor: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              bgcolor: '#E4F6ED',
              color: '#087A52',
              display: 'grid',
              placeItems: 'center',
              mx: 'auto',
              mb: 2.5,
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: 44 }} />
          </Box>

          <Typography variant="h3" fontWeight={800} color="#172B3A" mb={1}>
            Thank You for Your Kindness!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Your generous contribution to Helping India Foundation has been successfully recorded. Your donation directly fuels meaningful change on the ground.
          </Typography>

          {loading ? (
            <CircularProgress sx={{ my: 3 }} />
          ) : receipt ? (
            <Box sx={{ p: 2.5, bgcolor: '#FAFDFB', borderRadius: 3, border: '1px solid #D5E8DD', mb: 3.5, textAlign: 'left' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                DONATION REFERENCE ID
              </Typography>
              <Typography variant="subtitle1" fontWeight={800} color="#087A52" mb={1}>
                {receipt.referenceId}
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Stack direction="row" justifyContent="space-between" mb={0.5}>
                <Typography variant="body2" color="text.secondary">Amount Contributed:</Typography>
                <Typography variant="body2" fontWeight={800}>{formatINR(receipt.payment?.amount)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" mb={0.5}>
                <Typography variant="body2" color="text.secondary">Initiative:</Typography>
                <Typography variant="body2" fontWeight={700}>{receipt.payment?.campaignTitle}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Date:</Typography>
                <Typography variant="body2">{formatDate(receipt.date)}</Typography>
              </Stack>
            </Box>
          ) : null}

          <Alert severity="success" sx={{ mb: 3.5, textAlign: 'left' }}>
            <strong>Section 80G Tax Exemption:</strong> Your contribution qualifies for a 50% tax deduction under Section 80G. Click below to view and download your official tax receipt.
          </Alert>

          <Stack spacing={1.5}>
            {receipt && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ReceiptLongRoundedIcon />}
                onClick={() => showReceipt(receipt)}
                sx={{ py: 1.3, fontWeight: 800 }}
              >
                View & Print Official 80G Receipt
              </Button>
            )}
            <Button
              component={RouterLink}
              to="/"
              variant="outlined"
              color="inherit"
              startIcon={<HomeRoundedIcon />}
              sx={{ py: 1.3, borderColor: '#D5E2DB' }}
            >
              Return to Home
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
