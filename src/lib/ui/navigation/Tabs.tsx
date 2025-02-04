import React from 'react';
import { 
  Tabs as MuiTabs, 
  TabsProps,
  Tab,
  TabProps,
} from '@mui/material';

export interface CustomTabsProps extends TabsProps {
  tabs?: Array<{
    label: string;
    props?: TabProps;
  }>;
}

export const Tabs = ({ tabs, children, ...props }: CustomTabsProps) => {
  return (
    <MuiTabs {...props}>
      {tabs ? (
        tabs.map(({ label, props: tabProps }, index) => (
          <Tab key={index} label={label} {...tabProps} />
        ))
      ) : (
        children
      )}
    </MuiTabs>
  );
}; 