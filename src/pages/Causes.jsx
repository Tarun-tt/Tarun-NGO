import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, Grid, Card, CardContent, CardMedia,
  Button, Chip, LinearProgress, Stack, TextField, Tabs, Tab, Skeleton
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { api } from '../api/client';
import { useDonation } from '../context/DonationContext';
import { formatINR, calcPercentage } from '../utils/formatters';
import { fallbackCampaigns } from '../utils/fallbackData';
import AnimatedCounter from '../components/common/AnimatedCounter';
import AnimatedProgressBar from '../components/common/AnimatedProgressBar';

const categories = ['All', 'Education', 'Healthcare', 'Hunger Relief', 'Women Empowerment', 'Environment', 'Child Welfare'];

export default function Causes() {
  const { openDonationModal } = useDonation();
  const [campaigns, setCampaigns] = useState(fallbackCampaigns);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const data = await api.getCampaigns(activeCategory);
        if (Array.isArray(data) && data.length > 0) {
          setCampaigns(data);
        }
      } catch (err) {
        console.warn('Using seeded campaigns fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCampaigns();
  }, [activeCategory]);

  const safeList = Array.isArray(campaigns) ? campaigns : fallbackCampaigns;
  const filtered = safeList.filter((c) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return c.title.toLowerCase().includes(term) || c.description.toLowerCase().includes(term);
  });

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ maxWidth: 750, mb: 4 }}>
          <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
            VERIFIED SOCIAL CAUSES
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.2rem' }, mt: 0.5, mb: 2 }}>
            Make Your Kindness Count Where It Matters Most.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
            Every campaign below is backed by verified field assessments, detailed program budgets, and regular progress reports. Choose a cause close to your heart.
          </Typography>
        </Box>

        {/* Filter & Search Bar */}
        <Box sx={{ mb: 5 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={8}>
              <Tabs
                value={activeCategory}
                onChange={(e, val) => setActiveCategory(val)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  bgcolor: '#F3F7F5',
                  borderRadius: 3,
                  p: 0.5,
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTab-root': {
                    borderRadius: 2.5,
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    minHeight: 40,
                    color: '#526677',
                    '&.Mui-selected': {
                      bgcolor: '#087A52',
                      color: '#FFFFFF',
                    },
                  },
                }}
              >
                {categories.map((cat) => (
                  <Tab key={cat} value={cat} label={cat} />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search campaigns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchRoundedIcon sx={{ color: '#526677', mr: 1 }} />,
                }}
                sx={{ bgcolor: '#FFFFFF' }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Campaign Cards Grid */}
        <Grid container spacing={3}>
          {loading ? (
            Array.from(new Array(6)).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rounded" height={420} />
              </Grid>
            ))
          ) : filtered.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No campaigns found matching your criteria.
                </Typography>
              </Box>
            </Grid>
          ) : (
            filtered.map((campaign) => {
              const percentage = calcPercentage(campaign.raised_amount, campaign.target_amount);
              return (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      transition: 'transform 0.25s, box-shadow 0.25s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 16px 36px rgba(23, 43, 58, 0.08)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 210 }}>
                      <CardMedia
                        component="img"
                        height="210"
                        image={campaign.image_url}
                        alt={campaign.title}
                        onError={(e) => {
                          e.currentTarget.src = './images/education.jpg';
                        }}
                        sx={{ objectFit: 'cover' }}
                      />
                      <Chip
                        label={campaign.category}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          bgcolor: 'rgba(255, 255, 255, 0.95)',
                          color: '#087A52',
                          fontWeight: 800,
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" fontWeight={800} color="#172B3A" mb={1} sx={{ lineHeight: 1.3 }}>
                        {campaign.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.65,
                          mb: 2.5,
                          flexGrow: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {campaign.description}
                      </Typography>

                      <Box sx={{ mb: 2.5 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.8}>
                          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                            <AnimatedCounter target={campaign.raised_amount} prefix="₹" variant="body2" sx={{ fontWeight: 800, color: '#087A52' }} />
                            <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#526677' }}>raised</span>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Goal: <strong>{formatINR(campaign.target_amount)}</strong>
                          </Typography>
                        </Stack>
                        <AnimatedProgressBar value={percentage} height={8} />
                        <Stack direction="row" justifyContent="space-between" mt={0.8}>
                          <AnimatedCounter
                            target={percentage}
                            suffix="% funded"
                            variant="caption"
                            sx={{ color: '#526677', fontWeight: 600 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            <strong><AnimatedCounter target={campaign.donor_count || 0} variant="caption" sx={{ fontWeight: 700, color: '#172B3A' }} /></strong> confirmed donors
                          </Typography>
                        </Stack>
                      </Box>

                      <Stack direction="row" spacing={1.5}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          startIcon={<FavoriteRoundedIcon />}
                          onClick={() => openDonationModal({ campaignId: campaign.id, campaignTitle: campaign.title })}
                        >
                          Donate
                        </Button>
                        <Button
                          variant="outlined"
                          color="inherit"
                          component={RouterLink}
                          to={`/causes/${campaign.slug}`}
                          sx={{ borderColor: '#CADCD2', color: '#172B3A', whiteSpace: 'nowrap' }}
                        >
                          Details
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>
    </Box>
  );
}
