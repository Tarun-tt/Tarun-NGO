import React, { useState } from 'react';
import {
  Container, Box, Typography, Grid, Paper, TextField, Button,
  MenuItem, Alert, Stack, CircularProgress, Chip
} from '@mui/material';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import { api } from '../api/client';
import AnimatedCounter from '../components/common/AnimatedCounter';

const interests = [
  'Teaching & Education Remedial Classes',
  'Healthcare & Medical Camp Assistance',
  'Annapoorna Kitchen & Food Distribution',
  'Tree Plantation & Environmental Drives',
  'Women Skilling & Vocational Mentoring',
  'Fundraising & Community Outreach',
  'Digital Media, Photography & Content',
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    skills: '',
    availability: 'Weekends (4-6 Hours)',
    areas_of_interest: 'Teaching & Education Remedial Classes',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.phone || !formData.city) {
      setError('Please complete all mandatory fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await api.applyVolunteer(formData);
      setSuccess(res.message || 'Application submitted successfully! Our volunteer lead will contact you.');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        skills: '',
        availability: 'Weekends (4-6 Hours)',
        areas_of_interest: 'Teaching & Education Remedial Classes',
      });
    } catch (err) {
      setError(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, bgcolor: '#F8FAF9' }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box mb={3}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  bgcolor: '#E4F6ED',
                  color: '#087A52',
                  display: 'grid',
                  placeItems: 'center',
                  mb: 2,
                }}
              >
                <VolunteerActivismRoundedIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#087A52', fontWeight: 800, letterSpacing: '1px' }}>
                COMMUNITY ACTION
              </Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, mt: 0.5, mb: 2 }}>
                Become a Volunteer for Change.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                You don't need a medical degree or years of experience to make a lasting difference. What you need is empathy, consistency, and a willingness to stand beside those who need it.
              </Typography>
            </Box>

            {/* Volunteer Photo Card */}
            <Box
              sx={{
                borderRadius: 3.5,
                overflow: 'hidden',
                position: 'relative',
                mb: 3,
                boxShadow: '0 10px 24px rgba(8, 122, 82, 0.1)',
              }}
            >
              <Box
                component="img"
                src="./images/volunteer-action.jpg"
                alt="Helping India Volunteers in Action"
                onError={(e) => {
                  e.currentTarget.src = './images/volunteer-action.jpg';
                }}
                sx={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 122, 82, 0.85) 0%, rgba(8, 122, 82, 0.1) 70%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 2,
                }}
              >
                <Stack direction="row" spacing={3} sx={{ color: '#FFFFFF' }}>
                  <Box>
                    <AnimatedCounter target="2,400+" variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF' }} />
                    <Typography variant="caption" sx={{ color: '#E4F6ED', display: 'block' }}>Active Volunteers</Typography>
                  </Box>
                  <Box>
                    <AnimatedCounter target="15" variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF' }} />
                    <Typography variant="caption" sx={{ color: '#E4F6ED', display: 'block' }}>States Covered</Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Stack spacing={2}>
              {[
                'Flexible commitments: Weekend camps, evening classes, or virtual roles',
                'Official Volunteer Certificate of Social Service upon 40 hours',
                'Connect with over 2,400 active volunteers across India',
                'Direct mentorship from seasoned NGO field coordinators',
              ].map((item, i) => (
                <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                  <CheckCircleRoundedIcon sx={{ color: '#087A52', fontSize: 20, mt: 0.3 }} />
                  <Typography variant="body2" color="#172B3A" fontWeight={600}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid #DCE6E1' }}>
              <Typography variant="h5" fontWeight={800} color="#172B3A" mb={1}>
                Volunteer Registration Form
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Tell us a little about your skills and interests.
              </Typography>

              {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name *"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address *"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone / WhatsApp *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City *"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State *"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Weekly Availability"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    >
                      <MenuItem value="Weekends (4-6 Hours)">Weekends (4-6 Hours)</MenuItem>
                      <MenuItem value="Weekdays (Evenings 2-4 Hours)">Weekdays (Evenings 2-4 Hours)</MenuItem>
                      <MenuItem value="Full Time Fellowship">Full Time Fellowship</MenuItem>
                      <MenuItem value="On-Call / Periodic Emergency Drives">On-Call / Periodic Emergency Drives</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Primary Area of Interest"
                      value={formData.areas_of_interest}
                      onChange={(e) => setFormData({ ...formData, areas_of_interest: e.target.value })}
                    >
                      {interests.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Key Skills & Prior Experience (Optional)"
                      placeholder="e.g. Teaching Math, Graphic Design, Medicine/Nursing, Social Work, First Aid..."
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{ py: 1.5, fontWeight: 800 }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Volunteer Application'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
