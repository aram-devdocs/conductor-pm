import React from 'react';
import { Container as MuiContainer, ContainerProps } from '@mui/material';

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <MuiContainer {...props}>
      {children}
    </MuiContainer>
  );
}; 