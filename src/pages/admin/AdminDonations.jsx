import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Chip, TextField, Stack, MenuItem,
  IconButton, Tooltip, Alert, CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { api } from '../../api/client';
import { useDonation } from '../../context/DonationContext';
import { formatINR, formatDate } from '../../utils/formatters';

export default function AdminDonations() {
  const { showReceipt } = useDonation();
  const [donations, setDonations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notice, setNotice] = useState({ open: false, message: '', severity: 'success' });

  // Verification Dialog
  const [verifyDialog, setVerifyDialog] = useState({ open: false, donation: null, notes: '' });

  const loadDonations = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminDonations({
        status: statusFilter,
        search: searchTerm,
      });
      setDonations(res.donations);
      setTotal(res.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadDonations();
  };

  const handleOpenVerify = (donation) => {
    setVerifyDialog({ open: true, donation, notes: '' });
  };

  const handleConfirmVerify = async () => {
    try {
      await api.verifyDonation(verifyDialog.donation.id, 'confirmed', verifyDialog.notes || 'Verified by admin');
      setNotice({ open: true, message: 'Donation confirmed! Sequential 80G tax certificate generated.', severity: 'success' });
      setVerifyDialog({ open: false, donation: null, notes: '' });
      loadDonations();
    } catch (err) {
      setNotice({ open: true, message: err.message || 'Verification failed', severity: 'error' });
    }
  };

  const handleViewReceipt = async (refId) => {
    try {
      const receipt = await api.getReceipt(refId);
      showReceipt(receipt);
    } catch (err) {
      alert('Unable to load receipt: ' + err.message);
    }
  };

  const exportCSV = () => {
    const headers = ['Reference ID', 'Date', 'Donor Name', 'Donor Email', 'Donor PAN', 'Amount (INR)', 'Method', 'UPI UTR', 'Status', '80G Receipt No', 'Campaign'];
    const rows = donations.map((d) => [
      d.reference_id,
      d.created_at,
      `"${d.donor_name}"`,
      d.donor_email,
      d.donor_pan || '',
      d.amount,
      d.payment_method,
      d.upi_utr || '',
      d.status,
      d.tax_receipt_number || '',
      `"${d.campaign_title}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `helping_india_donations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3.5} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#172B3A">
            Donation Ledger & 80G Certificates
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Verified audit trail of contributions across UPI, cards, and bank transfers.
          </Typography>
        </Box>
        <Button variant="outlined" color="primary" startIcon={<FileDownloadRoundedIcon />} onClick={exportCSV}>
          Export CSV Ledger
        </Button>
      </Stack>

      {notice.open && (
        <Alert severity={notice.severity} sx={{ mb: 3 }} onClose={() => setNotice({ ...notice, open: false })}>
          {notice.message}
        </Alert>
      )}

      {/* Filter Bar */}
      <Paper elevation={0} sx={{ p: 2.5, mb: 3, borderRadius: 3, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              select
              fullWidth
              size="small"
              label="Payment Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Transactions</MenuItem>
              <MenuItem value="confirmed">Confirmed & Verified</MenuItem>
              <MenuItem value="pending">Pending UPI / Verification</MenuItem>
              <MenuItem value="failed">Failed / Cancelled</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Box component="form" onSubmit={handleSearchSubmit}>
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by Donor Name, Email, Reference, or UTR..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" variant="contained" color="inherit" sx={{ bgcolor: '#EBF6F1', color: '#087A52' }}>
                  Search
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{ textAlign: { md: 'right' } }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              Total Records: {total}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Ledger Table */}
      <Paper elevation={0} sx={{ borderRadius: 3.5, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F4FAF7' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Reference / Date</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Donor Details</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Initiative</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Method / UTR</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">Receipt / Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              ) : donations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                    <Typography color="text.secondary">No donations match your filters.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                donations.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={800} color="#172B3A">
                        {d.reference_id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(d.created_at)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        {d.donor_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {d.donor_email}
                      </Typography>
                      {d.donor_pan && (
                        <Typography variant="caption" fontWeight={600} color="#087A52">
                          PAN: {d.donor_pan}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200 }} noWrap>
                        {d.campaign_title}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={800} color="#087A52">
                        {formatINR(d.amount)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip label={d.payment_method?.toUpperCase()} size="small" sx={{ mb: 0.3 }} />
                      {d.upi_utr && (
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ fontFamily: 'monospace' }}>
                          UTR: {d.upi_utr}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={d.status}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          textTransform: 'capitalize',
                          bgcolor: d.status === 'confirmed' ? '#E4F6ED' : d.status === 'pending' ? '#FEF3C7' : '#FEE2E2',
                          color: d.status === 'confirmed' ? '#087A52' : d.status === 'pending' ? '#B45309' : '#DC2626',
                        }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        {d.status === 'pending' && (
                          <Tooltip title="Verify UPI UTR & Confirm">
                            <IconButton size="small" color="success" onClick={() => handleOpenVerify(d)}>
                              <CheckCircleRoundedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {d.status === 'confirmed' && (
                          <Tooltip title="View Official 80G Receipt">
                            <IconButton size="small" color="primary" onClick={() => handleViewReceipt(d.reference_id)}>
                              <ReceiptLongRoundedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Manual Verification Dialog */}
      <Dialog open={verifyDialog.open} onClose={() => setVerifyDialog({ open: false, donation: null, notes: '' })}>
        <DialogTitle sx={{ fontWeight: 800 }}>Confirm Offline UPI Donation</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Confirming this donation will mark it <strong>confirmed</strong>, update campaign totals, and issue an official Section 80G tax receipt number.
          </Typography>
          <Typography variant="subtitle2" fontWeight={700}>
            Donor: {verifyDialog.donation?.donor_name} ({formatINR(verifyDialog.donation?.amount)})
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" mb={2}>
            Submitted UTR: <strong>{verifyDialog.donation?.upi_utr || 'N/A'}</strong>
          </Typography>
          <TextField
            fullWidth
            size="small"
            label="Verification Notes (Optional)"
            placeholder="e.g. Bank statement matched on 28 Oct"
            value={verifyDialog.notes}
            onChange={(e) => setVerifyDialog({ ...verifyDialog, notes: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setVerifyDialog({ open: false, donation: null, notes: '' })} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleConfirmVerify}>
            Confirm & Issue Receipt
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
