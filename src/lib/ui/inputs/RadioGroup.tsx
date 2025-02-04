import React from 'react';
import { 
  RadioGroup as MuiRadioGroup, 
  RadioGroupProps, 
  FormControl, 
  FormLabel, 
  FormControlLabel, 
  Radio 
} from '@mui/material';

export interface CustomRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  label?: string;
  options: Array<{
    label: string;
    value: string | number;
  }>;
}

export const RadioGroup = ({ 
  label,
  options,
  ...props 
}: CustomRadioGroupProps) => {
  return (
    <FormControl component="fieldset">
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <MuiRadioGroup {...props}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
}; 