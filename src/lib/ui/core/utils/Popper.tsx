import React from 'react';
import { Popper as MuiPopper, PopperProps as MuiPopperProps } from '@mui/material';

export interface PopperProps extends MuiPopperProps {
  children: React.ReactNode;
}

export const Popper = ({ children, ...props }: PopperProps) => {
  return (
    <MuiPopper {...props}>
      {children}
    </MuiPopper>
  );
}; 