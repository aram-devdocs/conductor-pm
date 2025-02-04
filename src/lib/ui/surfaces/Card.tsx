import React from 'react';
import { 
  Card as MuiCard, 
  CardProps,
  CardHeader,
  CardHeaderProps,
  CardContent,
  CardContentProps,
  CardActions,
  CardActionsProps,
  CardMedia,
  CardMediaProps,
} from '@mui/material';

export interface CustomCardProps extends Omit<CardProps, 'content'> {
  headerProps?: CardHeaderProps;
  headerContent?: React.ReactNode;
  mediaProps?: CardMediaProps;
  mediaSrc?: string;
  contentProps?: CardContentProps;
  content?: React.ReactNode;
  actionsProps?: CardActionsProps;
  actions?: React.ReactNode;
}

export const Card = ({
  headerProps,
  headerContent,
  mediaProps,
  mediaSrc,
  contentProps,
  content,
  actionsProps,
  actions,
  children,
  ...props
}: CustomCardProps) => {
  return (
    <MuiCard {...props}>
      {headerContent && <CardHeader {...headerProps}>{headerContent}</CardHeader>}
      {mediaSrc && <CardMedia component="img" src={mediaSrc} {...mediaProps} />}
      {content && <CardContent {...contentProps}>{content}</CardContent>}
      {actions && <CardActions {...actionsProps}>{actions}</CardActions>}
      {children}
    </MuiCard>
  );
}; 