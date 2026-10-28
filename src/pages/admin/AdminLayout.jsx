import React, { useState } from 'react';
import { Outlet, Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Divider, IconButton,
  Button, Avatar, Stack, Chip, Container
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';

import { useAuth } from '../../context/AuthContext';

const drawerWidth = 260;

const menuItems = [
  { text: 'Overview', icon: <DashboardRoundedIcon />, path: '/admin' },
  { text: 'Campaigns', icon: <CampaignRoundedIcon />, path: '/admin/campaigns' },
  { text: 'Donations & 80G', icon: <ReceiptLongRoundedIcon />, path: '/admin/donations' },
  { text: 'Volunteers', icon: <PeopleAltRoundedIcon />, path: '/admin/volunteers' },
  { text: 'Impact Stories', icon: <AutoStoriesRoundedIcon />, path: '/admin/stories' },
  { text: 'Gallery Images', icon: <CollectionsRoundedIcon />, path: '/admin/gallery' },
  { text: 'Audit Reports', icon: <AssessmentRoundedIcon />, path: '/admin/reports' },
  { text: 'Settings & UPI', icon: <SettingsRoundedIcon />, path: '/admin/settings' },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return <Box sx={{ p: 6, textAlign: 'center' }}>Loading administration session...</Box>;
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#122332', color: '#FFFFFF' }}>
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ width: 38, height: 38, borderRadius: 2.5, bgcolor: '#087A52', display: 'grid', placeItems: 'center', color: '#FFFFFF' }}>
            <ShieldRoundedIcon />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={800} color="#FFFFFF" lineHeight={1.2}>
              Helping India
            </Typography>
            <Typography variant="caption" sx={{ color: '#889DAE' }}>
              Admin Console
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: '#23374A' }} />

      <List sx={{ flexGrow: 1, px: 1.5, py: 2 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  bgcolor: active ? '#087A52' : 'transparent',
                  color: active ? '#FFFFFF' : '#A4B9C8',
                  '&:hover': {
                    bgcolor: active ? '#087A52' : '#1C3144',
                    color: '#FFFFFF',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: active ? 800 : 500 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: '#23374A' }} />

      <Box sx={{ p: 2 }}>
        <Box sx={{ p: 1.5, bgcolor: '#1A3043', borderRadius: 2, mb: 2 }}>
          <Typography variant="caption" sx={{ color: '#8BA1B3', display: 'block' }}>
            Logged in as:
          </Typography>
          <Typography variant="subtitle2" fontWeight={800} color="#FFFFFF">
            {user?.name || 'Administrator'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#34D399', display: 'block' }}>
            {user?.email}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<LogoutRoundedIcon />}
          onClick={handleLogout}
          sx={{ borderColor: '#334B60', color: '#D2DFE8', '&:hover': { bgcolor: '#243C50' } }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAF9' }}>
      {/* Top Navbar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: '#FFFFFF',
          color: '#172B3A',
          borderBottom: '1px solid #E5EDE8',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuRoundedIcon />
          </IconButton>

          <Typography variant="subtitle1" fontWeight={800} color="#172B3A">
            Admin Management Console
          </Typography>

          <Button
            component={RouterLink}
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewRoundedIcon fontSize="small" />}
            size="small"
            sx={{ color: '#087A52', fontWeight: 700 }}
          >
            Live Public Site
          </Button>
        </Toolbar>
      </AppBar>

      {/* Responsive Navigation Drawer */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #1F3346' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, sm: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
