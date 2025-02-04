import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";
import React from 'react';

const meta: Meta<typeof Link> = {
  title: "Core/Navigation/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: "Default Link",
    href: "#",
  },
};

export const Underline: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Link href="#" underline="none">
        No underline
      </Link>
      <Link href="#" underline="hover">
        Underline on hover
      </Link>
      <Link href="#" underline="always">
        Always underline
      </Link>
    </div>
  ),
};

export const Color: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Link href="#" color="primary">
        Primary color
      </Link>
      <Link href="#" color="secondary">
        Secondary color
      </Link>
      <Link href="#" color="error">
        Error color
      </Link>
    </div>
  ),
};

export const Variant: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Link href="#" variant="body1">
        Body1 variant
      </Link>
      <Link href="#" variant="body2">
        Body2 variant
      </Link>
      <Link href="#" variant="caption">
        Caption variant
      </Link>
    </div>
  ),
}; 