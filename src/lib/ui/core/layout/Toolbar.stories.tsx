import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toolbar } from "./Toolbar";
import { Button, Typography } from "../..";

const meta: Meta<typeof Toolbar> = {
  title: "Core/Layout/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select", options: ["regular", "dense"] },
      description: "Toolbar variant",
    },
    disableGutters: {
      control: "boolean",
      description: "Disable gutters",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Typography variant="h6">Default Toolbar</Typography>
        <Button>Action</Button>
      </>
    ),
  },
};

export const Dense: Story = {
  args: {
    variant: "dense",
    children: (
      <>
        <Typography variant="subtitle1">Dense Toolbar</Typography>
        <Button size="small">Action</Button>
      </>
    ),
  },
};

export const NoGutters: Story = {
  args: {
    disableGutters: true,
    children: (
      <>
        <Typography variant="h6">No Gutters Toolbar</Typography>
        <Button>Action</Button>
      </>
    ),
  },
};

export const WithMultipleChildren: Story = {
  args: {
    children: (
      <>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Title
        </Typography>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Signup</Button>
      </>
    ),
  },
};
