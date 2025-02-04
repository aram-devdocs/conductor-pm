import React from 'react';
import { Grid as MuiGrid, GridProps } from '@mui/material';

export const Grid = ({ children, ...props }: GridProps) => {
  return (
    <MuiGrid {...props}>
      {children}
    </MuiGrid>
  );
}; 