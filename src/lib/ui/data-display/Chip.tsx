import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';

export const Chip = ({ children, ...props }: ChipProps) => {
  return (
    <MuiChip {...props}>
      {children}
    </MuiChip>
  );
}; 