import React from 'react';
import { 
  Breadcrumbs as MuiBreadcrumbs, 
  BreadcrumbsProps,
  Link,
  LinkProps,
} from '@mui/material';

export interface CustomBreadcrumbsProps extends BreadcrumbsProps {
  links?: Array<{
    label: string;
    href?: string;
    props?: LinkProps;
  }>;
}

export const Breadcrumbs = ({ links, children, ...props }: CustomBreadcrumbsProps) => {
  return (
    <MuiBreadcrumbs {...props}>
      {links ? (
        links.map(({ label, href, props: linkProps }, index) => (
          <Link key={index} underline="hover" color="inherit" href={href} {...linkProps}>
            {label}
          </Link>
        ))
      ) : (
        children
      )}
    </MuiBreadcrumbs>
  );
}; 