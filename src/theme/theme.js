import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#087A52',
      light: '#12A36D',
      dark: '#055D3E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#12A36D',
      light: '#34D399',
      dark: '#067049',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#172B3A',
      secondary: '#526677',
    },
    divider: '#E5EDE8',
  },
  typography: {
    fontFamily: '"DM Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 800,
      letterSpacing: '-1.5px',
      color: '#172B3A',
    },
    h2: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 800,
      letterSpacing: '-1px',
      color: '#172B3A',
    },
    h3: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.5px',
      color: '#172B3A',
    },
    h4: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 700,
      color: '#172B3A',
    },
    h5: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 700,
      color: '#172B3A',
    },
    h6: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 700,
      color: '#172B3A',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: '0.2px',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 22px',
          boxShadow: 'none',
          fontSize: '0.92rem',
          '&:hover': {
            boxShadow: '0 4px 14px rgba(8, 122, 82, 0.25)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #087A52 0%, #065F40 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #076E49 0%, #054F35 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(23, 43, 58, 0.05)',
          border: '1px solid #EBF1ED',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 6,
          backgroundColor: '#E8F3EE',
        },
        bar: {
          borderRadius: 6,
          background: 'linear-gradient(90deg, #12A36D 0%, #087A52 100%)',
        },
      },
    },
  },
});
