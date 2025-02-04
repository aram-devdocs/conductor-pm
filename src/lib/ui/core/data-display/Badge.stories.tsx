import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { Avatar } from "./Avatar";
import MailIcon from '@mui/icons-material/Mail';
import React from 'react';

const meta: Meta<typeof Badge> = {
  title: "Core/Data Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    badgeContent: 4,
    color: "primary",
    children: <MailIcon />,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Badge badgeContent={4} color="primary">
        <MailIcon />
      </Badge>
      <Badge badgeContent={4} color="secondary">
        <MailIcon />
      </Badge>
      <Badge badgeContent={4} color="error">
        <MailIcon />
      </Badge>
    </div>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <Badge badgeContent={4} color="primary" overlap="circular">
      <Avatar 
        alt="Travis Howard" 
        src="https://mui.com/static/images/avatar/1.jpg" 
      />
    </Badge>
  ),
};

export const Invisible: Story = {
  args: {
    badgeContent: 4,
    color: "primary",
    invisible: true,
    children: <MailIcon />,
  },
}; 