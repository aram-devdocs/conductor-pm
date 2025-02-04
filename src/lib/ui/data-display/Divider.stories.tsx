import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";
import { Typography } from "@mui/material";
import React from 'react';

const meta: Meta<typeof Divider> = {
  title: "Components/Data Display/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Typography>Content Above</Typography>
      <Divider />
      <Typography>Content Below</Typography>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', height: '100px', alignItems: 'center' }}>
      <Typography>Left Content</Typography>
      <Divider orientation="vertical" flexItem />
      <Typography>Right Content</Typography>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Divider>CENTER</Divider>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Divider textAlign="left">LEFT</Divider>
      <Divider textAlign="right">RIGHT</Divider>
      <Divider>CENTER</Divider>
    </div>
  ),
}; 