import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, CardMedia,
  Button, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Stack, Alert, Chip, MenuItem
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { api } from '../../api/client';

export default function AdminStories() {
  const [stories, setStories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notice, setNotice] = useState({ open: false, message: '', severity: 'success' });

  const [formData, setFormData] = useState({
    title: '',
    category: 'Education',
    summary: '',
    content: '',
    beneficiary_name: '',
    location: '',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    quote: '',
    date: 'Current Month',
  });

  const loadData = async () => {
    try {
      const data = await api.getStories();
      setStories(data);
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
      await api.createStory(formData);
      setNotice({ open: true, message: 'Impact story published!', severity: 'success' });
      setDialogOpen(false);
      loadData();
    } catch (err) {
      setNotice({ open: true, message: err.message || 'Creation failed', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this impact story?')) {
      try {
        await api.deleteStory(id);
        setNotice({ open: true, message: 'Story deleted', severity: 'success' });
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
            Verified Impact Stories
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Publish verified beneficiary case studies and field reports.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={() => setDialogOpen(true)}>
          New Story
        </Button>
      </Stack>

      {notice.open && (
        <Alert severity={notice.severity} sx={{ mb: 3 }} onClose={() => setNotice({ ...notice, open: false })}>
          {notice.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {stories.map((s) => (
          <Grid item xs={12} md={6} key={s.id}>
            <Card sx={{ borderRadius: 3, border: '1px solid #DCE6E1', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="img" height="180" image={s.image_url} alt={s.title} sx={{ objectFit: 'cover' }} />
              <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Chip label={s.category} size="small" />
                  <IconButton size="small" color="error" onClick={() => handleDelete(s.id)}>
                    <DeleteOutlineRoundedIcon fontSize="small" />
                  </IconButton>
                </Stack>
                <Typography variant="h6" fontWeight={800} color="#172B3A" mb={1}>
                  {s.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                  {s.summary}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Beneficiary: <strong>{s.beneficiary_name}</strong> · {s.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Modal */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Publish Impact Story</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Story Title"
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
              label="Beneficiary Name (or Pseudonym with Consent)"
              value={formData.beneficiary_name}
              onChange={(e) => setFormData({ ...formData, beneficiary_name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Location (City, State)"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Summary (1-2 sentences)"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              required
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Full Story & Measurable Outcome"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Quote from Beneficiary"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            />
            <TextField
              fullWidth
              label="Photograph Image URL"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleCreate}>Publish Story</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
