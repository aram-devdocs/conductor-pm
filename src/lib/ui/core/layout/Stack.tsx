import React from 'react';
import { Stack as MuiStack, StackProps } from '@mui/material';

export const Stack = ({ children, ...props }: StackProps) => {
  return (
    <MuiStack {...props}>
      {children}
    </MuiStack>
  );
}; 