import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Paper, TextField, Button,
  Alert, CircularProgress, Stack, InputAdornment, IconButton
} from '@mui/material';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@helpingindia.org');
  const [password, setPassword] = useState('Admin@HelpingIndia2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F4FAF7', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3.5, sm: 4.5 },
            borderRadius: 4,
            border: '1.5px solid #D5E8DD',
            bgcolor: '#FFFFFF',
            boxShadow: '0 12px 36px rgba(8, 122, 82, 0.08)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3.5 }}>
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                bgcolor: '#E4F6ED',
                color: '#087A52',
                display: 'grid',
                placeItems: 'center',
                mx: 'auto',
                mb: 1.5,
              }}
            >
              <AdminPanelSettingsRoundedIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h5" fontWeight={800} color="#172B3A">
              Admin Portal
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Helping India Foundation Management
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Admin Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
              startIcon={<LockRoundedIcon />}
              sx={{ py: 1.4, fontWeight: 800 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In to Dashboard'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, p: 1.5, bgcolor: '#FAFDFB', borderRadius: 2, border: '1px dashed #C8E3D5', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Demo Admin Credentials Seeded:
            </Typography>
            <Typography variant="caption" fontWeight={700} color="#087A52">
              admin@helpingindia.org / Admin@HelpingIndia2026!
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
