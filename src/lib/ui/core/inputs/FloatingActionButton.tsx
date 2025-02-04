import React from 'react';
import { Fab, FabProps } from '@mui/material';

export const FloatingActionButton = ({ children, ...props }: FabProps) => {
  return (
    <Fab {...props}>
      {children}
    </Fab>
  );
}; 