import React from 'react';
import { Backdrop as MuiBackdrop, BackdropProps } from '@mui/material';

export const Backdrop = ({ children, ...props }: BackdropProps) => {
  return (
    <MuiBackdrop {...props}>
      {children}
    </MuiBackdrop>
  );
}; 