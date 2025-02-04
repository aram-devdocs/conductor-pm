import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';

const meta: Meta<typeof IconButton> = {
  title: "Core/Inputs/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: 'select', options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'] },
      description: 'Button color',
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    edge: {
      control: { type: 'select', options: [false, 'start', 'end'] },
      description: 'Edge positioning',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    children: <DeleteIcon />,
  },
};

export const Colored: Story = {
  args: {
    color: 'primary',
    children: <EditIcon />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <IconButton size="small" color="primary">
        <ShareIcon />
      </IconButton>
      <IconButton size="medium" color="secondary">
        <ShareIcon />
      </IconButton>
      <IconButton size="large" color="error">
        <ShareIcon />
      </IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <DeleteIcon />,
  },
};

export const WithEdge: Story = {
  args: {
    edge: 'start',
    children: <EditIcon />,
  },
}; 