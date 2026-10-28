import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container, Box, Typography, Button, Stack, Grid, Card, CardContent,
  CardMedia, Chip, LinearProgress, Paper, Skeleton
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import ChildCareRoundedIcon from '@mui/icons-material/ChildCareRounded';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WaterDamageRoundedIcon from '@mui/icons-material/WaterDamageRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';

import { useDonation } from '../context/DonationContext';
import { api } from '../api/client';
import { formatINR, calcPercentage } from '../utils/formatters';
import { fallbackCampaigns, fallbackStories } from '../utils/fallbackData';
import AnimatedCounter from '../components/common/AnimatedCounter';

const focusAreas = [
  {
    title: 'Education for All',
    desc: 'Empowering children with school learning kits, STEM labs, remedial classes, and digital literacy in rural schools.',
    icon: <SchoolRoundedIcon />,
    tint: '#E6F4EA',
    color: '#087A52',
    image: './images/education.jpg',
  },
  {
    title: 'Healthcare Access',
    desc: 'Bringing mobile clinics, preventive health screenings, maternal healthcare, and essential medicines to underserved villages.',
    icon: <HealthAndSafetyRoundedIcon />,
    tint: '#FEECEC',
    color: '#DC2626',
    image: './images/healthcare.jpg',
  },
  {
    title: 'Hunger Relief',
    desc: 'Operating community kitchens and dry ration support for daily-wage workers, homeless shelters, and vulnerable families.',
    icon: <RestaurantRoundedIcon />,
    tint: '#FFF7ED',
    color: '#EA580C',
    image: './images/hunger-relief.jpg',
  },
  {
    title: 'Women Empowerment',
    desc: 'Vocational training, tailoring fellowships, financial literacy, and market links for rural women artisans.',
    icon: <GroupsRoundedIcon />,
    tint: '#F3E8FF',
    color: '#7C3AED',
    image: './images/women-empowerment.jpg',
  },
  {
    title: 'Child Welfare',
    desc: 'Nutrition programs, daycare for migrant laborers children, and protection against child labor and abuse.',
    icon: <ChildCareRoundedIcon />,
    tint: '#EFF6FF',
    color: '#2563EB',
    image: './images/child-welfare.jpg',
  },
  {
    title: 'Clean Environment',
    desc: 'Mass native tree planting drives, rainwater harvesting pits, and community river clean-up campaigns.',
    icon: <ParkRoundedIcon />,
    tint: '#ECFDF5',
    color: '#059669',
    image: './images/environment.jpg',
  },
];

const donationTiers = [
  {
    amount: 500,
    label: 'Student Learning Kit',
    category: 'Education',
    desc: 'Provides school stationery, notebooks, and learning aids for 1 underprivileged child.',
    image: './images/tier-kit.jpg',
  },
  {
    amount: 1000,
    label: 'Primary Healthcare Camp',
    category: 'Healthcare',
    desc: 'Funds medical screening, basic diagnostic tests, and doctor consultation for 2 elderly citizens.',
    image: './images/healthcare.jpg',
  },
  {
    amount: 2500,
    label: 'Family Food Security',
    category: 'Hunger Relief',
    desc: 'Provides one full month of balanced ration (rice, wheat, pulses, oil, spices) for a family in need.',
    image: './images/tier-ration.jpg',
  },
  {
    amount: 5000,
    label: 'Plant 25 Native Trees',
    category: 'Environment',
    desc: 'Saplings, protective bamboo tree-guards, and 1-year maintenance for environmental restoration.',
    image: './images/environment.jpg',
  },
];

