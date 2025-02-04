import React from 'react';
import { 
  Menu as MuiMenu, 
  MenuProps,
  MenuItem,
  MenuItemProps,
} from '@mui/material';

export interface CustomMenuProps extends MenuProps {
  items?: Array<{
    label: string;
    props?: MenuItemProps;
  }>;
}

export const Menu = ({ items, children, ...props }: CustomMenuProps) => {
  return (
    <MuiMenu {...props}>
      {items ? (
        items.map(({ label, props: itemProps }, index) => (
          <MenuItem key={index} {...itemProps}>
            {label}
          </MenuItem>
        ))
      ) : (
        children
      )}
    </MuiMenu>
  );
};