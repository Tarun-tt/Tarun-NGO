import React from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ py: 10, bgcolor: '#F8FAF9', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <Container maxWidth="sm">
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #DCE6E1', textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={800} color="#172B3A" mb={1.5}>
                Something went wrong
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                An unexpected interface issue occurred. Please refresh the page to reload the application.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<RefreshRoundedIcon />}
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </Paper>
          </Container>
        </Box>
      );
    }
    return this.props.children;
  }
}
