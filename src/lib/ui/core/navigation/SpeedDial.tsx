import React from 'react';
import { 
  SpeedDial as MuiSpeedDial, 
  SpeedDialProps,
  SpeedDialIcon,
  SpeedDialAction,
  SpeedDialActionProps,
} from '@mui/material';

export interface CustomSpeedDialProps extends SpeedDialProps {
  actions?: Array<{
    icon: React.ReactNode;
    tooltipTitle: string;
    props?: SpeedDialActionProps;
  }>;
}

export const SpeedDial = ({ actions, children, ...props }: CustomSpeedDialProps) => {
  return (
    <MuiSpeedDial {...props} icon={<SpeedDialIcon />}>
      {actions ? (
        actions.map(({ icon, tooltipTitle, props: actionProps }, index) => (
          <SpeedDialAction
            key={index}
            icon={icon}
            tooltipTitle={tooltipTitle}
            {...actionProps}
          />
        ))
      ) : (
        children
      )}
    </MuiSpeedDial>
  );
}; 