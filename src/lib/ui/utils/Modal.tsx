import React from 'react';
import { Modal as MuiModal, ModalProps as MuiModalProps, Box } from '@mui/material';

export interface ModalProps extends Omit<MuiModalProps, 'children'> {
  children: React.ReactNode;
}

export const Modal = ({ children, ...props }: ModalProps) => {
  return (
    <MuiModal {...props}>
      <Box>{children}</Box>
    </MuiModal>
  );
};
