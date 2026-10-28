import React from 'react';
import { Container, Box, Typography, Grid, Paper, Stack, Divider, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import BalanceRoundedIcon from '@mui/icons-material/BalanceRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AnimatedCounter from '../components/common/AnimatedCounter';

export default function About() {
  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Grid container spacing={5} alignItems="center" mb={8}>
          <Grid item xs={12} md={7}>
            <Box sx={{ maxWidth: 750 }}>
              <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                ABOUT HELPING INDIA FOUNDATION
              </Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.2rem' }, mt: 0.5, mb: 2 }}>
                Dedicated to Dignity, Equity, and Sustainable Progress.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                Helping India is an Indian public charitable trust established to bring compassionate action, transparent governance, and measurable grassroots impact to underserved communities across 15 Indian states.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/donate"
                  startIcon={<FavoriteRoundedIcon />}
                  sx={{ py: 1.5, px: 3.5, fontWeight: 800 }}
                >
                  Support Our Mission
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={RouterLink}
                  to="/causes"
                  sx={{ borderColor: '#CADCD2', fontWeight: 700 }}
                >
                  View Initiatives
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 16px 40px rgba(8, 122, 82, 0.12)',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=85"
                alt="Helping India Community Volunteers"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=85';
                }}
                sx={{
                  width: '100%',
                  height: 380,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2.5,
                  background: 'linear-gradient(to top, rgba(23, 43, 58, 0.9) 0%, rgba(23, 43, 58, 0) 100%)',
                  color: '#FFFFFF',
                }}
              >
                <Typography variant="subtitle2" fontWeight={800}>
                  Grassroots Community Engagement
                </Typography>
                <Typography variant="caption" sx={{ color: '#D2ECE0' }}>
                  Field volunteers working directly with local self-help groups & children.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Running Counter Statistics Strip */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            bgcolor: '#F4FAF7',
            border: '1.5px solid #D5E8DD',
            mb: 8,
          }}
        >
          <Grid container spacing={3}>
            {[
              { label: 'Beneficiaries Supported', value: '50,000+', suffix: '+' },
              { label: 'Educational Programs', value: '200+', suffix: '+' },
              { label: 'Healthcare Initiatives', value: '150+', suffix: '+' },
              { label: 'Indian States Served', value: '15', suffix: '' },
            ].map((stat, i) => (
              <Grid item xs={6} md={3} key={stat.label}>
                <Box sx={{ textAlign: 'center', borderRight: { md: i < 3 ? '1px solid #D5E8DD' : 'none' } }}>
                  <AnimatedCounter
                    target={stat.value}
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: '#087A52',
                      fontFamily: '"Manrope", sans-serif',
                      lineHeight: 1.1,
                      mb: 0.5,
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#526677', fontWeight: 700 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Mission & Vision Grid */}
        <Grid container spacing={3} mb={8}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                bgcolor: '#FAFDFB',
                border: '1.5px solid #D5E8DD',
                height: '100%',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                <FlagRoundedIcon sx={{ fontSize: 32, color: '#087A52' }} />
                <Typography variant="h4" fontWeight={800} color="#172B3A">
                  Our Mission
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                To bridge socio-economic inequalities by delivering quality education, preventive healthcare, nutritional security, women livelihood empowerment, and environmental preservation directly at the community doorstep—executed with total financial transparency and accountability.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                bgcolor: '#FAFDFB',
                border: '1.5px solid #D5E8DD',
                height: '100%',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                <VisibilityRoundedIcon sx={{ fontSize: 32, color: '#087A52' }} />
                <Typography variant="h4" fontWeight={800} color="#172B3A">
                  Our Vision
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                An India where every child has access to inspiring classrooms, every family receives timely healthcare without financial ruin, women hold self-reliant economic agency, and communities preserve local ecosystems for future generations.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Core Values */}
        <Box mb={8}>
          <Typography variant="h3" fontWeight={800} mb={4} textAlign="center">
            Our Guiding Principles
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                icon: <SecurityRoundedIcon sx={{ fontSize: 36, color: '#087A52' }} />,
                title: 'Uncompromising Transparency',
                desc: 'Every rupee received is audited and accounted for. We publish open financial reports and verifiable beneficiary impact logs.',
              },
              {
                icon: <GroupsRoundedIcon sx={{ fontSize: 36, color: '#087A52' }} />,
                title: 'Community-Led Ownership',
                desc: 'We do not impose top-down solutions. Programs are designed in consultation with village panchayats and local women self-help groups.',
              },
              {
                icon: <BalanceRoundedIcon sx={{ fontSize: 36, color: '#087A52' }} />,
                title: 'Strict Legal Governance',
                desc: 'Registered under Indian Trusts Act, compliant with Income Tax Sections 12A & 80G, and mapped with NITI Aayog NGO Darpan.',
              },
            ].map((v) => (
              <Grid item xs={12} md={4} key={v.title}>
                <Card variant="outlined" sx={{ height: '100%', borderColor: '#E8EFEA' }}>
                  <CardContent sx={{ p: 3.5 }}>
                    <Box mb={2}>{v.icon}</Box>
                    <Typography variant="h6" fontWeight={800} mb={1}>
                      {v.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {v.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Bank & Legal Credentials Cards */}
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '2px solid #087A52', bgcolor: '#FAFDFB', height: '100%' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
                <AccountBalanceRoundedIcon sx={{ color: '#087A52', fontSize: 28 }} />
                <Typography variant="h5" fontWeight={800} color="#087A52">
                  Official Yes Bank Account
                </Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary" display="block" mb={3}>
                Direct NEFT / RTGS / IMPS Bank Transfer
              </Typography>

              <Stack spacing={2}>
                <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2.5, border: '1px solid #D5E8DD' }}>
                  <Typography variant="caption" color="text.secondary">Account Holder</Typography>
                  <Typography variant="subtitle1" fontWeight={800} color="#172B3A">Tarun Tiwari</Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2.5, border: '1px solid #D5E8DD' }}>
                  <Typography variant="caption" color="text.secondary">Bank Name</Typography>
                  <Typography variant="subtitle1" fontWeight={800} color="#172B3A">Yes Bank</Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2.5, border: '1px solid #D5E8DD' }}>
                  <Typography variant="caption" color="text.secondary">Account Number</Typography>
                  <Typography variant="subtitle1" fontWeight={800} color="#087A52">006691800137107</Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2.5, border: '1px solid #D5E8DD' }}>
                  <Typography variant="caption" color="text.secondary">IFSC Code</Typography>
                  <Typography variant="subtitle1" fontWeight={800} color="#172B3A">YESB0000002</Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: '#E4F6ED', borderRadius: 2.5, border: '1px solid #BCE5D0' }}>
                  <Typography variant="caption" color="text.secondary">Verified UPI ID</Typography>
                  <Typography variant="subtitle1" fontWeight={800} color="#087A52">tarun-tiwari@ptyes</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, bgcolor: '#F8FAF9', border: '1px solid #E1EBE5', height: '100%' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
                <VerifiedUserRoundedIcon sx={{ fontSize: 28, color: '#087A52' }} />
                <Typography variant="h5" fontWeight={800} color="#172B3A">
                  Statutory Credentials & Compliance Status
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Donors may verify our nonprofit credentials directly on official government portals:
              </Typography>

              <Grid container spacing={2}>
                {[
                  { label: 'Entity Name', value: 'Helping India Foundation' },
                  { label: 'Legal Structure', value: 'Registered Public Charitable Trust (Indian Trusts Act)' },
                  { label: 'NITI Aayog Darpan ID', value: 'DL/2021/0289412' },
                  { label: 'Permanent Account Number (PAN)', value: 'AAATH9921D' },
                  { label: 'Income Tax 80G Approval', value: 'CIT(E)/DEL/80G/2021-22/A/1042' },
                  { label: 'Income Tax 12A Registration', value: 'CIT(E)/DEL/12A/2021-22/A/5820' },
                  { label: 'Tax Deductibility', value: '50% deduction under Section 80G of Income Tax Act 1961' },
                  { label: 'Foreign Contributions (FCRA)', value: 'Domestic Indian Contributions Only (FCRA in review)' },
                ].map((row) => (
                  <Grid item xs={12} sm={6} key={row.label}>
                    <Box sx={{ p: 1.8, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E8EFEA' }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {row.label}
                      </Typography>
                      <Typography variant="body2" fontWeight={800} color="#172B3A" sx={{ mt: 0.3 }}>
                        {row.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
