import React from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';

export const Typography = ({ children, ...props }: TypographyProps) => {
  return (
    <MuiTypography {...props}>
      {children}
    </MuiTypography>
  );
}; 