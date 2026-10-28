import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Stack, Button, TextField,
  Divider, Chip, Alert, Snackbar
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import QrCodeRoundedIcon from '@mui/icons-material/QrCodeRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { api } from '../../api/client';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ open: false, message: '', severity: 'success' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setNotice({ open: true, message: 'Please enter a valid email address.', severity: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.subscribeNewsletter(email);
      setNotice({ open: true, message: res.message || 'Subscribed successfully!', severity: 'success' });
      setEmail('');
    } catch (err) {
      setNotice({ open: true, message: err.message || 'Subscription failed', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="footer" sx={{ bgcolor: '#122332', color: '#FFFFFF', pt: 8, pb: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} mb={6}>
          {/* Col 1: Brand & Registrations */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 3,
                  bgcolor: '#087A52',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#FFFFFF',
                }}
              >
                <FavoriteRoundedIcon />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={800} color="#FFFFFF" letterSpacing="-0.5px">
                  Helping India
                </Typography>
                <Typography variant="caption" sx={{ color: '#97AAB8', display: 'block' }}>
                  Together, We Can Build a Better India
                </Typography>
              </Box>
            </Stack>

            <Typography variant="body2" sx={{ color: '#BACCD8', lineHeight: 1.7, mb: 3 }}>
              Helping India is a registered Indian nonprofit public charitable trust committed to providing quality education, rural healthcare access, hunger relief, women empowerment, child welfare, and environmental protection across 15 Indian states.
            </Typography>

            <Box sx={{ p: 2, bgcolor: '#1B3145', borderRadius: 2.5, border: '1px solid #28445E' }}>
              <Typography variant="caption" sx={{ color: '#FBBF24', fontWeight: 800, display: 'block', mb: 0.5 }}>
                VERIFIED LEGAL REGISTRATIONS
              </Typography>
              <Typography variant="caption" sx={{ color: '#D5E2EC', display: 'block' }}>
                • NITI Aayog Darpan ID: <strong>DL/2021/0289412</strong>
              </Typography>
              <Typography variant="caption" sx={{ color: '#D5E2EC', display: 'block' }}>
                • Trust PAN Number: <strong>AAATH9921D</strong>
              </Typography>
              <Typography variant="caption" sx={{ color: '#D5E2EC', display: 'block' }}>
                • Section 80G Certificate: <strong>CIT(E)/DEL/80G/2021-22/A/1042</strong>
              </Typography>
              <Typography variant="caption" sx={{ color: '#D5E2EC', display: 'block' }}>
                • Section 12A Registration: <strong>CIT(E)/DEL/12A/2021-22/A/5820</strong>
              </Typography>
            </Box>
          </Grid>

          {/* Col 2: Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle2" fontWeight={800} color="#FFFFFF" mb={2.5}>
              OUR WORK
            </Typography>
            <Stack spacing={1.5}>
              <Typography component={RouterLink} to="/causes" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Education for All
              </Typography>
              <Typography component={RouterLink} to="/causes" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Healthcare Access
              </Typography>
              <Typography component={RouterLink} to="/causes" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Hunger Relief
              </Typography>
              <Typography component={RouterLink} to="/causes" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Women Empowerment
              </Typography>
              <Typography component={RouterLink} to="/causes" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Clean Environment
              </Typography>
              <Typography component={RouterLink} to="/causes" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Child Welfare
              </Typography>
            </Stack>
          </Grid>

          {/* Col 3: Organization & Governance */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle2" fontWeight={800} color="#FFFFFF" mb={2.5}>
              TRANSPARENCY
            </Typography>
            <Stack spacing={1.5}>
              <Typography component={RouterLink} to="/about" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                About Our Trust
              </Typography>
              <Typography component={RouterLink} to="/impact" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Audited Impact
              </Typography>
              <Typography component={RouterLink} to="/stories" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Verified Stories
              </Typography>
              <Typography component={RouterLink} to="/lookup-receipt" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Download 80G Receipt
              </Typography>
              <Typography component={RouterLink} to="/donation-faq" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Donation FAQs
              </Typography>
              <Typography component={RouterLink} to="/volunteer" sx={{ color: '#A0B4C4', textDecoration: 'none', fontSize: '0.88rem', '&:hover': { color: '#34D399' } }}>
                Volunteer With Us
              </Typography>
            </Stack>
          </Grid>

          {/* Col 4: UPI ID & Newsletter */}
          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="subtitle2" fontWeight={800} color="#FFFFFF" mb={2}>
              DIRECT DONATION VIA UPI
            </Typography>
            <Box sx={{ p: 2, bgcolor: '#162F43', borderRadius: 2.5, border: '1px solid #234664', mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <QrCodeRoundedIcon sx={{ color: '#34D399' }} />
                <Typography variant="body2" fontWeight={700} color="#FFFFFF">
                  Primary Indian UPI ID
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                fontWeight={800}
                sx={{ fontFamily: 'monospace', color: '#FBBF24', letterSpacing: '0.5px' }}
              >
                tarun-tiwari@ptyes
              </Typography>
              <Typography variant="caption" sx={{ color: '#9BB2C4', display: 'block', mt: 0.5 }}>
                100% direct contribution. Instant 80G Tax Exemption Certificate issued.
              </Typography>
            </Box>

            <Typography variant="subtitle2" fontWeight={800} color="#FFFFFF" mb={1}>
              STAY UPDATED
            </Typography>
            <Typography variant="caption" sx={{ color: '#97AAB8', display: 'block', mb: 1.5 }}>
              Receive our quarterly verified field impact reports and audited financial statements.
            </Typography>

            <Box component="form" onSubmit={handleSubscribe}>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': { fontSize: '0.85rem' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={submitting}
                  sx={{ px: 2.5, whiteSpace: 'nowrap' }}
                >
                  Join
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#23384B', mb: 3 }} />

        {/* Legal Policies & Disclosures Row */}
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={7}>
            <Stack direction="row" flexWrap="wrap" gap={{ xs: 1.5, sm: 3 }}>
              <Typography component={RouterLink} to="/privacy-policy" sx={{ color: '#889DAE', textDecoration: 'none', fontSize: '0.78rem', '&:hover': { color: '#FFFFFF' } }}>
                Privacy Policy (DPDP Act)
              </Typography>
              <Typography component={RouterLink} to="/terms" sx={{ color: '#889DAE', textDecoration: 'none', fontSize: '0.78rem', '&:hover': { color: '#FFFFFF' } }}>
                Terms & Conditions
              </Typography>
              <Typography component={RouterLink} to="/refund-policy" sx={{ color: '#889DAE', textDecoration: 'none', fontSize: '0.78rem', '&:hover': { color: '#FFFFFF' } }}>
                Donation Refund Policy
              </Typography>
              <Typography component={RouterLink} to="/contact" sx={{ color: '#889DAE', textDecoration: 'none', fontSize: '0.78rem', '&:hover': { color: '#FFFFFF' } }}>
                Grievance Officer: grievance@helpingindia.org
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography variant="caption" sx={{ color: '#73899B' }}>
              © {new Date().getFullYear()} Helping India Foundation. All rights reserved.
            </Typography>
          </Grid>
        </Grid>

        {/* FCRA & Indian Contribution Notice */}
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #1C2E3E' }}>
          <Typography variant="caption" sx={{ color: '#687E90', display: 'block', lineHeight: 1.6, fontSize: '0.72rem' }}>
            <strong>Statutory Compliance Notice:</strong> In accordance with the Foreign Contribution (Regulation) Act (FCRA), 2010, Helping India Foundation accepts domestic contributions from Indian bank accounts, Indian cards, and Indian UPI only. Donations are eligible for 50% tax deduction under Section 80G of the Indian Income Tax Act, 1961.
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={notice.open}
        autoHideDuration={4000}
        onClose={() => setNotice({ ...notice, open: false })}
      >
        <Alert severity={notice.severity} sx={{ width: '100%' }}>
          {notice.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
