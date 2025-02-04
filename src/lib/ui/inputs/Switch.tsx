import React from 'react';
import {
  Switch as MuiSwitch,
  SwitchProps,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

export interface CustomSwitchProps extends SwitchProps {
  label?: string;
  helperText?: string;
}

export const Switch = ({
  label,
  helperText,
  ...props
}: CustomSwitchProps) => {
  const switch_component = <MuiSwitch {...props} />;

  return (
    <FormControl>
      {label ? (
        <FormControlLabel
          control={switch_component}
          label={label}
        />
      ) : (
        switch_component
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}; 