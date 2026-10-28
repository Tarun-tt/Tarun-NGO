import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardMedia, CardContent, Button,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Stack, Alert, MenuItem, Chip
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { api } from '../../api/client';

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notice, setNotice] = useState({ open: false, message: '', severity: 'success' });

  const [formData, setFormData] = useState({
    title: '',
    category: 'Education',
    image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    description: '',
    caption: '',
  });

  const loadData = async () => {
    try {
      const data = await api.getGallery();
      setGallery(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.createGallery(formData);
      setNotice({ open: true, message: 'Photo added to official gallery', severity: 'success' });
      setDialogOpen(false);
      loadData();
    } catch (err) {
      setNotice({ open: true, message: err.message || 'Failed', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this gallery photo?')) {
      try {
        await api.deleteGallery(id);
        setNotice({ open: true, message: 'Photo deleted', severity: 'success' });
        loadData();
      } catch (err) {
        setNotice({ open: true, message: err.message || 'Failed', severity: 'error' });
      }
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3.5}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#172B3A">
            NGO Activity Photo Gallery
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage authenticated field photographs across initiatives.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={() => setDialogOpen(true)}>
          Add Photo
        </Button>
      </Stack>

      {notice.open && (
        <Alert severity={notice.severity} sx={{ mb: 3 }} onClose={() => setNotice({ ...notice, open: false })}>
          {notice.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {gallery.map((g) => (
          <Grid item xs={12} sm={6} md={4} key={g.id}>
            <Card sx={{ borderRadius: 3, border: '1px solid #DCE6E1', position: 'relative' }}>
              <CardMedia component="img" height="190" image={g.image_url} alt={g.title} sx={{ objectFit: 'cover' }} />
              <IconButton
                size="small"
                onClick={() => handleDelete(g.id)}
                sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(255,255,255,0.85)', color: '#DC2626' }}
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
              <CardContent sx={{ p: 2 }}>
                <Chip label={g.category} size="small" sx={{ mb: 1 }} />
                <Typography variant="subtitle2" fontWeight={800} color="#172B3A" noWrap>
                  {g.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {g.caption || g.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Add Verified Photo</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Photo Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextField
              select
              fullWidth
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Hunger Relief">Hunger Relief</MenuItem>
              <MenuItem value="Women Empowerment">Women Empowerment</MenuItem>
              <MenuItem value="Environment">Environment</MenuItem>
              <MenuItem value="Child Welfare">Child Welfare</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Caption / Context"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleCreate}>Add to Gallery</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
