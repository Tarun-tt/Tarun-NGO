import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, Stack, Chip, Button, Card, CardMedia,
  CardContent, Tabs, Tab, Divider
} from '@mui/material';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { pastFiveYearsIncidents } from '../../utils/fallbackData';
import { useDonation } from '../../context/DonationContext';
import AnimatedCounter from './AnimatedCounter';

export default function PastFiveYearsTimeline({ title = "5-Year Humanitarian Track Record (2021–2026)", subtitle = "When disaster and crisis struck India, Helping India was on the frontlines. Here is how your generosity saved lives across the past 5 years." }) {
  const { openDonationModal } = useDonation();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeMission = pastFiveYearsIncidents[selectedIdx] || pastFiveYearsIncidents[0];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: '#FFFFFF' }}>
      <Box sx={{ maxWidth: 900, mb: 6 }}>
        <Chip
          icon={<VerifiedUserRoundedIcon sx={{ fontSize: '18px !important', color: '#087A52 !important' }} />}
          label="HISTORICAL HUMANITARIAN RECORD · 2021 TO 2026"
          sx={{ bgcolor: '#E4F6ED', color: '#087A52', fontWeight: 800, mb: 1.5, letterSpacing: '0.5px' }}
        />
        <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          {subtitle}
        </Typography>
      </Box>

      {/* Year-by-Year Mission Selector Tabs */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={selectedIdx}
          onChange={(e, val) => setSelectedIdx(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            bgcolor: '#F4FAF7',
            borderRadius: 3.5,
            p: 0.8,
            border: '1.5px solid #D5E8DD',
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTab-root': {
              borderRadius: 2.5,
              fontWeight: 800,
              fontSize: '0.88rem',
              minHeight: 46,
              px: { xs: 2, sm: 3 },
              color: '#526677',
              transition: 'all 0.2s',
              '&.Mui-selected': {
                bgcolor: '#087A52',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(8, 122, 82, 0.25)',
              },
            },
          }}
        >
          {pastFiveYearsIncidents.map((inc, i) => (
            <Tab
              key={inc.id}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box component="span" sx={{ bgcolor: i === selectedIdx ? 'rgba(255,255,255,0.25)' : '#E2ECE6', px: 1, py: 0.2, borderRadius: 1.5, fontSize: '0.75rem', fontWeight: 900 }}>
                    {inc.year}
                  </Box>
                  <span>{inc.missionName.split(':')[0]}</span>
                </Stack>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Featured Active Mission Deep-Dive Card */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          border: '2px solid #D5E8DD',
          bgcolor: '#FAFDFB',
          boxShadow: '0 16px 36px rgba(8, 122, 82, 0.08)',
          mb: 6,
        }}
      >
        <Grid container>
          {/* Mission Image */}
          <Grid item xs={12} lg={5}>
            <Box sx={{ position: 'relative', height: '100%', minHeight: { xs: 260, md: 420 }, overflow: 'hidden' }}>
              <Box
                component="img"
                src={activeMission.image}
                alt={activeMission.incidentTitle}
                onError={(e) => {
                  e.currentTarget.src = './images/incident-flood-relief.jpg';
                }}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(23, 43, 58, 0.9) 0%, rgba(23, 43, 58, 0.1) 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 3,
                }}
              >
                <Chip
                  label={activeMission.year}
                  sx={{
                    bgcolor: '#F59E0B',
                    color: '#172B3A',
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    alignSelf: 'flex-start',
                    px: 1,
                  }}
                />
                <Box>
                  <Typography variant="caption" sx={{ color: '#D4EBE0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    VERIFIED BENEFICIARY IMPACT
                  </Typography>
                  <Typography variant="h5" fontWeight={800} color="#FFFFFF">
                    {activeMission.livesImpacted}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Mission Details & Action */}
          <Grid item xs={12} lg={7}>
            <Box sx={{ p: { xs: 3, sm: 4.5 }, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5} flexWrap="wrap" gap={1}>
                <Chip label={activeMission.category} size="small" sx={{ bgcolor: '#E4F6ED', color: '#087A52', fontWeight: 800 }} />
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: '#526677' }}>
                  <LocationOnRoundedIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" fontWeight={700}>{activeMission.location}</Typography>
                </Stack>
              </Stack>

              <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 900, letterSpacing: '0.5px' }}>
                {activeMission.missionName.toUpperCase()}
              </Typography>
              <Typography variant="h4" fontWeight={800} color="#172B3A" mb={2} sx={{ fontSize: { xs: '1.45rem', md: '1.85rem' }, lineHeight: 1.25 }}>
                {activeMission.incidentTitle}
              </Typography>

              {/* The Crisis Callout */}
              <Box sx={{ p: 2, bgcolor: '#FEF2F2', borderRadius: 2.5, borderLeft: '4px solid #DC2626', mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#DC2626', fontWeight: 900, textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                  ⚠️ The Emergency India Faced ({activeMission.year}):
                </Typography>
                <Typography variant="body2" sx={{ color: '#7F1D1D', lineHeight: 1.65 }}>
                  {activeMission.crisis}
                </Typography>
              </Box>

              {/* Helping India Intervention */}
              <Box sx={{ p: 2, bgcolor: '#F0FDF4', borderRadius: 2.5, borderLeft: '4px solid #087A52', mb: 2.5 }}>
                <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 900, textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                  🤝 How Helping India Mobilized & Supported People:
                </Typography>
                <Typography variant="body2" sx={{ color: '#14532D', lineHeight: 1.65 }}>
                  {activeMission.helpingIndiaAction}
                </Typography>
              </Box>

              {/* Survivor / Field Quote */}
              <Box sx={{ p: 1.8, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #D5E8DD', mb: 3 }}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <FormatQuoteRoundedIcon sx={{ color: '#087A52', transform: 'rotate(180deg)', fontSize: 22 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#172B3A' }}>
                      "{activeMission.quote}"
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#087A52', mt: 0.5, display: 'block' }}>
                      — {activeMission.quoteAuthor}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Direct Donation Motivation CTA */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<FavoriteRoundedIcon />}
                  onClick={() => openDonationModal({ campaignTitle: `Emergency Relief Fund - ${activeMission.missionName}`, presetAmount: activeMission.suggestedSponsorAmount })}
                  sx={{
                    py: 1.4,
                    px: 3.5,
                    fontWeight: 800,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    boxShadow: '0 4px 16px rgba(245, 158, 11, 0.35)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Support Emergency Relief (₹{activeMission.suggestedSponsorAmount})
                </Button>
                <Typography variant="caption" color="text.secondary">
                  ⚡ 100% direct transfer to <strong>tarun-tiwari@ptyes</strong> · 50% Tax Exemption Under Section 80G
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Grid of All 5-Year Relief Highlights */}
      <Typography variant="h5" fontWeight={800} color="#172B3A" mb={3}>
        Complete 5-Year Chronological Overview (2021 – 2026)
      </Typography>

      <Grid container spacing={2.5}>
        {pastFiveYearsIncidents.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              onClick={() => setSelectedIdx(index)}
              sx={{
                p: 2.5,
                borderRadius: 3,
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: index === selectedIdx ? '2px solid #087A52' : '1px solid #DCE6E1',
                bgcolor: index === selectedIdx ? '#F0FAF5' : '#FFFFFF',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#087A52',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 24px rgba(8, 122, 82, 0.1)',
                },
              }}
            >
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.2}>
                  <Chip
                    label={item.year}
                    size="small"
                    sx={{
                      bgcolor: index === selectedIdx ? '#087A52' : '#E2ECE6',
                      color: index === selectedIdx ? '#FFFFFF' : '#172B3A',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800 }}>
                    {item.livesImpacted.split('·')[0]}
                  </Typography>
                </Stack>
                <Typography variant="subtitle2" fontWeight={800} color="#172B3A" mb={0.8} sx={{ lineHeight: 1.35 }}>
                  {item.incidentTitle}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                  {item.crisis}
                </Typography>
              </Box>

              <Button
                size="small"
                endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
                sx={{ p: 0, mt: 2, color: '#087A52', fontWeight: 700, alignSelf: 'flex-start' }}
              >
                Read Mission Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
