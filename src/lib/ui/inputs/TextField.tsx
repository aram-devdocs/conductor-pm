import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

export const TextField = ({ ...props }: TextFieldProps) => {
  return (
    <MuiTextField 
      {...props}
      // You can add custom styling or default props here
      variant={props.variant || 'outlined'}
    />
  );
}; 