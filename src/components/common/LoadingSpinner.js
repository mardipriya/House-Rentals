import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';

const LoadingSpinner = ({ 
  message = 'Loading...', 
  size = 40, 
  fullScreen = false,
  overlay = false 
}) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        ...(fullScreen && {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          bgcolor: 'background.default',
        }),
        ...(overlay && {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(2px)',
        }),
      }}
    >
      <Fade in={true} style={{ transitionDelay: '200ms' }}>
        <CircularProgress size={size} />
      </Fade>
      {message && (
        <Fade in={true} style={{ transitionDelay: '400ms' }}>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </Fade>
      )}
    </Box>
  );

  return content;
};

export default LoadingSpinner; 