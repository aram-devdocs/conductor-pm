import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Inputs/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
];

export const Default: Story = {
  args: {
    label: "Select Option",
    options: options,
  },
};

export const WithValue: Story = {
  args: {
    label: "Select Option",
    options: options,
    value: '2',
  },
};

export const WithError: Story = {
  args: {
    label: "Select Option",
    options: options,
    error: true,
    helperText: "Please select an option",
  },
};

export const Disabled: Story = {
  args: {
    label: "Select Option",
    options: options,
    disabled: true,
  },
};

export const Multiple: Story = {
  args: {
    label: "Select Multiple",
    options: options,
    multiple: true,
  },
}; 