const realLifeIncidents = [
  {
    id: 'inc_01',
    badge: 'CHILD LABOR RESCUE',
    badgeColor: '#D97706',
    title: '7-Year-Old Priya: From Brick Kilns to Top of Her Class',
    crisis: 'Carried 15kg brick trays in 42°C heat to service inherited family debt. Blistered hands and zero schooling.',
    intervention: 'Helping India field educators intervened, replaced debt through nutritional stipends, and enrolled Priya in our bridge school with books & uniform.',
    outcome: 'Reads fluent Hindi, passed 2nd grade entrance test with 94%, dreams of becoming a doctor.',
    image: './images/incident-priya-education.jpg',
    sponsorAmount: 500,
    sponsorLabel: 'Sponsor a Child Like Priya (₹500)',
    category: 'Child Welfare & Education'
  },
  {
    id: 'inc_02',
    badge: 'MIDNIGHT FLOOD RESCUE',
    badgeColor: '#DC2626',
    title: '1,200 Stranded Flood Survivors in Madhubani',
    crisis: 'Embankment breached at 2:00 AM. 1,200 daily-wage families trapped on railway tracks without dry food or clean water for 18 hours.',
    intervention: 'Helping India disaster teams arrived in 6 hours with lifeboats, 1,200 dry ration packs (chura, gur, water tablets) and a mobile hot-khichdi kitchen.',
    outcome: 'Zero starvation casualties; hot nutritious meals served twice daily for 12 continuous days.',
    image: './images/incident-flood-relief.jpg',
    sponsorAmount: 2500,
    sponsorLabel: 'Send Family Relief Pack (₹2,500)',
    category: 'Emergency Relief'
  },
  {
    id: 'inc_03',
    badge: 'SIGHT RESTORATION',
    badgeColor: '#087A52',
    title: 'Ramu Kaka (68): Light Restored After 5 Years in Darkness',
    crisis: 'Completely blind from bilateral cataracts. Too poor to afford ₹12,000 surgery in the city, confined to his bed for half a decade.',
    intervention: 'Diagnosed by our Arogya Vandana mobile medical van. Free transit, hospitalization, and intraocular lens surgery fully sponsored.',
    outcome: 'Saw his 4-year-old grandson for the first time in his life 48 hours later. 100% vision restored.',
    image: './images/incident-elderly-healthcare.jpg',
    sponsorAmount: 1000,
    sponsorLabel: 'Restore an Elder’s Eyesight (₹1,000)',
    category: 'Healthcare'
  },
  {
    id: 'inc_04',
    badge: 'MIDNIGHT COLD RESCUE',
    badgeColor: '#2563EB',
    title: 'Operation Warmth: Protecting 3,500 Pavement Dwellers',
    crisis: 'Winter temperatures plummeted to 3°C on North Indian pavements. Newborns and elderly faced fatal hypothermia.',
    intervention: 'Midnight volunteer teams distributed 3,500 thick 4-ply thermal blankets, beanies, and hot immunity soup between 11 PM and 4 AM.',
    outcome: 'Prevented hypothermia deaths across 8 vulnerable shelter zones; 3,500 lives kept warm.',
    image: './images/incident-winter-drive.jpg',
    sponsorAmount: 500,
    sponsorLabel: 'Provide Thermal Blanket & Meals (₹500)',
    category: 'Hunger & Shelter'
  }
];

const liveDonations = [
  { name: 'Amit Verma', city: 'Gurgaon', amount: 2500, cause: 'Flood Relief Grocery Pack', time: '4m ago' },
  { name: 'Dr. Sneha K.', city: 'Bengaluru', amount: 1000, cause: 'Priya’s Learning Kit', time: '11m ago' },
  { name: 'Vikram S.', city: 'Delhi', amount: 5000, cause: 'Mobile Rural Health Clinics', time: '18m ago' },
  { name: 'Pooja Hegde', city: 'Pune', amount: 2500, cause: 'Women Artisan Fellowship', time: '34m ago' },
  { name: 'Kavita Nair', city: 'Kochi', amount: 500, cause: 'Student Stationery Kit', time: '46m ago' },
  { name: 'Rajesh Mehra', city: 'Jaipur', amount: 5000, cause: 'Plant 25 Native Trees', time: '1h ago' },
];

