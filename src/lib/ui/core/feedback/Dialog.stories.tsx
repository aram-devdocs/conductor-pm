import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import { Button } from "../inputs/Button";
import React from 'react';

const meta: Meta<typeof Dialog> = {
  title: "Core/Feedback/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    open: true,
    title: "Default Dialog",
    content: "This is a default dialog",
    actions: <Button onClick={() => console.log("Clicked")}>Close</Button>,
  },
};

export const WithoutTitle: Story = {
  args: {
    open: true,
    content: "This is a dialog without a title",
    actions: <Button onClick={() => console.log("Clicked")}>Close</Button>,
  },
};

export const WithoutActions: Story = {
  args: {
    open: true,
    title: "Dialog without actions",
    content: "This is a dialog without actions",
  },
};

export const FullWidth: Story = {
  args: {
    open: true,
    title: "Full width dialog",
    content: "This is a full width dialog",
    fullWidth: true,
    maxWidth: "sm",
  },
}; 