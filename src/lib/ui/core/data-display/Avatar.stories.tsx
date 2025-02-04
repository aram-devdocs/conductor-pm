import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import React from 'react';

const meta: Meta<typeof Avatar> = {
  title: "Core/Data Display/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    children: 'AH',
  },
};

export const Image: Story = {
  args: {
    src: 'https://mui.com/static/images/avatar/1.jpg',
    alt: 'Profile Picture',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Avatar sizes="small">SM</Avatar>
      <Avatar>MD</Avatar>
      <Avatar sizes="large">LG</Avatar>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Avatar variant="circular">A</Avatar>
      <Avatar variant="rounded">B</Avatar>
      <Avatar variant="square">C</Avatar>
    </div>
  ),
}; 