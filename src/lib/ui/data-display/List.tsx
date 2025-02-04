import React from 'react';
import { 
  List as MuiList, 
  ListProps, 
  ListItem, 
  ListItemText, 
  ListItemIcon 
} from '@mui/material';

export interface CustomListProps extends ListProps {
  items?: Array<{
    primary: string;
    secondary?: string;
    icon?: React.ReactNode;
  }>;
}

export const List = ({ 
  items, 
  children, 
  ...props 
}: CustomListProps) => {
  return (
    <MuiList {...props}>
      {items ? (
        items.map((item, index) => (
          <ListItem key={index}>
            {item.icon && (
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText 
              primary={item.primary} 
              secondary={item.secondary} 
            />
          </ListItem>
        ))
      ) : (
        children
      )}
    </MuiList>
  );
}; 