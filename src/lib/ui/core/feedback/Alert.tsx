import React from 'react';
import { Alert as MuiAlert, AlertProps } from '@mui/material';

export const Alert = ({ children, ...props }: AlertProps) => {
  return (
    <MuiAlert {...props}>
      {children}
    </MuiAlert>
  );
}; 