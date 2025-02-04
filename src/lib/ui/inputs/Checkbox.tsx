import React from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps } from '@mui/material';

export const Checkbox = ({ ...props }: CheckboxProps) => {
  return (
    <MuiCheckbox 
      {...props}
      // You can add custom styling or default props here
      color={props.color || 'primary'}
    />
  );
}; 