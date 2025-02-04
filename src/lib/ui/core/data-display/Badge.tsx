import React from 'react';
import { Badge as MuiBadge, BadgeProps } from '@mui/material';

export const Badge = ({ children, ...props }: BadgeProps) => {
  return (
    <MuiBadge {...props}>
      {children}
    </MuiBadge>
  );
}; 