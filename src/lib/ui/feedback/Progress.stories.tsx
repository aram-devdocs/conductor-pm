import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress, LinearProgress } from "./Progress";
import React from 'react';

const meta: Meta<typeof CircularProgress> = {
  title: "Components/Feedback/Progress",
  component: CircularProgress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Circular: Story = {};

export const CircularWithLabel: Story = {
  args: {
    variant: "determinate",
    value: 25,
  },
};

export const CircularColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <CircularProgress color="primary" />
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="warning" />
      <CircularProgress color="error" />
      <CircularProgress color="info" />
    </div>
  ),
};

export const Linear: Story = {
  render: () => <LinearProgress />,
};

export const LinearWithLabel: Story = {
  render: () => <LinearProgress variant="determinate" value={50} />,
};

export const LinearColor: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <LinearProgress color="primary" />
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="warning" />
      <LinearProgress color="error" />
      <LinearProgress color="info" />
    </div>
  ),
}; 