import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "Components/Layout/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: "Box Content",
  },
};

export const WithBorder: Story = {
  args: {
    border: 1,
    children: "Box with Border",
  },
};

export const WithBorderRadius: Story = {
  args: {
    borderRadius: 8,
    children: "Box with Border Radius",
  },
};

export const WithBackgroundColor: Story = {
  args: {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    p: 2,
    children: "Box with Background Color",
  },
};

export const WithPadding: Story = {
  args: {
    p: 4,
    children: "Box with Padding",
  },
};

export const WithMargin: Story = {
  args: {
    m: 4,
    children: "Box with Margin",
  },
};

export const WithShadow: Story = {
  args: {
    boxShadow: 3,
    p: 4,
    children: "Box with Shadow",
  },
}; 