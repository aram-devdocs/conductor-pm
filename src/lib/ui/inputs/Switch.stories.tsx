import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Inputs/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: "Switch Label",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Switch Label",
    helperText: "Helper text",
  },
};

export const Checked: Story = {
  args: {
    label: "Checked Switch",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Switch",
    disabled: true,
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Switch label="Primary" color="primary" defaultChecked />
      <Switch label="Secondary" color="secondary" defaultChecked />
      <Switch label="Error" color="error" defaultChecked />
      <Switch label="Warning" color="warning" defaultChecked />
      <Switch label="Info" color="info" defaultChecked />
      <Switch label="Success" color="success" defaultChecked />
    </div>
  ),
}; 