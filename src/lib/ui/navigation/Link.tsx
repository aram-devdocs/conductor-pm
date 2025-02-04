import React from 'react';
import { Link as MuiLink, LinkProps } from '@mui/material';

export const Link = ({ children, ...props }: LinkProps) => {
  return (
    <MuiLink {...props}>
      {children}
    </MuiLink>
  );
}; 