import React from 'react';
import { Rating as MuiRating, RatingProps } from '@mui/material';

export interface CustomRatingProps extends RatingProps {
  // Add any custom props here
}

export const Rating = ({ ...props }: CustomRatingProps) => {
  return (
    <MuiRating
      {...props}
    />
  );
}; 