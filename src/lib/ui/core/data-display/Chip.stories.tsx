import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";
import { Avatar } from "./Avatar";
import FaceIcon from '@mui/icons-material/Face';
import React from 'react';

const meta: Meta<typeof Chip> = {
  title: "Core/Data Display/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: "Basic Chip",
  },
};

export const Clickable: Story = {
  args: {
    label: "Clickable Chip",
    onClick: () => console.log('Chip clicked'),
  },
};

export const WithIcon: Story = {
  args: {
    icon: <FaceIcon />,
    label: "Chip with Icon",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Chip label="Outlined" variant="outlined" />
      <Chip label="Filled" variant="filled" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Error" color="error" />
    </div>
  ),
};

export const Deletable: Story = {
  args: {
    label: "Deletable Chip",
    onDelete: () => console.log('Chip deleted'),
  },
};

export const WithAvatar: Story = {
  render: () => (
    <Chip
      avatar={<Avatar alt="Natacha" src="https://mui.com/static/images/avatar/1.jpg" />}
      label="Avatar Chip"
      onDelete={() => console.log('Chip deleted')}
    />
  ),
}; 