import type { Meta, StoryObj } from "@storybook/react";
import { FloatingActionButton } from "./FloatingActionButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import React from 'react';

const meta: Meta<typeof FloatingActionButton> = {
  title: "Components/Inputs/FloatingActionButton",
  component: FloatingActionButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

export const Default: Story = {
  render: (args) => (
    <FloatingActionButton {...args}>
      <AddIcon />
    </FloatingActionButton>
  ),
};

export const Secondary: Story = {
  render: (args) => (
    <FloatingActionButton color="secondary" {...args}>
      <EditIcon />
    </FloatingActionButton>
  ),
};

export const Extended: Story = {
  render: (args) => (
    <FloatingActionButton variant="extended" {...args}>
      <AddIcon sx={{ mr: 1 }} />
      Add Item
    </FloatingActionButton>
  ),
};

export const Small: Story = {
  render: (args) => (
    <FloatingActionButton size="small" {...args}>
      <AddIcon />
    </FloatingActionButton>
  ),
};
