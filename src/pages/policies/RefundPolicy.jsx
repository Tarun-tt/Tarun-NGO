import React from 'react';
import { Container, Box, Typography, Paper, Divider } from '@mui/material';

export default function RefundPolicy() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF' }}>
          <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px' }}>
            DONOR PROTECTION
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 0.5, mb: 1 }}>
            Donation Refund & Cancellation Policy
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" mb={3}>
            Guidelines on inadvertent, duplicate, or unauthorized transactions
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Typography variant="body1" color="text.secondary" paragraph>
            Helping India Foundation follows transparent, fair accounting policies. Because charitable contributions are immediately committed to ongoing community interventions, rations, and medical stocks, donations are generally non-refundable. However, we honor refund requests under specific genuine technical circumstances.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            1. Eligible Refund Scenarios
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • <strong>Duplicate Deductions:</strong> If a technical glitch causes your bank or UPI account to be debited more than once for a single intended donation.
            <br />• <strong>Incorrect Amount Entered:</strong> If an erroneous extra digit was typed (e.g. ₹10,000 instead of intended ₹1,000) and reported immediately.
            <br />• <strong>Unauthorized Fraudulent Transaction:</strong> If a payment card or UPI instrument was utilized without the legitimate holder's consent and verified by bank chargeback documents.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            2. Request Procedure & Timeline
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Refund requests must be reported in writing within <strong>7 calendar days</strong> of the transaction date. Please email:
            <br /><strong>Email:</strong> accounts@helpingindia.org (cc: contact@helpingindia.org)
            <br />Include: Donor Name, Email, Mobile, Donation Reference ID, Bank statement snippet showing the debit, and reason for the refund request.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            3. Processing of Approved Refunds
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Approved refunds will be credited back exclusively to the original payment source (same bank account or UPI VPA) within 5 to 7 working days. If a Section 80G tax receipt was already generated, the original receipt will be officially cancelled and reported to the tax portal.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
