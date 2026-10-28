import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Container, Box, Typography, Button, Stack,
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemText,
  Badge, Avatar, Tooltip
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { useDonation } from '../../context/DonationContext';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Causes', path: '/causes' },
  { label: 'Our Impact', path: '/impact' },
  { label: 'Stories & Relief', path: '/stories' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Volunteer', path: '/volunteer' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openDonationModal } = useDonation();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: '1px solid #E8EFEA',
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          zIndex: 1100,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 70, md: 78 }, justifyContent: 'space-between', gap: 2 }}>
            {/* Brand Logo */}
            <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 3,
                  bgcolor: '#E4F6ED',
                  color: '#087A52',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 4px 12px rgba(8, 122, 82, 0.15)',
                }}
              >
                <FavoriteRoundedIcon sx={{ fontSize: 26 }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Manrope", sans-serif',
                    fontWeight: 800,
                    letterSpacing: '-0.5px',
                    color: '#172B3A',
                    fontSize: '1.25rem',
                    lineHeight: 1.1,
                  }}
                >
                  Helping India
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#657889',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    display: 'block',
                    letterSpacing: '0.2px',
                  }}
                >
                  Reg. Public Charitable Trust · 80G Certified
                </Typography>
              </Box>
            </RouterLink>

            {/* Desktop Navigation */}
            <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}>
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Button
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: active ? '#087A52' : '#394A58',
                      fontWeight: active ? 800 : 600,
                      fontSize: '0.88rem',
                      px: 1.5,
                      py: 0.8,
                      position: 'relative',
                      bgcolor: active ? '#EBF6F1' : 'transparent',
                      '&:hover': {
                        bgcolor: '#F3F9F6',
                        color: '#087A52',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>

            {/* Action Buttons */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              {/* Receipt Lookup */}
              <Tooltip title="Download 80G Tax Receipt">
                <IconButton
                  component={RouterLink}
                  to="/lookup-receipt"
                  sx={{
                    color: '#526677',
                    display: { xs: 'none', sm: 'inline-flex' },
                    '&:hover': { color: '#087A52', bgcolor: '#EBF6F1' },
                  }}
                  aria-label="Find Tax Receipt"
                >
                  <ReceiptLongRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Admin Portal Shortcut */}
              <Tooltip title={isAuthenticated ? `Logged in: ${user?.name}` : 'Admin Portal'}>
                <IconButton
                  component={RouterLink}
                  to={isAuthenticated ? '/admin' : '/admin/login'}
                  sx={{
                    color: isAuthenticated ? '#087A52' : '#738392',
                    bgcolor: isAuthenticated ? '#E4F6ED' : 'transparent',
                    '&:hover': { bgcolor: '#EBF6F1' },
                  }}
                  aria-label="Admin Portal"
                >
                  <AdminPanelSettingsRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Primary Donate CTA */}
              <Button
                variant="contained"
                color="primary"
                startIcon={<FavoriteRoundedIcon />}
                onClick={() => openDonationModal()}
                sx={{
                  px: { xs: 2, sm: 2.8 },
                  py: 1,
                  fontWeight: 800,
                  fontSize: '0.92rem',
                }}
              >
                Donate Now
              </Button>

              {/* Mobile Hamburger */}
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: 'inline-flex', lg: 'none' }, color: '#172B3A' }}
                aria-label="Open Navigation Menu"
              >
                <MenuRoundedIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer Navigation */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: 300, p: 2.5, bgcolor: '#FFFFFF' },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h6" fontWeight={800} color="#087A52">
              Helping India
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Together for a Better Tomorrow
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileOpen(false)} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <List sx={{ mb: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavClick(item.path)}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': { bgcolor: '#EBF6F1', color: '#087A52', fontWeight: 700 },
                }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavClick('/lookup-receipt')}
              selected={isActive('/lookup-receipt')}
              sx={{ borderRadius: 2 }}
            >
              <ListItemText
                primary="Find 80G Tax Receipt"
                primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(isAuthenticated ? '/admin' : '/admin/login')}
              sx={{ borderRadius: 2 }}
            >
              <ListItemText
                primary={isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
                primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem', color: '#087A52' }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<FavoriteRoundedIcon />}
          onClick={() => {
            setMobileOpen(false);
            openDonationModal();
          }}
          sx={{ py: 1.3, fontWeight: 800 }}
        >
          Donate Now
        </Button>
      </Drawer>
    </>
  );
}
