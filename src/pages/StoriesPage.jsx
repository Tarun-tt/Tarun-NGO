import React, { useState, useEffect } from 'react';
import {
  Container, Box, Typography, Grid, Card, CardContent, CardMedia,
  Chip, Paper, Stack, Skeleton, Button, Tabs, Tab
} from '@mui/material';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { api } from '../api/client';
import { fallbackStories } from '../utils/fallbackData';
import { useDonation } from '../context/DonationContext';

const categories = ['All', 'Emergency Relief', 'Child Welfare & Education', 'Healthcare', 'Women Empowerment', 'Hunger & Shelter', 'Environment'];

export default function StoriesPage() {
  const { openDonationModal } = useDonation();
  const [stories, setStories] = useState(fallbackStories);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api.getStories()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setStories(data);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, []);

  const safeStories = Array.isArray(stories) ? stories : fallbackStories;
  const filteredStories = activeCategory === 'All'
    ? safeStories
    : safeStories.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(s.category.toLowerCase()));

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, bgcolor: '#F8FAF9' }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 850, mb: 5 }}>
          <Chip
            icon={<VerifiedRoundedIcon sx={{ fontSize: '18px !important', color: '#087A52 !important' }} />}
            label="VERIFIED FIELD INCIDENTS & GROUND ASSESSMENTS"
            sx={{ bgcolor: '#E4F6ED', color: '#087A52', fontWeight: 800, mb: 1.5 }}
          />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.2rem' }, mb: 2 }}>
            Real Incidents. Real Lives Saved.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.15rem', lineHeight: 1.8 }}>
            These are not abstract statistics. They are real-life incidents from flood relief camps, remote mountain clinics, urban slums, and dry hamlets where your generosity stepped in at the most critical hour.
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Box mb={5}>
          <Tabs
            value={activeCategory}
            onChange={(e, val) => setActiveCategory(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 3,
              p: 0.5,
              border: '1px solid #DCE6E1',
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTab-root': {
                borderRadius: 2.5,
                fontWeight: 700,
                fontSize: '0.86rem',
                minHeight: 40,
                color: '#526677',
                '&.Mui-selected': { bgcolor: '#087A52', color: '#FFFFFF' },
              },
            }}
          >
            {categories.map((cat) => (
              <Tab key={cat} value={cat} label={cat} />
            ))}
          </Tabs>
        </Box>

        <Grid container spacing={4}>
          {loading ? (
            Array.from(new Array(3)).map((_, i) => (
              <Grid item xs={12} key={i}>
                <Skeleton variant="rounded" height={340} />
              </Grid>
            ))
          ) : filteredStories.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="h6" color="text.secondary">
                  No stories found for this category.
                </Typography>
              </Paper>
            </Grid>
          ) : (
            filteredStories.map((story) => (
              <Grid item xs={12} key={story.id}>
                <Card sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #DCE6E1', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={story.image_url}
                        alt={story.title}
                        onError={(e) => {
                          e.currentTarget.src = './images/story-aarav.jpg';
                        }}
                        sx={{ minHeight: { xs: 240, md: 380 }, objectFit: 'cover' }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <CardContent sx={{ p: { xs: 3, md: 4.5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5} flexWrap="wrap" gap={1}>
                          <Chip label={story.category} size="small" sx={{ bgcolor: '#E4F6ED', color: '#087A52', fontWeight: 800 }} />
                          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: '#657889' }}>
                            <LocationOnRoundedIcon sx={{ fontSize: 16 }} />
                            <Typography variant="caption" fontWeight={600}>{story.location}</Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: '#657889' }}>
                            <CalendarMonthRoundedIcon sx={{ fontSize: 16 }} />
                            <Typography variant="caption" fontWeight={600}>{story.date}</Typography>
                          </Stack>
                        </Stack>

                        <Typography variant="h4" fontWeight={800} color="#172B3A" mb={1.5} sx={{ fontSize: { xs: '1.4rem', md: '1.8rem' }, lineHeight: 1.3 }}>
                          {story.title}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2.5 }}>
                          {story.content}
                        </Typography>

                        {story.quote && (
                          <Box sx={{ p: 2, bgcolor: '#F4FAF7', borderRadius: 2.5, borderLeft: '4px solid #087A52', mb: 3 }}>
                            <Stack direction="row" spacing={1} alignItems="flex-start">
                              <FormatQuoteRoundedIcon sx={{ color: '#087A52', transform: 'rotate(180deg)', fontSize: 24 }} />
                              <Box>
                                <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#172B3A', fontWeight: 500 }}>
                                  "{story.quote}"
                                </Typography>
                                <Typography variant="caption" fontWeight={700} color="#087A52" sx={{ mt: 0.5, display: 'block' }}>
                                  — {story.beneficiary_name}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        )}

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<FavoriteRoundedIcon />}
                            onClick={() => openDonationModal({ campaignTitle: `Support ${story.category} Initiatives`, presetAmount: 1000 })}
                            sx={{ py: 1.2, px: 3, fontWeight: 800 }}
                          >
                            Help Cases Like This
                          </Button>
                          <Typography variant="caption" color="text.secondary">
                            ⚡ 100% funds directed to verified field relief via <strong>tarun-tiwari@ptyes</strong>
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}
