import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { FormControlLabel } from "@mui/material";

const meta: Meta<typeof Checkbox> = {
  title: "Core/Inputs/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'success', 'warning'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <FormControlLabel 
      control={<Checkbox {...args} />} 
      label="Checkbox with Label" 
    />
  ),
};

export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
  },
};

export const ErrorColor: Story = {
  args: {
    color: 'error',
  },
}; 