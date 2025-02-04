import React from 'react';
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonProps,
} from '@mui/material';

export const ToggleButton = ({ children, ...props }: ToggleButtonProps) => {
  return (
    <MuiToggleButton {...props}>
      {children}
    </MuiToggleButton>
  );
}; 