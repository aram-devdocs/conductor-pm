import React from 'react';
import { Autocomplete as MuiAutocomplete, AutocompleteProps, TextField } from '@mui/material';

export type AutocompleteOption = {
  label: string;
  value: string | number;
};

export type CustomAutocompleteProps = Omit<
  AutocompleteProps<AutocompleteOption, false, false, false>,
  'renderInput'
> & {
  label?: string;
  error?: boolean;
  helperText?: string;
};

export const Autocomplete = ({ 
  label,
  error,
  helperText,
  ...props 
}: CustomAutocompleteProps) => {
  return (
    <MuiAutocomplete
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}; 