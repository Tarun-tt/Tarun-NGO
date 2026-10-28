import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Typography, Grid, Paper, Stack, Chip, Button, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Skeleton, Alert
} from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { api } from '../../api/client';
import { formatINR, formatDate, calcPercentage } from '../../utils/formatters';
import AnimatedCounter from '../../components/common/AnimatedCounter';

export default function AdminOverview() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMetrics()
      .then(setMetrics)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Skeleton variant="rounded" height={130} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Skeleton variant="rounded" height={300} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800} color="#172B3A">
          Executive Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Live overview of donations, campaigns, donor receipts, and verified metrics.
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                TOTAL CONFIRMED DONATIONS
              </Typography>
              <Chip label="All-time" size="small" sx={{ bgcolor: '#E4F6ED', color: '#087A52', fontWeight: 700 }} />
            </Stack>
            <AnimatedCounter
              target={metrics?.totalRaised || 0}
              prefix="₹"
              variant="h4"
              sx={{ fontWeight: 800, color: '#087A52', display: 'block', mb: 0.5 }}
            />
            <Typography variant="caption" color="text.secondary">
              From <strong><AnimatedCounter target={metrics?.totalDonationsCount || 0} variant="caption" sx={{ fontWeight: 700 }} /></strong> confirmed contributions
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                THIS MONTH'S DONATIONS
              </Typography>
              <TrendingUpRoundedIcon sx={{ color: '#12A36D' }} />
            </Stack>
            <AnimatedCounter
              target={metrics?.monthRaised || 0}
              prefix="₹"
              variant="h4"
              sx={{ fontWeight: 800, color: '#172B3A', display: 'block', mb: 0.5 }}
            />
            <Typography variant="caption" color="text.secondary">
              <strong><AnimatedCounter target={metrics?.monthDonationsCount || 0} variant="caption" sx={{ fontWeight: 700 }} /></strong> donors this month
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                ACTIVE CAMPAIGNS
              </Typography>
              <CampaignRoundedIcon sx={{ color: '#F59E0B' }} />
            </Stack>
            <AnimatedCounter
              target={metrics?.activeCampaigns?.length || 0}
              variant="h4"
              sx={{ fontWeight: 800, color: '#172B3A', display: 'block', mb: 0.5 }}
            />
            <Typography variant="caption" color="text.secondary">
              Ongoing field initiatives
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                REGISTERED VOLUNTEERS
              </Typography>
              <Chip label="Nationwide" size="small" />
            </Stack>
            <AnimatedCounter
              target={metrics?.totalVolunteers || 0}
              variant="h4"
              sx={{ fontWeight: 800, color: '#172B3A', display: 'block', mb: 0.5 }}
            />
            <Typography variant="caption" color="text.secondary">
              Active community members
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Campaign Progress Breakdown & Recent Donations */}
      <Grid container spacing={4}>
        {/* Campaign Fundraising Progress */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3.5, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF', height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={800} color="#172B3A">
                Active Campaigns Progress
              </Typography>
              <Button component={RouterLink} to="/admin/campaigns" size="small" endIcon={<ArrowForwardRoundedIcon fontSize="small" />}>
                Manage
              </Button>
            </Stack>

            <Stack spacing={3}>
              {metrics?.activeCampaigns?.map((c) => {
                const pct = calcPercentage(c.raised_amount, c.target_amount);
                return (
                  <Box key={c.id}>
                    <Stack direction="row" justifyContent="space-between" mb={0.5}>
                      <Typography variant="subtitle2" fontWeight={700} color="#172B3A" sx={{ maxWidth: '65%' }} noWrap>
                        {c.title}
                      </Typography>
                      <Typography variant="caption" fontWeight={700} color="#087A52">
                        {formatINR(c.raised_amount)} / {formatINR(c.target_amount)} ({pct}%)
                      </Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={pct} />
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        </Grid>

        {/* Recent Donations Ledger */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3.5, border: '1px solid #DCE6E1', bgcolor: '#FFFFFF', height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={800} color="#172B3A">
                Recent Contributions
              </Typography>
              <Button component={RouterLink} to="/admin/donations" size="small" endIcon={<ArrowForwardRoundedIcon fontSize="small" />}>
                View All
              </Button>
            </Stack>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Donor / Cause</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metrics?.recentDonations?.slice(0, 5).map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700}>
                          {d.donor_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {d.campaign_title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={800} color="#087A52">
                          {formatINR(d.amount)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {d.payment_method?.toUpperCase()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={d.status}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                            bgcolor: d.status === 'confirmed' ? '#E4F6ED' : '#FEF3C7',
                            color: d.status === 'confirmed' ? '#087A52' : '#B45309',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
