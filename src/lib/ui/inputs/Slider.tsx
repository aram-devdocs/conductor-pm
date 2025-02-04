import React from 'react';
import {
  Slider as MuiSlider,
  SliderProps,
  FormControl,
  FormLabel,
} from '@mui/material';

export interface CustomSliderProps extends SliderProps {
  label?: string;
}

export const Slider = ({ label, ...props }: CustomSliderProps) => {
  return (
    <FormControl fullWidth>
      {label && <FormLabel>{label}</FormLabel>}
      <MuiSlider {...props} />
    </FormControl>
  );
}; 