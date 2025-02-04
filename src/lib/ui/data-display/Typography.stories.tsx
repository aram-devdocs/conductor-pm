import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";
import React from 'react';

const meta: Meta<typeof Typography> = {
  title: "Components/Data Display/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Default Typography',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h1">H1 Heading</Typography>
      <Typography variant="h2">H2 Heading</Typography>
      <Typography variant="h3">H3 Heading</Typography>
      <Typography variant="h4">H4 Heading</Typography>
      <Typography variant="h5">H5 Heading</Typography>
      <Typography variant="h6">H6 Heading</Typography>
      <Typography variant="body1">Body 1 Text</Typography>
      <Typography variant="body2">Body 2 Text</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography color="primary">Primary Color</Typography>
      <Typography color="secondary">Secondary Color</Typography>
      <Typography color="error">Error Color</Typography>
      <Typography color="success">Success Color</Typography>
      <Typography color="warning">Warning Color</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Typography align="left">Left Aligned</Typography>
      <Typography align="center">Center Aligned</Typography>
      <Typography align="right">Right Aligned</Typography>
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography gutterBottom>Gutters Bottom</Typography>
      <Typography noWrap>No Wrap Long Text That Will Be Truncated</Typography>
      <Typography paragraph>Paragraph Text</Typography>
    </div>
  ),
}; 