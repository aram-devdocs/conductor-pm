import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Typography } from "../data-display/Typography";
import React from 'react';

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/subcategory' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/subcategory' },
    ],
    separator: '>',
  },
};

export const WithTypography: Story = {
  render: () => (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="text.primary">Home</Typography>
      <Typography color="text.primary">Category</Typography>
      <Typography color="text.primary">Subcategory</Typography>
    </Breadcrumbs>
  ),
};

export const Collapsed: Story = {
  args: {
    maxItems: 2,
    links: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/subcategory' },
      { label: 'Product', href: '/category/subcategory/product' },
    ],
  },
}; 