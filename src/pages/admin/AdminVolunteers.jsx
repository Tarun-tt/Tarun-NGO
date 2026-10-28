import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, MenuItem, TextField, CircularProgress,
  Stack, Alert
} from '@mui/material';
import { api } from '../../api/client';
import { formatDate } from '../../utils/formatters';

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState({ open: false, message: '', severity: 'success' });

  const loadVolunteers = async () => {
    setLoading(true);
    try {
      const data = await api.getVolunteers();
      setVolunteers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateVolunteerStatus(id, status);
      setNotice({ open: true, message: `Volunteer status updated to ${status}`, severity: 'success' });
      loadVolunteers();
    } catch (err) {
      setNotice({ open: true, message: err.message || 'Update failed', severity: 'error' });
    }
  };

  return (
    <Box>
      <Box mb={3.5}>
        <Typography variant="h4" fontWeight={800} color="#172B3A">
          Volunteer Applications
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review candidate skills, availability, and assign coordinators.
        </Typography>
      </Box>

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
                <TableCell sx={{ fontWeight: 800 }}>Applicant</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Area of Interest</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Availability</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : volunteers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No volunteer applications yet.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                volunteers.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={800}>
                        {v.full_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Applied: {formatDate(v.created_at)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">{v.email}</Typography>
                      <Typography variant="caption" color="text.secondary">{v.phone}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">{v.city}, {v.state}</Typography>
                    </TableCell>

                    <TableCell>
                      <Chip label={v.areas_of_interest} size="small" sx={{ maxWidth: 220 }} />
                    </TableCell>

                    <TableCell>
                      <Typography variant="caption" fontWeight={600}>{v.availability}</Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        select
                        size="small"
                        value={v.status}
                        onChange={(e) => handleStatusChange(v.id, e.target.value)}
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                      </TextField>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
