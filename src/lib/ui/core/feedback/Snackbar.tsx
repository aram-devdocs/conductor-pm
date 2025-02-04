import React from 'react';
import { 
  Snackbar as MuiSnackbar, 
  SnackbarProps,
  Alert,
  AlertProps,
} from '@mui/material';

export interface CustomSnackbarProps extends SnackbarProps {
  alertProps?: AlertProps;
}

export const Snackbar = ({ alertProps, children, ...props }: CustomSnackbarProps) => {
  return (
    <MuiSnackbar {...props}>
      <Alert {...alertProps}>{children}</Alert>
    </MuiSnackbar>
  );
}; 