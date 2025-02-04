import React from 'react';
import { 
  BottomNavigation as MuiBottomNavigation, 
  BottomNavigationProps,
  BottomNavigationAction,
  BottomNavigationActionProps,
} from '@mui/material';

export interface CustomBottomNavigationProps extends BottomNavigationProps {
  actions?: Array<{
    label: string;
    icon: React.ReactNode;
    props?: BottomNavigationActionProps;
  }>;
}

export const BottomNavigation = ({ actions, children, ...props }: CustomBottomNavigationProps) => {
  return (
    <MuiBottomNavigation {...props}>
      {actions ? (
        actions.map(({ label, icon, props: actionProps }, index) => (
          <BottomNavigationAction key={index} label={label} icon={icon} {...actionProps} />
        ))
      ) : (
        children
      )}
    </MuiBottomNavigation>
  );
}; 