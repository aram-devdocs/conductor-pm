import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar } from "./Snackbar";
import { Alert } from "@mui/material";
import React from 'react';

const meta: Meta<typeof Snackbar> = {
  title: "Components/Feedback/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {
    open: true,
    message: "This is a default snackbar",
  },
};

export const WithAction: Story = {
  args: {
    open: true,
    message: "Snackbar with action",
    action: "Undo",
  },
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Alert>Top Left</Alert>
      </Snackbar>
      <Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert>Top Center</Alert>
      </Snackbar>
      <Snackbar open anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert>Top Right</Alert>
      </Snackbar>
      <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert>Bottom Left</Alert>
      </Snackbar>
      <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert>Bottom Center</Alert>
      </Snackbar>
      <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert>Bottom Right</Alert>
      </Snackbar>
    </div>
  ),
};

export const Severity: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Snackbar open alertProps={{ severity: 'error' }}>
        <Alert severity="error">Error Snackbar</Alert>
      </Snackbar>
      <Snackbar open alertProps={{ severity: 'warning' }}>
        <Alert severity="warning">Warning Snackbar</Alert>
      </Snackbar>
      <Snackbar open alertProps={{ severity: 'info' }}>
        <Alert severity="info">Info Snackbar</Alert>
      </Snackbar>
      <Snackbar open alertProps={{ severity: 'success' }}>
        <Alert severity="success">Success Snackbar</Alert>
      </Snackbar>
    </div>
  ),
}; 