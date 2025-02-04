import type { Meta, StoryObj } from "@storybook/react";
import { Backdrop } from "./Backdrop";

const meta: Meta<typeof Backdrop> = {
  title: "Components/Feedback/Backdrop",
  component: Backdrop,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Backdrop>;

export const Default: Story = {
  args: {
    open: true,
    children: 'Loading...',
  },
};

export const Invisible: Story = {
  args: {
    open: true,
    invisible: true,
    children: 'Loading...',
  },
}; 