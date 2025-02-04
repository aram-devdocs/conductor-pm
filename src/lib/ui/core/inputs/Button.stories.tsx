import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: "Core/Inputs/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'success', 'warning', 'info'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// Primary Button Variants
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "contained",
    color: "primary",
  },
};

export const PrimaryOutlined: Story = {
  args: {
    children: "Primary Outlined",
    variant: "outlined",
    color: "primary",
  },
};

export const PrimaryText: Story = {
  args: {
    children: "Primary Text",
    variant: "text",
    color: "primary",
  },
};

// Secondary Button Variants
export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "contained",
    color: "secondary",
  },
};

export const SecondaryOutlined: Story = {
  args: {
    children: "Secondary Outlined",
    variant: "outlined",
    color: "secondary",
  },
};

// Size Variations
export const SmallButton: Story = {
  args: {
    children: "Small Button",
    size: "small",
    variant: "contained",
  },
};

export const MediumButton: Story = {
  args: {
    children: "Medium Button",
    size: "medium",
    variant: "contained",
  },
};

export const LargeButton: Story = {
  args: {
    children: "Large Button",
    size: "large",
    variant: "contained",
  },
};

// Disabled State
export const DisabledButton: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
    variant: "contained",
  },
};

// Color Variations
export const ErrorButton: Story = {
  args: {
    children: "Error Button",
    color: "error",
    variant: "contained",
  },
};

export const SuccessButton: Story = {
  args: {
    children: "Success Button",
    color: "success",
    variant: "contained",
  },
};

export const WarningButton: Story = {
  args: {
    children: "Warning Button",
    color: "warning",
    variant: "contained",
  },
};
