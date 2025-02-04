import React from 'react';
import { 
  AppBar as MuiAppBar, 
  AppBarProps,
  Toolbar,
  ToolbarProps,
} from '@mui/material';

export interface CustomAppBarProps extends AppBarProps {
  toolbarProps?: ToolbarProps;
  toolbarContent?: React.ReactNode;
}

export const AppBar = ({
  toolbarProps,
  toolbarContent,
  children,
  ...props
}: CustomAppBarProps) => {
  return (
    <MuiAppBar {...props}>
      <Toolbar {...toolbarProps}>
        {toolbarContent}
        {children}
      </Toolbar>
    </MuiAppBar>
  );
}; 