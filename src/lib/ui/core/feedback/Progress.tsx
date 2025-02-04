import React from 'react';
import { 
  CircularProgress as MuiCircularProgress, 
  CircularProgressProps,
  LinearProgress as MuiLinearProgress,
  LinearProgressProps,
} from '@mui/material';

export const CircularProgress = (props: CircularProgressProps) => {
  return <MuiCircularProgress {...props} />;
};

export const LinearProgress = (props: LinearProgressProps) => {
  return <MuiLinearProgress {...props} />;
}; 