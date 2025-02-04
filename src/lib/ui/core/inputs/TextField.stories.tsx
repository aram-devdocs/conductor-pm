import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Core/Inputs/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'success', 'warning'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: "Default TextField",
    placeholder: "Enter text",
  },
};

export const Outlined: Story = {
  args: {
    label: "Outlined TextField",
    variant: "outlined",
  },
};

export const Filled: Story = {
  args: {
    label: "Filled TextField",
    variant: "filled",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled TextField",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: "Error TextField",
    error: true,
    helperText: "Invalid input",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
  },
};

export const Multiline: Story = {
  args: {
    label: "Multiline TextField",
    multiline: true,
    rows: 4,
  },
}; 