import type { Meta, StoryObj } from "@storybook/react";
import { Autocomplete } from "./Autocomplete";

const meta: Meta<typeof Autocomplete> = {
  title: "Core/Inputs/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 4', value: 4 },
];

export const Default: Story = {
  args: {
    options: options,
    label: "Select an option",
  },
};

export const WithError: Story = {
  args: {
    options: options,
    label: "Select an option",
    error: true,
    helperText: "Please select an option",
  },
};

export const Disabled: Story = {
  args: {
    options: options,
    label: "Select an option",
    disabled: true,
  },
}; 