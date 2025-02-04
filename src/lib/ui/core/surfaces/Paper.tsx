import React from 'react';
import { Paper as MuiPaper, PaperProps } from '@mui/material';

export const Paper = ({ children, ...props }: PaperProps) => {
  return (
    <MuiPaper {...props}>
      {children}
    </MuiPaper>
  );
}; 