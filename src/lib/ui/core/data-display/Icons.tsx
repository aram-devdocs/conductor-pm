import React from 'react';
import { Icon, IconProps } from '@mui/material';

export const Icons = ({ children, ...props }: IconProps) => {
  return (
    <Icon {...props}>
      {children}
    </Icon>
  );
}; 