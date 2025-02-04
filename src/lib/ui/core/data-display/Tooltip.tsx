import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';

export const Tooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <MuiTooltip {...props}>
      {children}
    </MuiTooltip>
  );
}; 