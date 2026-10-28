import React, { useState, useEffect } from 'react';
import {
  Container, Box, Typography, Grid, Card, CardMedia, CardContent,
  Chip, Dialog, DialogContent, IconButton, Tabs, Tab, Skeleton
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { api } from '../api/client';
import { fallbackGallery } from '../utils/fallbackData';

const categories = ['All', 'Education', 'Healthcare', 'Hunger Relief', 'Women Empowerment', 'Environment', 'Child Welfare'];

export default function GalleryPage() {
  const [items, setItems] = useState(fallbackGallery);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    api.getGallery()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, []);

  const safeItems = Array.isArray(items) ? items : fallbackGallery;
  const filtered = activeCategory === 'All' ? safeItems : safeItems.filter((i) => i.category === activeCategory);

  return (
    <Box sx={{ py: { xs: 6, md: 9 } }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 800, mb: 5 }}>
          <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
            ON-GROUND INITIATIVES
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '3.2rem' }, mt: 0.5, mb: 2 }}>
            Field Activity Gallery
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Authentic photographs captured by our field coordinators and volunteers across medical camps, learning centers, and village drives.
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
                '&.Mui-selected': { bgcolor: '#087A52', color: '#FFFFFF' },
              },
            }}
          >
            {categories.map((cat) => (
              <Tab key={cat} value={cat} label={cat} />
            ))}
          </Tabs>
        </Box>

        {/* Gallery Grid */}
        <Grid container spacing={3}>
          {loading ? (
            Array.from(new Array(6)).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rounded" height={280} />
              </Grid>
            ))
          ) : (
            filtered.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  onClick={() => setSelectedPhoto(item)}
                  sx={{
                    borderRadius: 3.5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 28px rgba(8, 122, 82, 0.12)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.image_url}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=85';
                    }}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 2.5 }}>
                    <Chip label={item.category} size="small" sx={{ mb: 1, bgcolor: '#EBF6F1', color: '#087A52', fontWeight: 700 }} />
                    <Typography variant="subtitle1" fontWeight={800} color="#172B3A" sx={{ lineHeight: 1.3 }}>
                      {item.title}
                    </Typography>
                    {item.caption && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {item.caption}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Modal Lightbox */}
        <Dialog
          open={Boolean(selectedPhoto)}
          onClose={() => setSelectedPhoto(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}
        >
          {selectedPhoto && (
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={() => setSelectedPhoto(null)}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: '#FFFFFF',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                  zIndex: 2,
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
              <Box
                component="img"
                src={selectedPhoto.image_url}
                alt={selectedPhoto.title}
                sx={{ width: '100%', maxHeight: 520, objectFit: 'cover', display: 'block' }}
              />
              <Box sx={{ p: 3, bgcolor: '#FFFFFF' }}>
                <Chip label={selectedPhoto.category} size="small" sx={{ mb: 1, bgcolor: '#EBF6F1', color: '#087A52', fontWeight: 800 }} />
                <Typography variant="h5" fontWeight={800} color="#172B3A" mb={1}>
                  {selectedPhoto.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedPhoto.description || selectedPhoto.caption}
                </Typography>
              </Box>
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}
