import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { Paper } from "../surfaces/Paper";
import React from 'react';

const meta: Meta<typeof Stack> = {
  title: "Components/Layout/Stack",
  component: Stack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  render: () => (
    <Stack spacing={2}>
      <Paper>Item 1</Paper>
      <Paper>Item 2</Paper>
      <Paper>Item 3</Paper>
    </Stack>
  ),
};

export const Direction: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Paper>Item 1</Paper>
      <Paper>Item 2</Paper>
      <Paper>Item 3</Paper>
    </Stack>
  ),
};

export const Dividers: Story = {
  render: () => (
    <Stack
      direction="row"
      divider={<div style={{ width: '1px', backgroundColor: 'lightgray' }} />}
      spacing={2}
    >
      <Paper>Item 1</Paper>
      <Paper>Item 2</Paper>
      <Paper>Item 3</Paper>
    </Stack>
  ),
};

export const ResponsiveDirection: Story = {
  render: () => (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Paper>Item 1</Paper>
      <Paper>Item 2</Paper>
      <Paper>Item 3</Paper>
    </Stack>
  ),
};

export const InteractiveChildren: Story = {
  render: () => (
    <Stack spacing={2}>
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
    </Stack>
  ),
}; 