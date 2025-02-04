import React from 'react';
import { Avatar as MuiAvatar, AvatarProps } from '@mui/material';

export const Avatar = ({ children, ...props }: AvatarProps) => {
  return (
    <MuiAvatar {...props}>
      {children}
    </MuiAvatar>
  );
}; 