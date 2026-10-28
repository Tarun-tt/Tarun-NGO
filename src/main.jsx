import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';
import './styles.css';

const theme = createTheme({
  palette: { primary: { main: '#07845e', dark: '#056747' }, secondary: { main: '#f59e0b' }, background: { default: '#ffffff', paper: '#ffffff' }, text: { primary: '#18283b', secondary: '#607086' } },
  typography: { fontFamily: 'DM Sans, sans-serif', h1: { fontFamily: 'Manrope, sans-serif', fontWeight: 800 }, h2: { fontFamily: 'Manrope, sans-serif', fontWeight: 800 }, h3: { fontFamily: 'Manrope, sans-serif', fontWeight: 800 }, button: { textTransform: 'none', fontWeight: 700 } },
  shape: { borderRadius: 14 }, components: { MuiButton: { styleOverrides: { root: { borderRadius: 10, padding: '10px 19px', boxShadow: 'none' } } }, MuiCard: { styleOverrides: { root: { borderRadius: 16, boxShadow: '0 5px 22px rgba(20,48,65,.05)' } } } }
});

createRoot(document.getElementById('root')).render(<React.StrictMode><ThemeProvider theme={theme}><CssBaseline /><App /></ThemeProvider></React.StrictMode>);
