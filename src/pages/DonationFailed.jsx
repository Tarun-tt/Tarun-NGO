import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Paper, Button, Stack, Alert } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

export default function DonationFailed() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F8FAF9', minHeight: '70vh' }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3.5, sm: 5 },
            borderRadius: 4,
            border: '2px solid #FED7D7',
            bgcolor: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              bgcolor: '#FEE2E2',
              color: '#DC2626',
              display: 'grid',
              placeItems: 'center',
              mx: 'auto',
              mb: 2.5,
            }}
          >
            <ErrorOutlineRoundedIcon sx={{ fontSize: 44 }} />
          </Box>

          <Typography variant="h4" fontWeight={800} color="#172B3A" mb={1}>
            Payment Incomplete
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            We could not complete your transaction. No funds were debited, or if an amount was deducted, your bank will automatically reverse it within 3-5 business days.
          </Typography>

          <Alert severity="info" sx={{ mb: 3.5, textAlign: 'left' }}>
            <strong>Try Our Direct UPI Option:</strong> You can transfer directly without payment gateway interruptions to our verified UPI ID: <strong>tarun-tiwari@ptyes</strong>.
          </Alert>

          <Stack spacing={1.5}>
            <Button
              component={RouterLink}
              to="/donate"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<QrCodeRoundedIcon />}
              sx={{ py: 1.3, fontWeight: 800 }}
            >
              Retry Donation / Pay via UPI
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              color="inherit"
              startIcon={<SupportAgentRoundedIcon />}
              sx={{ py: 1.3, borderColor: '#D5E2DB' }}
            >
              Contact Support
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
