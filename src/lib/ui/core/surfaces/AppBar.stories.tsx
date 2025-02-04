import type { Meta, StoryObj } from "@storybook/react";
import { AppBar } from "./AppBar";
import { Button } from "../inputs/Button";
import { Typography } from "../data-display/Typography";
import React from 'react';

const meta: Meta<typeof AppBar> = {
  title: "Core/Surfaces/AppBar",
  component: AppBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  args: {
    position: "static",
    toolbarContent: (
      <>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit">Login</Button>
      </>
    ),
  },
};

export const Primary: Story = {
  args: {
    position: "static",
    color: "primary",
    toolbarContent: (
      <>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit">Login</Button>
      </>
    ),
  },
};

export const Dense: Story = {
  args: {
    position: "static",
    color: "primary",
    toolbarContent: (
      <>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit">Login</Button>
      </>
    ),
  },
};

export const WithMenu: Story = {
  render: () => (
    <AppBar position="static">
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        My App
      </Typography>
      <Button color="inherit">Menu 1</Button>
      <Button color="inherit">Menu 2</Button>
      <Button color="inherit">Menu 3</Button>
    </AppBar>
  ),
}; 