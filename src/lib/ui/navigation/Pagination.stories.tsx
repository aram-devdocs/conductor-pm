import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import React from 'react';

const meta: Meta<typeof Pagination> = {
  title: "Components/Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    count: 10,
  },
};

export const Disabled: Story = {
  args: {
    count: 10,
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Pagination count={10} size="small" />
      <Pagination count={10} />
      <Pagination count={10} size="large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} color="standard" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Pagination count={10} variant="text" />
      <Pagination count={10} variant="outlined" />
    </div>
  ),
};

export const CustomItems: Story = {
  args: {
    count: 10,
    items: [
      { type: 'previous', disabled: true },
      { type: 'page', selected: true },
      { type: 'page' },
      { type: 'page' },
      { type: 'next' },
    ],
  },
}; 