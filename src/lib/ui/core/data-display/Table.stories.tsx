import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { 
  TableBody, 
  TableCell, 
  TableRow 
} from '@mui/material';
import React from 'react';

const meta: Meta<typeof Table> = {
  title: "Core/Data Display/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    headers: ['Name', 'Age', 'City'],
    rows: [
      ['John Doe', '30', 'New York'],
      ['Jane Smith', '25', 'San Francisco'],
      ['Bob Johnson', '35', 'Chicago']
    ],
  },
};

export const CustomChildren: Story = {
  render: () => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Custom Content 1</TableCell>
          <TableCell>Custom Content 2</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Custom Content 3</TableCell>
          <TableCell>Custom Content 4</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Table 
        size="small"
        headers={['Name', 'Age']}
        rows={[
          ['John Doe', '30'],
          ['Jane Smith', '25']
        ]}
      />
      <Table 
        size="medium"
        headers={['Name', 'Age']}
        rows={[
          ['John Doe', '30'],
          ['Jane Smith', '25']
        ]}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Table 
        variant="outlined"
        headers={['Name', 'Age']}
        rows={[
          ['John Doe', '30'],
          ['Jane Smith', '25']
        ]}
      />
      <Table 
        variant="elevation"
        headers={['Name', 'Age']}
        rows={[
          ['John Doe', '30'],
          ['Jane Smith', '25']
        ]}
      />
    </div>
  ),
}; 