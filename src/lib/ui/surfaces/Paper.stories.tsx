import type { Meta, StoryObj } from "@storybook/react";
import { Paper } from "./Paper";
import React from 'react';

const meta: Meta<typeof Paper> = {
  title: "Components/Surfaces/Paper",
  component: Paper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  args: {
    children: "Paper content",
  },
};

export const Elevation: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Paper elevation={0}>Elevation 0</Paper>
      <Paper elevation={1}>Elevation 1</Paper>
      <Paper elevation={2}>Elevation 2</Paper>
      <Paper elevation={3}>Elevation 3</Paper>
      <Paper elevation={4}>Elevation 4</Paper>
      <Paper elevation={5}>Elevation 5</Paper>
    </div>
  ),
};

export const Square: Story = {
  args: {
    square: true,
    children: "Square Paper",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Paper variant="outlined">Outlined</Paper>
      <Paper variant="elevation">Elevation</Paper>
    </div>
  ),
}; 