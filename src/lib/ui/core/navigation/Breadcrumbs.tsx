import React from 'react';
import { 
  Breadcrumbs as MuiBreadcrumbs, 
  BreadcrumbsProps,
  Link,
  LinkProps,
} from '@mui/material';

export interface BreadcrumbLink {
  label: string;
  href?: string;
  onClick?: () => void;
  props?: Omit<LinkProps, 'onClick' | 'href'>;
}

export interface CustomBreadcrumbsProps extends BreadcrumbsProps {
  links?: BreadcrumbLink[];
}

export const Breadcrumbs = ({ links, children, ...props }: CustomBreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs {...props}>
      {links ? (
        links.map(({ label, href, onClick, props: linkProps }, index) => (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            href={href}
            onClick={onClick}
            component={onClick ? 'button' : 'a'}
            sx={{ 
              cursor: onClick ? 'pointer' : 'default',
              border: 'none',
              background: 'none',
              p: 0,
              '&:hover': {
                textDecoration: onClick ? 'underline' : 'none',
              }
            }}
            {...linkProps}
          >
            {label}
          </Link>
        ))
      ) : (
        children
      )}
    </MuiBreadcrumbs>
  );
}; 