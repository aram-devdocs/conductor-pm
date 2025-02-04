import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const MaterialIcons = ({ children, ...props }: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      {children}
    </SvgIcon>
  );
}; 