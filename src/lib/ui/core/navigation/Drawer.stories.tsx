import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { Button } from "../inputs/Button";
import { Typography } from "../data-display/Typography";
import React from 'react';

const meta: Meta<typeof Drawer> = {
  title: "Core/Navigation/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Drawer Content
          </Typography>
        </Drawer>
      </>
    );
  },
};

export const Permanent: Story = {
  render: () => (
    <Drawer variant="permanent">
      <Typography variant="h6" sx={{ p: 2 }}>
        Permanent Drawer
      </Typography>
    </Drawer>
  ),
};

export const PersistentLeft: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Persistent Drawer</Button>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Persistent Drawer
          </Typography>
        </Drawer>
      </>
    );
  },
};

export const PersistentRight: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Persistent Drawer</Button>
        <Drawer
          variant="persistent"
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Persistent Drawer
          </Typography>
        </Drawer>
      </>
    );
  },
}; 