import React from 'react';
import { 
  Dialog as MuiDialog, 
  DialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export interface CustomDialogProps extends Omit<DialogProps, 'content'> {
  title?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Dialog = ({
  title,
  content,
  actions,
  children,
  ...props
}: CustomDialogProps) => {
  return (
    <MuiDialog {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      {actions && <DialogActions>{actions}</DialogActions>}
      {children}
    </MuiDialog>
  );
}; 