export default function Home() {
  const { openDonationModal } = useDonation();
  const [campaigns, setCampaigns] = useState(fallbackCampaigns);
  const [stories, setStories] = useState(fallbackStories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [cmpRes, styRes] = await Promise.allSettled([
          api.getCampaigns(),
          api.getStories()
        ]);
        if (cmpRes.status === 'fulfilled' && Array.isArray(cmpRes.value) && cmpRes.value.length > 0) {
          setCampaigns(cmpRes.value);
        }
        if (styRes.status === 'fulfilled' && Array.isArray(styRes.value) && styRes.value.length > 0) {
          setStories(styRes.value);
        }
      } catch (err) {
        console.warn('Using seeded content:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      {/* 0. Urgent Need & Direct UPI Announcement Bar */}
      <Box
        sx={{
          bgcolor: '#172B3A',
          color: '#FFFFFF',
          py: 1.2,
          px: 2,
          borderBottom: '2px solid #F59E0B',
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={1.5}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label="URGENT RELIEF ACTIVE"
                size="small"
                sx={{
                  bgcolor: '#DC2626',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '0.7rem',
                  letterSpacing: '0.5px',
                }}
              />
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.88rem' }, color: '#E2ECE6' }}>
                Bihar Flood Crisis & Rural Winter Rescue: <strong>1,200 families</strong> urgently need meals and blankets today.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="caption" sx={{ color: '#FBBF24', fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
                Official UPI: <strong>tarun-tiwari@ptyes</strong> · 50% Tax Exemption (80G)
              </Typography>
              <Button
                size="small"
                variant="contained"
                onClick={() => openDonationModal({ presetAmount: 500, campaignTitle: 'Urgent Disaster & Winter Relief' })}
                sx={{
                  bgcolor: '#F59E0B',
                  color: '#172B3A',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  py: 0.4,
                  px: 2,
                  whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: '#D97706', color: '#FFFFFF' },
                }}
              >
                Send ₹500 Help Now
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* 1. Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 560, md: 620 },
          backgroundImage: "url('/ngo-hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: { xs: 'center', md: 'center 40%' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: {
              xs: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.92) 80%, rgba(255,255,255,0.7) 100%)',
              md: 'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 38%, rgba(255,255,255,0.7) 58%, rgba(255,255,255,0.15) 100%)',
            },
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 } }}>
          <Box sx={{ maxWidth: 640 }}>
            {/* Trust Pill */}
            <Chip
              icon={<VerifiedUserRoundedIcon sx={{ fontSize: '18px !important', color: '#087A52 !important' }} />}
              label="NITI Aayog Darpan Registered · 80G Tax Exemption Certified"
              size="small"
              sx={{
                bgcolor: '#E4F6ED',
                color: '#087A52',
                fontWeight: 800,
                fontSize: { xs: '0.72rem', sm: '0.78rem' },
                mb: 2.5,
                border: '1px solid #C5EAD7',
                py: 2,
              }}
            />

            {/* Headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.4rem', md: '4rem' },
                lineHeight: 1.1,
                mb: 2.5,
              }}
            >
              Together, We Can <br />
              <Box component="span" sx={{ color: '#087A52' }}>
                Build a Better India.
              </Box>
            </Typography>

            {/* Supporting Text */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', sm: '1.15rem' },
                color: '#465A6B',
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              Your kindness can help children learn, families access healthcare, communities thrive, and our environment flourish. Join us in creating lasting, verifiable change across India.
            </Typography>

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3.5}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                startIcon={<FavoriteRoundedIcon />}
                onClick={() => openDonationModal()}
                sx={{ py: 1.6, px: 3.5, fontSize: '1rem', fontWeight: 800 }}
              >
                Donate Now
              </Button>
              <Button
                size="large"
                variant="outlined"
                component={RouterLink}
                to="/causes"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  py: 1.6,
                  px: 3,
                  fontSize: '1rem',
                  fontWeight: 700,
                  bgcolor: 'rgba(255,255,255,0.85)',
                  borderColor: '#CAD8D0',
                  color: '#172B3A',
                  '&:hover': { bgcolor: '#FFFFFF', borderColor: '#087A52', color: '#087A52' },
                }}
              >
                Explore Causes
              </Button>
              <Button
                size="large"
                variant="text"
                component={RouterLink}
                to="/volunteer"
                sx={{ color: '#087A52', fontWeight: 700 }}
              >
                Become a Volunteer
              </Button>
            </Stack>

            {/* Instant UPI Trust Strip */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              <QrCodeScannerRoundedIcon sx={{ color: '#087A52', fontSize: 20 }} />
              <Typography variant="caption" sx={{ color: '#526677', fontWeight: 600 }}>
                Direct UPI accepted at <strong>tarun-tiwari@ptyes</strong> · 100% transparent utilization
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* 2. Trust and Impact Metrics Band */}
      <Box sx={{ bgcolor: '#F4FAF7', py: 4, borderBottom: '1px solid #E3EFE9' }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {[
              { icon: <GroupsRoundedIcon sx={{ fontSize: 32 }} />, value: '50,000+', label: 'People Directly Supported' },
              { icon: <MenuBookRoundedIcon sx={{ fontSize: 32 }} />, value: '200+', label: 'Education Programs Delivered' },
              { icon: <HealthAndSafetyRoundedIcon sx={{ fontSize: 32 }} />, value: '150+', label: 'Mobile Health Clinics' },
              { icon: <ParkRoundedIcon sx={{ fontSize: 32 }} />, value: '50,000+', label: 'Native Trees Planted' },
              { icon: <PublicRoundedIcon sx={{ fontSize: 32 }} />, value: '15', label: 'Indian States Served' },
            ].map((stat, i) => (
              <Grid item xs={6} sm={4} md key={stat.label}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{
                    borderRight: { md: i < 4 ? '1px solid #D5E8DE' : 'none' },
                    pr: { md: 2 },
                  }}
                >
                  <Box sx={{ color: '#087A52', display: 'flex' }}>{stat.icon}</Box>
                  <Box>
                    <AnimatedCounter
                      target={stat.value}
                      variant="h5"
                      sx={{
                        fontFamily: '"Manrope", sans-serif',
                        fontWeight: 800,
                        color: '#087A52',
                        lineHeight: 1.1,
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#526677', fontWeight: 600, display: 'block', mt: 0.3 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Live Compassion Feed (Social Proof) */}
      <Box sx={{ bgcolor: '#FAFDFB', py: 1.5, borderBottom: '1px solid #E2EBE6', overflow: 'hidden' }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#12A36D' }} />
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#087A52', letterSpacing: '0.5px' }}>
                LIVE DONOR FEED:
              </Typography>
            </Stack>
            <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', py: 0.5, width: '100%', scrollbarWidth: 'none' }}>
              {liveDonations.map((d, i) => (
                <Box key={i} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap', bgcolor: '#FFFFFF', px: 1.8, py: 0.6, borderRadius: 2, border: '1px solid #D5E8DD' }}>
                  <Typography variant="caption" fontWeight={700} color="#172B3A">
                    {d.name} ({d.city})
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800 }}>
                    gave {formatINR(d.amount)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    • {d.cause}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#7E9185', fontSize: '0.7rem' }}>
                    ({d.time})
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* 3. Focus Areas */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: '#FFFFFF' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5, flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ maxWidth: 700 }}>
              <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                WHAT WE DO
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 0.5, mb: 1.5 }}>
                Our Core Pillars of Social Impact
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We work directly with grassroots communities across India to transform compassionate contributions into sustainable, long-term human progress.
              </Typography>
            </Box>
            <Button component={RouterLink} to="/causes" endIcon={<ArrowForwardRoundedIcon />} sx={{ color: '#087A52', fontWeight: 700 }}>
              View All Initiatives
            </Button>
          </Box>

          <Grid container spacing={3}>
            {focusAreas.map((area) => (
              <Grid item xs={12} sm={6} md={4} key={area.title}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderColor: '#E8EFEA',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 28px rgba(8, 122, 82, 0.08)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={area.image}
                    alt={area.title}
                    onError={(e) => {
                      e.currentTarget.src = './images/education.jpg';
                    }}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: '50%',
                          bgcolor: area.tint,
                          color: area.color,
                          display: 'grid',
                          placeItems: 'center',
                        }}
                      >
                        {area.icon}
                      </Box>
                      <Typography variant="h6" fontWeight={800} color="#172B3A">
                        {area.title}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2, flexGrow: 1 }}>
                      {area.desc}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to="/causes"
                      size="small"
                      endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
                      sx={{ p: 0, color: '#087A52', alignSelf: 'flex-start', fontWeight: 700 }}
                    >
                      View Initiative
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 3.5 Real Incidents & Urgent Ground Realities */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: '#F4FAF7' }}>
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: 850, mb: 6 }}>
            <Chip
              icon={<FlashOnRoundedIcon sx={{ fontSize: '18px !important', color: '#DC2626 !important' }} />}
              label="GROUND ZERO REALITIES"
              sx={{ bgcolor: '#FEE2E2', color: '#DC2626', fontWeight: 900, mb: 1.5, letterSpacing: '0.5px' }}
            />
            <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, mb: 2 }}>
              Real Incidents. Real Lives You Can Save Today.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Poverty in India is not a distant number—it is a child hauling bricks in the scorching heat, an elderly grandfather sitting in 5 years of curable darkness, or a flood-hit mother without dry food for her shivering newborn. See how your contribution directly reverses tragedy into hope.
            </Typography>
          </Box>

          <Grid container spacing={3.5}>
            {realLifeIncidents.map((inc) => (
              <Grid item xs={12} md={6} key={inc.id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1.5px solid #D5E8DD',
                    bgcolor: '#FFFFFF',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 36px rgba(8, 122, 82, 0.1)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={inc.image}
                      alt={inc.title}
                      onError={(e) => {
                        e.currentTarget.src = './images/incident-priya-education.jpg';
                      }}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Chip
                      label={inc.badge}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 14,
                        left: 14,
                        bgcolor: inc.badgeColor,
                        color: '#FFFFFF',
                        fontWeight: 900,
                        fontSize: '0.72rem',
                        letterSpacing: '0.5px',
                      }}
                    />
                  </Box>

                  <CardContent sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" fontWeight={800} color="#172B3A" mb={2} sx={{ lineHeight: 1.3 }}>
                      {inc.title}
                    </Typography>

                    {/* Crisis vs Intervention comparison */}
                    <Box sx={{ p: 2, bgcolor: '#FEF2F2', borderRadius: 2.5, borderLeft: '4px solid #DC2626', mb: 2 }}>
                      <Typography variant="caption" sx={{ color: '#DC2626', fontWeight: 900, textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                        ⚠️ The Crisis on the Ground:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7F1D1D', lineHeight: 1.6 }}>
                        {inc.crisis}
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: '#F0FDF4', borderRadius: 2.5, borderLeft: '4px solid #087A52', mb: 2.5, flexGrow: 1 }}>
                      <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 900, textTransform: 'uppercase', display: 'block', mb: 0.3 }}>
                        ✅ Helping India Intervention & Outcome:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#14532D', lineHeight: 1.6, mb: 1 }}>
                        {inc.intervention}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 700, display: 'block' }}>
                        🎯 Outcome: {inc.outcome}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                      startIcon={<FavoriteRoundedIcon />}
                      onClick={() => openDonationModal({ campaignTitle: inc.title, presetAmount: inc.sponsorAmount })}
                      sx={{
                        py: 1.4,
                        fontWeight: 800,
                        fontSize: '0.96rem',
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)',
                      }}
                    >
                      {inc.sponsorLabel}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. Featured Fundraising Campaigns */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: '#F8FAF9', borderTop: '1px solid #EDF3F0', borderBottom: '1px solid #EDF3F0' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5, flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ maxWidth: 700 }}>
              <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                ACTIVE CAMPAIGNS
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 0.5, mb: 1.5 }}>
                Support High-Priority Initiatives
              </Typography>
              <Typography variant="body1" color="text.secondary">
                100% of your donation is routed with complete accountability. Progress is updated strictly from verified, reconciled payments.
              </Typography>
            </Box>
            <Button component={RouterLink} to="/causes" endIcon={<ArrowForwardRoundedIcon />} sx={{ color: '#087A52', fontWeight: 700 }}>
              Browse All Campaigns
            </Button>
          </Box>

          <Grid container spacing={3}>
            {(Array.isArray(campaigns) ? campaigns : fallbackCampaigns).slice(0, 3).map((campaign) => {
              const percentage = calcPercentage(campaign.raised_amount, campaign.target_amount);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                          transition: 'transform 0.25s, box-shadow 0.25s',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 16px 36px rgba(23, 43, 58, 0.08)',
                          },
                        }}
                      >
                        <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={campaign.image_url}
                            alt={campaign.title}
                            onError={(e) => {
                              e.currentTarget.src = './images/education.jpg';
                            }}
                            sx={{ objectFit: 'cover' }}
                          />
                          <Chip
                            label={campaign.category}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 14,
                              left: 14,
                              bgcolor: 'rgba(255, 255, 255, 0.95)',
                              color: '#087A52',
                              fontWeight: 800,
                              fontSize: '0.75rem',
                            }}
                          />
                        </Box>

                        <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="h6" fontWeight={800} color="#172B3A" mb={1} sx={{ lineHeight: 1.3 }}>
                            {campaign.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              lineHeight: 1.65,
                              mb: 2.5,
                              flexGrow: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {campaign.description}
                          </Typography>

                          {/* Funding Progress */}
                          <Box sx={{ mb: 2.5 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.8}>
                              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                                <AnimatedCounter target={campaign.raised_amount} prefix="₹" variant="body2" sx={{ fontWeight: 800, color: '#087A52' }} />
                                <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#526677' }}>raised</span>
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                Goal: <strong>{formatINR(campaign.target_amount)}</strong>
                              </Typography>
                            </Stack>
                            <LinearProgress variant="determinate" value={percentage} />
                            <Stack direction="row" justifyContent="space-between" mt={0.8}>
                              <Typography variant="caption" color="text.secondary">
                                {percentage}% completed
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                <strong>{campaign.donor_count || 0}</strong> confirmed donors
                              </Typography>
                            </Stack>
                          </Box>

                          {/* Actions */}
                          <Stack direction="row" spacing={1.5}>
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              onClick={() => openDonationModal({ campaignId: campaign.id, campaignTitle: campaign.title })}
                            >
                              Donate Now
                            </Button>
                            <Button
                              variant="outlined"
                              color="inherit"
                              component={RouterLink}
                              to={`/causes/${campaign.slug}`}
                              sx={{ borderColor: '#D0DCD5', color: '#172B3A', whiteSpace: 'nowrap' }}
                            >
                              Learn More
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
          </Grid>
        </Container>
      </Box>

      {/* 5. Donation Impact Calculator Section */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: '#FFFFFF' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', maxWidth: 750, mx: 'auto', mb: 6 }}>
            <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              TRANSPARENT PROGRAM BUDGETS
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 0.5, mb: 1.5 }}>
              See What Your Donation Accomplishes
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We design every initiative with clear, documented unit costs. Select an amount below to make a direct, tangible difference today.
            </Typography>
          </Box>

          <Grid container spacing={3} mb={5}>
            {donationTiers.map((tier) => (
              <Grid item xs={12} sm={6} md={3} key={tier.amount}>
                <Paper
                  elevation={0}
                  sx={{
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 3.5,
                    border: '1.5px solid #E2EBE5',
                    bgcolor: '#FAFDFB',
                    transition: 'all 0.25s',
                    '&:hover': {
                      borderColor: '#087A52',
                      bgcolor: '#F3F9F5',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 28px rgba(8, 122, 82, 0.08)',
                    },
                  }}
                >
                  <Box sx={{ height: 140, position: 'relative', overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={tier.image}
                      alt={tier.label}
                      onError={(e) => {
                        e.currentTarget.src = './images/tier-kit.jpg';
                      }}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Chip
                      label={tier.category}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        bgcolor: 'rgba(255,255,255,0.95)',
                        fontWeight: 800,
                        color: '#087A52',
                        fontSize: '0.72rem',
                      }}
                    />
                  </Box>

                  <Box sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <AnimatedCounter
                      target={tier.amount}
                      prefix="₹"
                      variant="h4"
                      sx={{ fontFamily: '"Manrope", sans-serif', fontWeight: 800, color: '#087A52', mb: 0.5 }}
                    />
                    <Typography variant="subtitle2" fontWeight={800} color="#172B3A" mb={1}>
                      {tier.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2.5, flexGrow: 1, fontSize: '0.86rem' }}>
                      {tier.desc}
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => openDonationModal({ presetAmount: tier.amount })}
                    >
                      Donate {formatINR(tier.amount)}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Quick UPI Callout Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3.5,
              bgcolor: '#087A52',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <QrCodeScannerRoundedIcon sx={{ color: '#FBBF24', fontSize: 26 }} />
                <Typography variant="h5" fontWeight={800} color="#FFFFFF">
                  Prefer Direct UPI Transfer?
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: '#D4EBE0', maxWidth: 620, lineHeight: 1.7 }}>
                Scan and transfer directly to our verified UPI ID: <strong style={{ color: '#FBBF24' }}>tarun-tiwari@ptyes</strong>. Instant Section 80G tax receipt issued immediately upon reference submission.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => openDonationModal()}
              sx={{ py: 1.4, px: 3.5, whiteSpace: 'nowrap' }}
            >
              Scan & Pay UPI
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* 6. Stories of Impact Preview */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: '#F8FAF9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5, flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ maxWidth: 700 }}>
              <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                REAL STORIES
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 0.5, mb: 1.5 }}>
                Lives Changed Through Your Compassion
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Read authentic testimonials and documented outcomes from our field workers, educators, and beneficiaries.
              </Typography>
            </Box>
            <Button component={RouterLink} to="/stories" endIcon={<ArrowForwardRoundedIcon />} sx={{ color: '#087A52', fontWeight: 700 }}>
              Read All Stories
            </Button>
          </Box>

          <Grid container spacing={3}>
            {(Array.isArray(stories) ? stories : fallbackStories).slice(0, 3).map((story) => (
              <Grid item xs={12} md={4} key={story.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={story.image_url}
                    alt={story.title}
                    onError={(e) => {
                      e.currentTarget.src = './images/story-aarav.jpg';
                    }}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Chip label={story.category} size="small" sx={{ alignSelf: 'flex-start', mb: 1.5, bgcolor: '#EBF6F1', color: '#087A52', fontWeight: 700 }} />
                    <Typography variant="h6" fontWeight={800} color="#172B3A" mb={1} sx={{ lineHeight: 1.3 }}>
                      {story.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 2, flexGrow: 1 }}>
                      {story.summary}
                    </Typography>
                    {story.quote && (
                      <Box sx={{ p: 1.5, bgcolor: '#F0FAF5', borderRadius: 2, borderLeft: '3px solid #087A52', mb: 2 }}>
                        <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#172B3A', display: 'block' }}>
                          "{story.quote}"
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, mt: 0.5, display: 'block' }}>
                          — {story.beneficiary_name}, {story.location}
                        </Typography>
                      </Box>
                    )}
                    <Stack direction="row" spacing={1.5} alignItems="center" mt="auto" pt={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<FavoriteRoundedIcon fontSize="small" />}
                        onClick={() => openDonationModal({ campaignTitle: story.title, presetAmount: 1000 })}
                        sx={{ fontWeight: 800, fontSize: '0.8rem', py: 0.8 }}
                      >
                        Sponsor Relief
                      </Button>
                      <Button component={RouterLink} to="/stories" size="small" endIcon={<ArrowForwardRoundedIcon fontSize="small" />} sx={{ p: 0, color: '#087A52', fontWeight: 700 }}>
                        Read Details
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 7. Transparency, Governance & Compliance Section */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: '#FFFFFF' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', maxWidth: 750, mx: 'auto', mb: 6 }}>
            <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              TRANSPARENCY & ACCOUNTABILITY
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 0.5, mb: 1.5 }}>
              Committed to Highest Standards of Trust
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Helping India Foundation adheres strictly to statutory nonprofit guidelines under Indian Law, providing open public records and audited reporting.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              {
                icon: <AssignmentTurnedInRoundedIcon sx={{ fontSize: 36, color: '#087A52' }} />,
                title: 'NITI Aayog Registered',
                desc: 'Registered on the Government of India NGO-Darpan portal (DL/2021/0289412) with full compliance records.',
              },
              {
                icon: <ShieldRoundedIcon sx={{ fontSize: 36, color: '#087A52' }} />,
                title: 'Section 80G Certified',
                desc: 'All eligible donations qualify for 50% tax deduction under Section 80G of the Indian Income Tax Act 1961.',
              },
              {
                icon: <DescriptionRoundedIcon sx={{ fontSize: 36, color: '#087A52' }} />,
                title: 'Audited Financials',
                desc: 'Annual balance sheets and utilization certificates are audited independently by certified Chartered Accountants.',
              },
              {
                icon: <VerifiedUserRoundedIcon sx={{ fontSize: 36, color: '#087A52' }} />,
                title: 'Strict Domestic Receipts',
                desc: 'In full accordance with the FCRA Act 2010, donations are accepted strictly through authorized domestic channels.',
              },
            ].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    borderColor: '#E6ECE9',
                    bgcolor: '#FAFDFB',
                  }}
                >
                  <Box mb={2}>{item.icon}</Box>
                  <Typography variant="h6" fontWeight={800} color="#172B3A" mb={1}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 8. Volunteer & Community Call to Action */}
      <Box sx={{ bgcolor: '#0B3A2C', py: { xs: 8, md: 10 }, color: '#FFFFFF' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="caption" sx={{ color: '#6EE7B7', fontWeight: 800, letterSpacing: '1px' }}>
                BE THE CHANGE
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, color: '#FFFFFF', mt: 0.5, mb: 2 }}>
                Lend Your Voice, Time, or Skills.
              </Typography>
              <Typography variant="body1" sx={{ color: '#D1EAE0', lineHeight: 1.8, maxWidth: 600 }}>
                Whether you can teach over weekends, assist at our mobile health camps, organize a community plantation drive, or contribute professionally, we welcome you to our nationwide volunteer network.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent={{ md: 'flex-end' }}>
                <Button
                  component={RouterLink}
                  to="/volunteer"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ py: 1.6, px: 3.5, fontWeight: 800 }}
                >
                  Apply as Volunteer
                </Button>
                <Button
                  component={RouterLink}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    py: 1.6,
                    px: 3.5,
                    color: '#FFFFFF',
                    borderColor: '#73A595',
                    '&:hover': { borderColor: '#FFFFFF', bgcolor: 'rgba(255,255,255,0.08)' },
                  }}
                >
                  Contact Our Team
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
