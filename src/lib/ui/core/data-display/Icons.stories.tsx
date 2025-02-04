import type { Meta, StoryObj } from "@storybook/react";
import { Icons } from "./Icons";
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const meta: Meta<typeof Icons> = {
  title: "Core/Data Display/Icons",
  component: Icons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icons>;

export const Default: Story = {
  render: () => <HomeIcon />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <HomeIcon fontSize="small" />
      <HomeIcon />
      <HomeIcon fontSize="large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="error" />
      <HomeIcon color="disabled" />
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <Icons sx={{ color: 'purple', fontSize: 40 }}>
      <DeleteIcon />
    </Icons>
  ),
}; 