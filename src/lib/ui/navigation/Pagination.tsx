import React from 'react';
import { 
  Pagination as MuiPagination, 
  PaginationProps,
  PaginationItem,
  PaginationItemProps,
} from '@mui/material';

export interface CustomPaginationProps extends PaginationProps {
  items?: Array<{
    type: 'page' | 'previous' | 'next' | 'start-ellipsis' | 'end-ellipsis';
    selected?: boolean;
    disabled?: boolean;
    props?: PaginationItemProps;
  }>;
}

export const Pagination = ({ items, ...props }: CustomPaginationProps) => {
  return (
    <MuiPagination 
      {...props}
      renderItem={(item) => {
        if (items) {
          const customItem = items.find((i) => i.type === item.type);
          if (customItem) {
            return (
              <PaginationItem
                {...item}
                selected={customItem.selected}
                disabled={customItem.disabled}
                {...customItem.props}
              />
            );
          }
        }
        return <PaginationItem {...item} />;
      }}
    />
  );
}; 