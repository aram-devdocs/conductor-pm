import type { Meta, StoryObj } from "@storybook/react";
import { SpeedDial } from "./SpeedDial";
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import React from 'react';

const meta: Meta<typeof SpeedDial> = {
  title: "Components/Navigation/SpeedDial",
  component: SpeedDial,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpeedDial>;

export const Default: Story = {
  args: {
    ariaLabel: "SpeedDial example",
    actions: [
      { icon: <FileCopyIcon />, tooltipTitle: 'Copy' },
      { icon: <SaveIcon />, tooltipTitle: 'Save' },
      { icon: <PrintIcon />, tooltipTitle: 'Print' },
      { icon: <ShareIcon />, tooltipTitle: 'Share' },
    ],
  },
};

export const Directions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <SpeedDial
        ariaLabel="SpeedDial up example"
        direction="up"
        actions={[
          { icon: <FileCopyIcon />, tooltipTitle: 'Copy' },
          { icon: <SaveIcon />, tooltipTitle: 'Save' },
          { icon: <PrintIcon />, tooltipTitle: 'Print' },
          { icon: <ShareIcon />, tooltipTitle: 'Share' },
        ]}
      />
      <SpeedDial
        ariaLabel="SpeedDial right example"
        direction="right"
        actions={[
          { icon: <FileCopyIcon />, tooltipTitle: 'Copy' },
          { icon: <SaveIcon />, tooltipTitle: 'Save' },
          { icon: <PrintIcon />, tooltipTitle: 'Print' },
          { icon: <ShareIcon />, tooltipTitle: 'Share' },
        ]}
      />
      <SpeedDial
        ariaLabel="SpeedDial down example"
        direction="down"
        actions={[
          { icon: <FileCopyIcon />, tooltipTitle: 'Copy' },
          { icon: <SaveIcon />, tooltipTitle: 'Save' },
          { icon: <PrintIcon />, tooltipTitle: 'Print' },
          { icon: <ShareIcon />, tooltipTitle: 'Share' },
        ]}
      />
      <SpeedDial
        ariaLabel="SpeedDial left example"
        direction="left"
        actions={[
          { icon: <FileCopyIcon />, tooltipTitle: 'Copy' },
          { icon: <SaveIcon />, tooltipTitle: 'Save' },
          { icon: <PrintIcon />, tooltipTitle: 'Print' },
          { icon: <ShareIcon />, tooltipTitle: 'Share' },
        ]}
      />
    </div>
  ),
};

export const CustomIcon: Story = {
  args: {
    ariaLabel: "SpeedDial custom icon example",
    icon: <ShareIcon />,
    actions: [
      { icon: <FileCopyIcon />, tooltipTitle: 'Copy' },
      { icon: <SaveIcon />, tooltipTitle: 'Save' },
      { icon: <PrintIcon />, tooltipTitle: 'Print' },
    ],
  },
}; 
 