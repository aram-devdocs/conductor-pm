import type { Meta, StoryObj } from "@storybook/react";
import { MaterialIcons } from "./MaterialIcons";
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';

const meta: Meta<typeof MaterialIcons> = {
  title: "Components/Data Display/MaterialIcons",
  component: MaterialIcons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MaterialIcons>;

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
    <MaterialIcons sx={{ color: 'purple', fontSize: 40 }}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </MaterialIcons>
  ),
}; 