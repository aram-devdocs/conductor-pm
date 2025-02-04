import type { Meta, StoryObj } from "@storybook/react";
import { ToggleButton } from "./ToggleButton";
import { ToggleButtonGroup } from "@mui/material";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import React from 'react';


const meta: Meta<typeof ToggleButton> = {
  title: "Components/Inputs/ToggleButton",
  component: ToggleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  args: {
    children: "Toggle Button",
    value: "toggle",
  },
};

export const Selected: Story = {
  args: {
    children: "Selected Button",
    value: "selected",
    selected: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: <FormatBoldIcon />,
    value: "bold",
    "aria-label": "bold",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    value: "disabled",
    disabled: true,
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <ToggleButton value="primary" color="primary">
        Primary
      </ToggleButton>
      <ToggleButton value="secondary" color="secondary">
        Secondary
      </ToggleButton>
      <ToggleButton value="error" color="error">
        Error
      </ToggleButton>
      <ToggleButton value="warning" color="warning">
        Warning
      </ToggleButton>
    </div>
  ),
};

export const GroupExample: Story = {
  render: () => (
    <ToggleButtonGroup>
      <ToggleButton value="bold" aria-label="bold">
        <FormatBoldIcon />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        <FormatItalicIcon />
      </ToggleButton>
      <ToggleButton value="underlined" aria-label="underlined">
        <FormatUnderlinedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  ),
}; 