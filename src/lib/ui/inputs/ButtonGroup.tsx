import React from 'react';
import { ButtonGroup as MuiButtonGroup, ButtonGroupProps } from '@mui/material';

export const ButtonGroup = ({ children, ...props }: ButtonGroupProps) => {
  return (
    <MuiButtonGroup {...props}>
      {children}
    </MuiButtonGroup>
  );
}; 