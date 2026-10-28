import React, { useState, useEffect } from 'react';
import {
  Container, Box, Typography, Grid, Card, CardContent, CardMedia,
  Chip, Paper, Stack, Skeleton
} from '@mui/material';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { api } from '../api/client';
import { fallbackStories } from '../utils/fallbackData';

export default function StoriesPage() {
  const [stories, setStories] = useState(fallbackStories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getStories()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setStories(data);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, []);

  const safeStories = Array.isArray(stories) ? stories : fallbackStories;

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, bgcolor: '#F8FAF9' }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 800, mb: 6 }}>
          <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
            STORIES OF IMPACT
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.2rem' }, mt: 0.5, mb: 2 }}>
            Real People. Real Transformations.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Every statistic on our platform represents a human life touched, an opportunity unlocked, and a family lifted. Read documented accounts from our field centers.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {loading ? (
            Array.from(new Array(3)).map((_, i) => (
              <Grid item xs={12} key={i}>
                <Skeleton variant="rounded" height={340} />
              </Grid>
            ))
          ) : (
            safeStories.map((story) => (
              <Grid item xs={12} key={story.id}>
                <Card sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #DCE6E1' }}>
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
                        sx={{ minHeight: { xs: 240, md: 360 }, objectFit: 'cover' }}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <CardContent sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
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

                        <Typography variant="h4" fontWeight={800} color="#172B3A" mb={2} sx={{ fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
                          {story.title}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
                          {story.content}
                        </Typography>

                        {story.quote && (
                          <Box sx={{ p: 2, bgcolor: '#FAFDFB', borderRadius: 2.5, borderLeft: '4px solid #087A52' }}>
                            <Stack direction="row" spacing={1} alignItems="flex-start">
                              <FormatQuoteRoundedIcon sx={{ color: '#087A52', transform: 'rotate(180deg)', fontSize: 24 }} />
                              <Box>
                                <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#172B3A' }}>
                                  "{story.quote}"
                                </Typography>
                                <Typography variant="caption" fontWeight={700} color="#087A52" sx={{ mt: 0.5, display: 'block' }}>
                                  — {story.beneficiary_name}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        )}
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
