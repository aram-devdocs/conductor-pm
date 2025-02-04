import React from 'react';
import { Popover as MuiPopover, PopoverProps as MuiPopoverProps } from '@mui/material';

export interface PopoverProps extends MuiPopoverProps {
  children: React.ReactNode;
}

export const Popover = ({ children, ...props }: PopoverProps) => {
  return (
    <MuiPopover {...props}>
      {children}
    </MuiPopover>
  );
}; 