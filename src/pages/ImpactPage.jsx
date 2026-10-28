import React from 'react';
import { Container, Box, Typography, Grid, Paper, Stack, LinearProgress, Divider, Chip } from '@mui/material';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import AnimatedCounter from '../components/common/AnimatedCounter';

export default function ImpactPage() {
  const metrics = [
    {
      icon: <GroupsRoundedIcon sx={{ fontSize: 28 }} />,
      number: '50,000+',
      title: 'Beneficiaries Reached',
      desc: 'Direct assistance across rural and semi-urban communities in 15 states.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <SchoolRoundedIcon sx={{ fontSize: 28 }} />,
      number: '200+',
      title: 'Education Support Centers',
      desc: 'Evening remedial learning, STEM study kits, and school supplies.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <HealthAndSafetyRoundedIcon sx={{ fontSize: 28 }} />,
      number: '150+',
      title: 'Mobile Healthcare Camps',
      desc: 'Free diagnostic checkups, maternal care, and doctor consultations.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <RestaurantRoundedIcon sx={{ fontSize: 28 }} />,
      number: '120,000+',
      title: 'Nutritious Meals Served',
      desc: 'Hot meals served through Annapoorna community kitchens.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <ParkRoundedIcon sx={{ fontSize: 28 }} />,
      number: '50,000+',
      title: 'Native Trees Planted',
      desc: 'Ecological restoration and groundwater rejuvenation with native saplings.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    },
    {
      icon: <PublicRoundedIcon sx={{ fontSize: 28 }} />,
      number: '15',
      title: 'Indian States Covered',
      desc: 'Active field projects across North, Central, and Eastern India.',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const fundBreakdown = [
    { label: 'Direct Program Implementation (Education, Health, Meals)', percent: 84, color: '#087A52' },
    { label: 'Field Logistics, Monitoring & Baseline Verification', percent: 9, color: '#12A36D' },
    { label: 'Statutory Audits, Governance & Legal Compliance', percent: 4, color: '#F59E0B' },
    { label: 'Technology, Receipting & Donor Relations', percent: 3, color: '#3B82F6' },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ maxWidth: 800, mb: 6 }}>
          <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
            MEASURABLE SOCIAL IMPACT
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.2rem' }, mt: 0.5, mb: 2 }}>
            Transparent Reporting. Verified Outcomes.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            We believe that every donor deserves to know exactly where their rupee travels and what tangible changes it creates in real people's lives.
          </Typography>
        </Box>

        {/* Metrics Grid with Running Counters and Authentic Images */}
        <Grid container spacing={3} mb={8}>
          {metrics.map((m) => (
            <Grid item xs={12} sm={6} md={4} key={m.title}>
              <Paper
                elevation={0}
                sx={{
                  overflow: 'hidden',
                  borderRadius: 3.5,
                  border: '1.5px solid #E2ECE6',
                  bgcolor: '#FAFDFB',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 28px rgba(8, 122, 82, 0.08)',
                  },
                }}
              >
                <Box sx={{ height: 160, position: 'relative', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={m.image}
                    alt={m.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80';
                    }}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      left: 12,
                      width: 42,
                      height: 42,
                      borderRadius: 2.5,
                      bgcolor: 'rgba(255, 255, 255, 0.95)',
                      color: '#087A52',
                      display: 'grid',
                      placeItems: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    {m.icon}
                  </Box>
                </Box>

                <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <AnimatedCounter
                    target={m.number}
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: '#087A52',
                      fontFamily: '"Manrope", sans-serif',
                      mb: 0.5,
                    }}
                  />
                  <Typography variant="h6" fontWeight={800} color="#172B3A" mb={1}>
                    {m.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {m.desc}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Fund Utilization Section */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1.5px solid #D5E8DD', mb: 8 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
            <VerifiedUserRoundedIcon sx={{ color: '#087A52', fontSize: 28 }} />
            <Typography variant="h4" fontWeight={800} color="#172B3A">
              Where Your Donation Goes (Fund Utilization)
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Based on independently audited financial statements filed with the Registrar of Public Trusts and Income Tax authorities.
          </Typography>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={3}>
                {fundBreakdown.map((item) => (
                  <Box key={item.label}>
                    <Stack direction="row" justifyContent="space-between" mb={0.8}>
                      <Typography variant="subtitle2" fontWeight={700} color="#172B3A">
                        {item.label}
                      </Typography>
                      <AnimatedCounter
                        target={item.percent}
                        suffix="%"
                        variant="subtitle2"
                        sx={{ fontWeight: 800, color: item.color }}
                      />
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={item.percent}
                      sx={{
                        height: 10,
                        bgcolor: '#EEF4F0',
                        '& .MuiLinearProgress-bar': { bgcolor: item.color },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box sx={{ p: 3, bgcolor: '#F4FAF7', borderRadius: 3, border: '1px solid #D7EDE1' }}>
                <Typography variant="subtitle1" fontWeight={800} color="#087A52" mb={1}>
                  Our 84/16 Commitment
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                  A minimum of 84 paise of every rupee directly funds on-ground beneficiary supplies, classrooms, medicine stocks, and sapling plantation drives. Administrative overhead is capped stringently at under 7%.
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CheckCircleRoundedIcon sx={{ color: '#087A52', fontSize: 18 }} />
                  <Typography variant="caption" fontWeight={700} color="#172B3A">
                    Audited by Independent Chartered Accountants
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
