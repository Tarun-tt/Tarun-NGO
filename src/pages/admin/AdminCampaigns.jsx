import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Chip, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, MenuItem, Stack, Alert,
  CircularProgress
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { api } from '../../api/client';
import { formatINR, calcPercentage } from '../../utils/formatters';

const categories = ['Education', 'Healthcare', 'Hunger Relief', 'Women Empowerment', 'Environment', 'Child Welfare'];

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState({ open: false, message: '', severity: 'success' });

  const [formData, setFormData] = useState({
    title: '',
    category: 'Education',
    target_amount: 500000,
    description: '',
    story: '',
    image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    featured: false,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.getCampaigns(null, true);
      setCampaigns(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Education',
      target_amount: 500000,
      description: '',
      story: '',
      image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      status: 'active',
      featured: false,
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingId(c.id);
    setFormData({
      title: c.title,
      category: c.category,
      target_amount: c.target_amount,
      description: c.description,
      story: c.story,
      image_url: c.image_url,
      status: c.status,
      featured: Boolean(c.featured),
    });
    setDialogOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.updateCampaign(editingId, formData);
        setNotice({ open: true, message: 'Campaign updated successfully!', severity: 'success' });
      } else {
        await api.createCampaign(formData);
        setNotice({ open: true, message: 'Campaign created successfully!', severity: 'success' });
      }
      setDialogOpen(false);
      loadData();
    } catch (err) {
      setNotice({ open: true, message: err.message || 'Operation failed', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete or archive this campaign?')) {
      try {
        await api.deleteCampaign(id);
        setNotice({ open: true, message: 'Campaign removed / archived.', severity: 'success' });
        loadData();
      } catch (err) {
        setNotice({ open: true, message: err.message || 'Action failed', severity: 'error' });
      }
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3.5}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#172B3A">
            Manage Fundraising Campaigns
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Publish, edit targets, update stories, and track verified totals.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" startIcon={<AddRoundedIcon />} onClick={handleOpenCreate}>
          New Campaign
        </Button>
      </Stack>

      {notice.open && (
        <Alert severity={notice.severity} sx={{ mb: 3 }} onClose={() => setNotice({ ...notice, open: false })}>
          {notice.message}
        </Alert>
      )}

      <Paper elevation={0} sx={{ borderRadius: 3.5, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F4FAF7' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Campaign Title</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Target</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Raised</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Progress</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : (
                campaigns.map((c) => {
                  const pct = calcPercentage(c.raised_amount, c.target_amount);
                  return (
                    <TableRow key={c.id}>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={800} color="#172B3A">
                          {c.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {c.donor_count || 0} donors
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={c.category} size="small" />
                      </TableCell>
                      <TableCell>{formatINR(c.target_amount)}</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#087A52' }}>
                        {formatINR(c.raised_amount)}
                      </TableCell>
                      <TableCell>{pct}%</TableCell>
                      <TableCell>
                        <Chip
                          label={c.status}
                          size="small"
                          sx={{
                            textTransform: 'capitalize',
                            fontWeight: 700,
                            bgcolor: c.status === 'active' ? '#E4F6ED' : '#F3F4F6',
                            color: c.status === 'active' ? '#087A52' : '#6B7280',
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => handleOpenEdit(c)} color="primary">
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDelete(c.id)} color="error">
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>
          {editingId ? 'Edit Campaign' : 'Create New Social Campaign'}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Campaign Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Stack direction="row" spacing={2}>
              <TextField
                select
                fullWidth
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Fundraising Target (INR)"
                type="number"
                value={formData.target_amount}
                onChange={(e) => setFormData({ ...formData, target_amount: Number(e.target.value) })}
                required
              />
            </Stack>

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Short Description (Shown on cards)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Detailed Story & Implementation Plan"
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              required
            />

            <TextField
              fullWidth
              label="Photograph Image URL (Unsplash or direct asset)"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              required
            />

            <TextField
              select
              fullWidth
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="paused">Paused</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            Save Campaign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
