import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Core/Inputs/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const Default: Story = {
  args: {
    label: "Select an option",
    options: options,
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Select an option",
    options: options,
    value: '2',
  },
};

export const Disabled: Story = {
  args: {
    label: "Select an option",
    options: options,
    // disabled: true,
  },
};

export const Row: Story = {
  args: {
    label: "Select an option",
    options: options,
    row: true,
  },
}; 