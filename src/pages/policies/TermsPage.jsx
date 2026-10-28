import React from 'react';
import { Container, Box, Typography, Paper, Divider } from '@mui/material';

export default function TermsPage() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF' }}>
          <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px' }}>
            STATUTORY TERMS
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 0.5, mb: 1 }}>
            Terms & Conditions
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" mb={3}>
            Governed by the Laws of the Republic of India
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Typography variant="body1" color="text.secondary" paragraph>
            Welcome to the official digital portal of <strong>Helping India Foundation</strong>, a registered public charitable trust under the Indian Trusts Act. By browsing, volunteering, or donating through this website, you agree to these Terms.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            1. Voluntary Donations
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            All contributions made to Helping India Foundation are voluntary charitable gifts designated for public welfare, community education, healthcare assistance, hunger relief, or environmental restoration. Donors must be Indian citizens holding valid domestic bank accounts or payment instruments in compliance with FCRA regulations.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            2. Tax Deductions under Section 80G
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Contributions made to Helping India Foundation qualify for a 50% tax deduction under Section 80G of the Indian Income Tax Act 1961. Donors requiring Form 10BE filing certificates must provide their accurate PAN at the time of contribution.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            3. Intellectual Property & Authentic Photography
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            All photographs, reports, curriculum kits, and logos published on this website are protected intellectual property. Beneficiary photographs and stories are published with verified parental or community consent.
          </Typography>

          <Typography variant="h5" fontWeight={800} color="#172B3A" sx={{ mt: 3, mb: 1 }}>
            4. Jurisdiction
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Any dispute arising in connection with this website, donations, or organizational activities shall be subject to the exclusive jurisdiction of the competent courts in New Delhi / NCR, India.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
