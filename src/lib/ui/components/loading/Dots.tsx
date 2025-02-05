import React from 'react';
import { Box, keyframes, styled } from '@mui/material';

const dotAnimation = keyframes`
  0%, 80%, 100% { 
    opacity: 0.5; 
    transform: scale(0.7);
  }
  40% { 
    opacity: 1; 
    transform: scale(1);
  }
`;

const Dot = styled('div')(({ theme }) => ({
  width: 8,
  height: 8,
  margin: '0 4px',
  borderRadius: '50%',
  backgroundColor: theme.palette.text.secondary,
  display: 'inline-block',
  animation: `${dotAnimation} 1.4s infinite ease-in-out both`,
}));

export const Dots: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        p: 1,
        backgroundColor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <Dot sx={{ animationDelay: '-0.32s' }} />
      <Dot sx={{ animationDelay: '-0.16s' }} />
      <Dot />
    </Box>
  );
}; 