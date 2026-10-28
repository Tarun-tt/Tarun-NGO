import React, { useRef } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Box,
  Typography, Button, Stack, Divider, Grid, Paper, IconButton
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { formatINR, formatDate } from '../../utils/formatters';

export default function DonationReceiptModal({ open, onClose, receipt }) {
  const receiptRef = useRef();

  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& @media print': {
          '& .MuiDialog-container': { display: 'block' },
          '& .MuiPaper-root': { boxShadow: 'none', border: 'none' },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <CheckCircleRoundedIcon sx={{ color: '#087A52', fontSize: 26 }} />
          <Typography variant="h6" fontWeight={800}>
            Official 80G Tax Exemption Donation Receipt
          </Typography>
        </Stack>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 2, sm: 4 }, bgcolor: '#FAFDFB' }}>
        <Paper
          ref={receiptRef}
          id="printable-receipt"
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4 },
            bgcolor: '#FFFFFF',
            borderRadius: 3,
            border: '2px solid #D1E5DC',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Grid container spacing={2} alignItems="flex-start" mb={3}>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5" fontWeight={800} color="#087A52" letterSpacing="-0.5px">
                HELPING INDIA FOUNDATION
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Registered Nonprofit Public Charitable Trust under Indian Trusts Act
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                A-42, Institutional Area, Sector 62, Noida, NCR - 201309, India
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Email: contact@helpingindia.org | Web: helpingindia.org
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
              <Box
                sx={{
                  display: 'inline-block',
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: '#EBF6F1',
                  border: '1px solid #C4E4D4',
                  textAlign: { xs: 'left', sm: 'right' },
                }}
              >
                <Typography variant="caption" fontWeight={700} color="#087A52" display="block">
                  RECEIPT NUMBER
                </Typography>
                <Typography variant="subtitle2" fontWeight={800} color="#172B3A">
                  {receipt.receiptNumber || `HI-80G-2026-${receipt.referenceId?.slice(-5) || '1042'}`}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                  Date: {formatDate(receipt.date)}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2, borderColor: '#D1E5DC' }} />

          {/* Legal Registrations Row */}
          <Grid container spacing={2} sx={{ bgcolor: '#F8FAF9', p: 1.5, borderRadius: 2, mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary" display="block">PAN Number</Typography>
              <Typography variant="body2" fontWeight={700}>{receipt.organization?.pan || 'AAATH9921D'}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary" display="block">NITI Aayog Darpan ID</Typography>
              <Typography variant="body2" fontWeight={700}>{receipt.organization?.darpanId || 'DL/2021/0289412'}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary" display="block">80G Reg. Number</Typography>
              <Typography variant="body2" fontWeight={700}>{receipt.organization?.section80G || 'CIT(E)/DEL/80G/1042'}</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary" display="block">12A Reg. Number</Typography>
              <Typography variant="body2" fontWeight={700}>{receipt.organization?.section12A || 'CIT(E)/DEL/12A/5820'}</Typography>
            </Grid>
          </Grid>

          {/* Donor & Contribution Details */}
          <Typography variant="subtitle1" fontWeight={800} color="#172B3A" mb={1.5}>
            Donor & Contribution Details
          </Typography>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">Received with thanks from:</Typography>
              <Typography variant="body1" fontWeight={700} color="#172B3A">
                {receipt.donor?.name || 'Valued Donor'}
              </Typography>
              <Typography variant="body2" color="text.secondary">{receipt.donor?.email}</Typography>
              {receipt.donor?.phone && (
                <Typography variant="body2" color="text.secondary">Mobile: {receipt.donor.phone}</Typography>
              )}
              {receipt.donor?.pan && (
                <Typography variant="body2" fontWeight={600} color="#087A52" sx={{ mt: 0.5 }}>
                  Donor PAN: {receipt.donor.pan}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary">Cause / Initiative Supported:</Typography>
              <Typography variant="body1" fontWeight={700} color="#172B3A">
                {receipt.payment?.campaignTitle || 'General NGO Fund (Where Needed Most)'}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Payment Mode: <strong>{receipt.payment?.method?.toUpperCase() || 'UPI DIRECT'}</strong>
              </Typography>
              {receipt.payment?.upiUtr && (
                <Typography variant="body2" color="text.secondary">
                  UPI UTR / Ref: <strong>{receipt.payment.upiUtr}</strong>
                </Typography>
              )}
              {receipt.payment?.gatewayPaymentId && (
                <Typography variant="body2" color="text.secondary">
                  Payment ID: <strong>{receipt.payment.gatewayPaymentId}</strong>
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Amount Box */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: '#E8F5EE',
              border: '1.5px solid #087A52',
              mb: 3,
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
              <Box>
                <Typography variant="caption" color="#087A52" fontWeight={700}>
                  TOTAL AMOUNT RECEIVED
                </Typography>
                <Typography variant="h4" fontWeight={800} color="#087A52">
                  {formatINR(receipt.payment?.amount)}
                </Typography>
              </Box>
              <Box sx={{ mt: { xs: 1, sm: 0 }, textAlign: { xs: 'left', sm: 'right' } }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Amount in words:
                </Typography>
                <Typography variant="body2" fontWeight={700} color="#172B3A">
                  {receipt.payment?.amountInWords || 'Indian Rupees Only'}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Tax Exemption Certificate Disclaimer */}
          <Box sx={{ p: 2, bgcolor: '#FFFBEB', borderRadius: 2, border: '1px solid #FDE68A', mb: 3 }}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <VerifiedUserRoundedIcon sx={{ color: '#D97706', fontSize: 20, mt: 0.2 }} />
              <Typography variant="caption" color="#92400E" sx={{ lineHeight: 1.6 }}>
                <strong>Section 80G Tax Exemption:</strong> Donations to Helping India Foundation qualify for a 50% tax deduction under Section 80G of the Income Tax Act, 1961. This electronic receipt serves as an authentic certificate of donation. Form 10BE certificate will be submitted to the Income Tax Department at the close of the financial year.
              </Typography>
            </Stack>
          </Box>

          {/* Signature & Seal Footer */}
          <Grid container spacing={2} alignItems="flex-end" pt={2}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary" display="block">
                This is a computer generated certificate.
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Valid without physical signature.
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Box sx={{ display: 'inline-block', textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 90,
                    height: 45,
                    border: '1.5px dashed #087A52',
                    borderRadius: 2,
                    mx: 'auto',
                    mb: 0.5,
                    display: 'grid',
                    placeItems: 'center',
                    color: '#087A52',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                  }}
                >
                  DIGITAL SEAL
                </Box>
                <Typography variant="caption" fontWeight={700} color="#172B3A" display="block">
                  Tarun Tiwari (Authorized Signatory)
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Helping India Foundation
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, bgcolor: '#FFFFFF', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          Reference ID: <strong>{receipt.referenceId}</strong>
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PrintRoundedIcon />}
            onClick={handlePrint}
          >
            Print / Save Receipt
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
