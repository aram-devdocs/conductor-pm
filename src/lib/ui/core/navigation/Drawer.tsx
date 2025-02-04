import React from 'react';
import { 
  Drawer as MuiDrawer, 
  DrawerProps,
} from '@mui/material';

export const Drawer = ({ children, ...props }: DrawerProps) => {
  return (
    <MuiDrawer {...props}>
      {children}
    </MuiDrawer>
  );
}; 