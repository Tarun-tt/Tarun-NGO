import React from 'react';
import { Container, Box, Typography, Paper, Divider } from '@mui/material';

export default function PrivacyPolicy() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF' }}>
          <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px' }}>
            LEGAL COMPLIANCE
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 0.5, mb: 1 }}>
            Privacy Policy
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" mb={3}>
            Last updated: January 2026 · Compliant with the Digital Personal Data Protection Act (DPDP Act), 2023
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Typography variant="body1" color="text.secondary" paragraph>
            Helping India Foundation ("we", "us", or "our") respects the privacy of our donors, volunteers, beneficiaries, and website visitors. This policy outlines how we collect, process, and safeguard your personal data in accordance with applicable Indian laws.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            When you make a donation, apply to volunteer, or send a contact inquiry, we may collect:
            <br />• Contact details: Full name, email address, mobile number, and city/state.
            <br />• Tax compliance details: Permanent Account Number (PAN) and billing address, strictly when required for issuing Section 80G certificates and filing Form 10BD/10BE with the Income Tax Department.
            <br />• Transaction identifiers: UPI UTR numbers, payment gateway transaction IDs, and timestamps.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            2. Payment Security & Zero Card Storage
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            We <strong>never collect, process, or store</strong> credit/debit card numbers, CVVs, net-banking passwords, or UPI PINs on our servers. All digital transactions are processed through encrypted, RBI-licensed payment aggregators (such as Razorpay) or settled directly via the NPCI UPI framework.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            3. Purpose of Processing
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Your information is used solely for:
            <br />• Generating and emailing authentic Section 80G tax exemption donation receipts.
            <br />• Complying with statutory nonprofit audit mandates under the Indian Income Tax Act 1961.
            <br />• Sharing quarterly verified field project updates (only if opted in).
            <br />• Coordinating volunteer assignments with applicant consent.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            4. Grievance Redressal
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            In compliance with Indian law, you may reach our designated Grievance Officer regarding any data inquiry or deletion request at:
            <br /><strong>Grievance Officer:</strong> Tarun Tiwari, Trust Secretariat
            <br /><strong>Email:</strong> grievance@helpingindia.org
            <br /><strong>Address:</strong> A-42, Institutional Area, Sector 62, Noida, NCR - 201309, India
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
