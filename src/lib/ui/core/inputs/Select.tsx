import React from 'react';
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from '@mui/material';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface CustomSelectProps extends Omit<MuiSelectProps<unknown>, 'children'> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: boolean;
}

export const Select = ({
  label,
  options,
  helperText,
  error,
  id,
  variant = 'outlined',
  ...props
}: CustomSelectProps) => {
  const labelId = `${id}-label` || 'select-label';
  
  return (
    <FormControl fullWidth error={error}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        labelId={labelId}
        label={label}
        variant={variant}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}; 