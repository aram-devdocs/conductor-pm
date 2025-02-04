import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";
import React from 'react';

const meta: Meta<typeof Skeleton> = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Skeleton animation="wave" width={100} />
      <Skeleton animation="pulse" width={100} />
      <Skeleton animation={false} width={100} />
    </div>
  ),
}; 