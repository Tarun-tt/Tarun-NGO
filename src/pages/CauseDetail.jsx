import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Paper, Stack, Button, Chip,
  LinearProgress, Divider, Avatar, List, ListItem, ListItemAvatar,
  ListItemText, Breadcrumbs, Link, Skeleton, Alert
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { api } from '../api/client';
import { useDonation } from '../context/DonationContext';
import { formatINR, formatDate, calcPercentage } from '../utils/formatters';
import { fallbackCampaigns } from '../utils/fallbackData';
import AnimatedCounter from '../components/common/AnimatedCounter';

export default function CauseDetail() {
  const { slug } = useParams();
  const { openDonationModal } = useDonation();
  const [campaign, setCampaign] = useState(() => fallbackCampaigns.find((c) => c.slug === slug || c.id === slug) || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCampaign() {
      try {
        const data = await api.getCampaign(slug);
        if (data && data.title) {
          setCampaign(data);
        }
      } catch (err) {
        const fallback = fallbackCampaigns.find((c) => c.slug === slug || c.id === slug);
        if (fallback) {
          setCampaign(fallback);
        } else {
          setError(err.message || 'Campaign not found');
        }
      } finally {
        setLoading(false);
      }
    }
    loadCampaign();
  }, [slug]);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Skeleton variant="rounded" height={400} sx={{ mb: 3 }} />
        <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={100} />
      </Container>
    );
  }

  if (error || !campaign) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Unable to load campaign details'}
        </Alert>
        <Button component={RouterLink} to="/causes" variant="contained">
          Back to Causes
        </Button>
      </Container>
    );
  }

  const percentage = calcPercentage(campaign.raised_amount, campaign.target_amount);
  const remaining = Math.max(0, campaign.target_amount - campaign.raised_amount);

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextRoundedIcon fontSize="small" />}
          sx={{ mb: 3 }}
          aria-label="breadcrumb"
        >
          <Link component={RouterLink} to="/" color="inherit" underline="hover">
            Home
          </Link>
          <Link component={RouterLink} to="/causes" color="inherit" underline="hover">
            Causes
          </Link>
          <Typography color="text.primary" fontWeight={700}>
            {campaign.category}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Left Column: Image, Story, Objectives, Donor Wall */}
          <Grid item xs={12} lg={8}>
            <Box
              component="img"
              src={campaign.image_url}
              alt={campaign.title}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85';
              }}
              sx={{
                width: '100%',
                maxHeight: 460,
                objectFit: 'cover',
                borderRadius: 4,
                mb: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            />

            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
              <Chip
                label={campaign.category}
                sx={{ bgcolor: '#E4F6ED', color: '#087A52', fontWeight: 800, fontSize: '0.82rem' }}
              />
              <Chip
                icon={<CheckCircleRoundedIcon sx={{ fontSize: '16px !important', color: '#087A52 !important' }} />}
                label="Verified Field Initiative"
                size="small"
                variant="outlined"
                sx={{ borderColor: '#BCE2D0', color: '#087A52', fontWeight: 700 }}
              />
            </Stack>

            <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, lineHeight: 1.2, mb: 2.5 }}>
              {campaign.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.15rem', lineHeight: 1.8, mb: 4 }}>
              {campaign.description}
            </Typography>

            <Divider sx={{ my: 4, borderColor: '#E5EDE8' }} />

            {/* Campaign Background Story */}
            <Typography variant="h4" fontWeight={800} color="#172B3A" mb={2}>
              Background & The Need on the Ground
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 4, whiteSpace: 'pre-line' }}>
              {campaign.story}
            </Typography>

            {/* What Your Contribution Supports */}
            <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, bgcolor: '#FAFDFB', border: '1.5px solid #D5E8DD', mb: 5 }}>
              <Typography variant="h5" fontWeight={800} color="#087A52" mb={1.5}>
                Program Implementation & Transparency
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                Helping India conducts baseline surveys before launching field drives. Our local project coordinators oversee the execution, and photographic progress updates along with expense vouchers are filed in our central project repository.
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <ShieldRoundedIcon sx={{ color: '#087A52', fontSize: 18 }} />
                <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 700 }}>
                  100% Tax Deductible under Section 80G · Direct Account Settlement
                </Typography>
              </Stack>
            </Paper>

            {/* Public Donor Wall */}
            <Box>
              <Typography variant="h5" fontWeight={800} color="#172B3A" mb={1}>
                Recent Supporters ({campaign.recentDonors?.length || 0})
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2.5}>
                Thank you to the kind individuals making this campaign a reality.
              </Typography>

              {campaign.recentDonors?.length > 0 ? (
                <List sx={{ bgcolor: '#FFFFFF', borderRadius: 3, border: '1px solid #EBF1ED', p: 1 }}>
                  {campaign.recentDonors.map((d, index) => (
                    <ListItem key={index} divider={index < campaign.recentDonors.length - 1}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#E4F6ED', color: '#087A52' }}>
                          <PersonRoundedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2" fontWeight={800} color="#172B3A">
                              {d.name}
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={800} color="#087A52">
                              {formatINR(d.amount)}
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(d.created_at)} {d.notes ? `— "${d.notes}"` : ''}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Be the first supporter to back this initiative!
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Right Column: Sticky Donation Card */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: { lg: 'sticky' }, top: { lg: 100 } }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: '2px solid #E2ECE6',
                  bgcolor: '#FFFFFF',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                }}
              >
                <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" mb={0.5}>
                  FUNDRAISING PROGRESS
                </Typography>
                <AnimatedCounter
                  target={campaign.raised_amount}
                  prefix="₹"
                  variant="h3"
                  sx={{ fontWeight: 800, color: '#087A52', fontFamily: '"Manrope", sans-serif', mb: 0.5 }}
                />
                <Typography variant="body2" color="text.secondary" mb={2}>
                  raised of <strong>{formatINR(campaign.target_amount)}</strong> target
                </Typography>

                <LinearProgress variant="determinate" value={percentage} sx={{ height: 10, mb: 2 }} />

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Remaining
                    </Typography>
                    <AnimatedCounter
                      target={remaining}
                      prefix="₹"
                      variant="body1"
                      sx={{ fontWeight: 700, color: '#172B3A' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Confirmed Donors
                    </Typography>
                    <AnimatedCounter
                      target={campaign.donor_count || 0}
                      variant="body1"
                      sx={{ fontWeight: 700, color: '#172B3A' }}
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<FavoriteRoundedIcon />}
                  onClick={() => openDonationModal({ campaignId: campaign.id, campaignTitle: campaign.title })}
                  sx={{ py: 1.5, fontSize: '1rem', fontWeight: 800, mb: 2 }}
                >
                  Donate to this Cause
                </Button>

                {/* Quick Presets */}
                <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" mb={1} textAlign="center">
                  GIVE QUICK AMOUNT
                </Typography>
                <Stack direction="row" spacing={1} mb={2.5}>
                  {[500, 1000, 2500].map((amt) => (
                    <Button
                      key={amt}
                      variant="outlined"
                      size="small"
                      fullWidth
                      onClick={() => openDonationModal({ campaignId: campaign.id, campaignTitle: campaign.title, presetAmount: amt })}
                      sx={{ borderColor: '#D5E2DB', color: '#172B3A', fontWeight: 700 }}
                    >
                      {formatINR(amt)}
                    </Button>
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* UPI Direct Notice */}
                <Box sx={{ p: 2, bgcolor: '#F4FAF7', borderRadius: 2.5, border: '1px solid #D7EDE1' }}>
                  <Typography variant="caption" fontWeight={800} color="#087A52" display="block" mb={0.5}>
                    OFFICIAL UPI PAYMENT
                  </Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ fontFamily: 'monospace', color: '#172B3A' }}>
                    tarun-tiwari@ptyes
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                    Scan and pay directly. 100% funds allocated to this campaign.
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
