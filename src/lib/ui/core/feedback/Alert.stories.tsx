import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import React from 'react';

const meta: Meta<typeof Alert> = {
  title: "Core/Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: 'This is a default alert',
  },
};

export const Severity: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert severity="error">This is an error alert</Alert>
      <Alert severity="warning">This is a warning alert</Alert>
      <Alert severity="info">This is an info alert</Alert>
      <Alert severity="success">This is a success alert</Alert>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="standard">This is a standard alert</Alert>
      <Alert variant="outlined">This is an outlined alert</Alert>
      <Alert variant="filled">This is a filled alert</Alert>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Alert 
      action={
        <button>
          UNDO
        </button>
      }
    >
      This is an alert with an action
    </Alert>
  ),
}; 