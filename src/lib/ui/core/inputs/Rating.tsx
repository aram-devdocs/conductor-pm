import React from 'react';
import { Rating as MuiRating, RatingProps } from '@mui/material';

export const Rating = ({ ...props }: RatingProps) => {
  return (
    <MuiRating
      {...props}
    />
  );
}; 