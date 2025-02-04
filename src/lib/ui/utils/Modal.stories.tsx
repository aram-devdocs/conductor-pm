import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button, Typography } from "@mui/material";
import React from 'react';

const meta: Meta<typeof Modal> = {
  title: "Components/Utils/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            backgroundColor: 'white', 
            padding: '2rem', 
            outline: 'none' 
          }}>
            <Typography id="modal-title" variant="h6" component="h2">
              Modal Title
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              This is the modal content.
            </Typography>
          </div>
        </Modal>
      </div>
    );
  },
};

export const WithBackdrop: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <Button onClick={handleOpen}>Open Modal with Backdrop</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            backgroundColor: 'white', 
            padding: '2rem', 
            outline: 'none' 
          }}>
            <Typography id="modal-title" variant="h6" component="h2">
              Modal with Backdrop
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              This modal has a backdrop transition.
            </Typography>
          </div>
        </Modal>
      </div>
    );
  },
}; 