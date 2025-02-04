import React from 'react';
import { Box as MuiBox, BoxProps } from '@mui/material';

export const Box = ({ children, ...props }: BoxProps) => {
  return (
    <MuiBox {...props}>
      {children}
    </MuiBox>
  );
}; 