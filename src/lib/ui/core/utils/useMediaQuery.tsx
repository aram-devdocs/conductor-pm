import { useMediaQuery as useMuiMediaQuery } from '@mui/material';

export const useMediaQuery = (query: string) => {
  return useMuiMediaQuery(query);
}; 