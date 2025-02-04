import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../inputs/Button";
import React from 'react';

const meta: Meta<typeof Tooltip> = {
  title: "Components/Data Display/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip title="Simple tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '2rem',
      height: '300px' 
    }}>
      <Tooltip title="Top" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip title="Right" placement="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip title="Bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip title="Left" placement="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip title="Default tooltip">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip title="Arrow tooltip" arrow>
        <Button>With Arrow</Button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip title="Tooltip on enabled button">
        <Button>Enabled</Button>
      </Tooltip>
      <Tooltip title="Tooltip on disabled button" disableHoverListener>
        <Button disabled>Disabled</Button>
      </Tooltip>
    </div>
  ),
}; 