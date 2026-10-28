import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Stack, Button, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from '@mui/material';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { api } from '../../api/client';
import { formatINR } from '../../utils/formatters';

export default function AdminReports() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    api.getMetrics().then(setMetrics).catch(console.error);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3.5} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#172B3A">
            Financial & 80G Compliance Reports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Statutory records for annual audit, Form 10BD filings, and NITI Aayog reporting.
          </Typography>
        </Box>
        <Button variant="outlined" color="primary" startIcon={<PrintRoundedIcon />} onClick={handlePrint}>
          Print Report
        </Button>
      </Stack>

      {/* Summary Paper */}
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3.5, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF', mb: 4 }}>
        <Typography variant="h6" fontWeight={800} color="#087A52" mb={2}>
          Annual Statutory Tax Certificate Statement (FY 2025-26)
        </Typography>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: '#FAFDFB', borderRadius: 2, border: '1px solid #E2EFE7' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                TOTAL CONFIRMED CONTRIBUTIONS
              </Typography>
              <Typography variant="h5" fontWeight={800} color="#087A52">
                {formatINR(metrics?.totalRaised || 0)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: '#FAFDFB', borderRadius: 2, border: '1px solid #E2EFE7' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                TOTAL 80G CERTIFICATES ISSUED
              </Typography>
              <Typography variant="h5" fontWeight={800} color="#172B3A">
                {metrics?.totalDonationsCount || 0}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: '#FAFDFB', borderRadius: 2, border: '1px solid #E2EFE7' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                SECTION 80G DEDUCTIBILITY
              </Typography>
              <Typography variant="h5" fontWeight={800} color="#172B3A">
                50% Eligible
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight={800} color="#172B3A" mb={2}>
          Program Fund Allocation Breakdown
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#F4FAF7' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Initiative Category</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Allocation %</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Statutory Purpose</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Audit Verification</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { cat: 'Education for All (Shiksha Setu)', pct: '30%', pur: 'School kits, STEM labs, remedial teachers', status: 'Compliant' },
                { cat: 'Healthcare Access (Arogya Vandana)', pct: '24%', pur: 'Mobile diagnostic units, medicines', status: 'Compliant' },
                { cat: 'Hunger Relief (Annapoorna)', pct: '18%', pur: 'Community kitchens, dry rations', status: 'Compliant' },
                { cat: 'Women Empowerment (Swavalamban)', pct: '12%', pur: 'Vocational tailoring, handlooms', status: 'Compliant' },
                { cat: 'Clean Environment & Water', pct: '10%', pur: '50k native trees, percolation pits', status: 'Compliant' },
                { cat: 'Administrative, Statutory & Tech', pct: '6%', pur: 'Audits, bank charges, software', status: 'Below 7% Cap' },
              ].map((row) => (
                <TableRow key={row.cat}>
                  <TableCell sx={{ fontWeight: 700 }}>{row.cat}</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: '#087A52' }}>{row.pct}</TableCell>
                  <TableCell>{row.pur}</TableCell>
                  <TableCell>
                    <Chip label={row.status} size="small" color="success" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
