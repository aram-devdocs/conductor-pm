import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { Tab } from "@mui/material";
import React from 'react';

const meta: Meta<typeof Tabs> = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
    ],
  },
};

export const Scrollable: Story = {
  args: {
    variant: "scrollable",
    tabs: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
      { label: 'Tab 4' },
      { label: 'Tab 5' },
      { label: 'Tab 6' },
      { label: 'Tab 7' },
    ],
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    tabs: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
    ],
  },
};

export const FullWidth: Story = {
  args: {
    variant: "fullWidth",
    tabs: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
    ],
  },
};

export const Centered: Story = {
  args: {
    centered: true,
    tabs: [
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
    ],
  },
};

export const CustomTabs: Story = {
  render: () => (
    <Tabs value={1}>
      <Tab label="Custom Tab 1" />
      <Tab label="Custom Tab 2" disabled />
      <Tab label="Custom Tab 3" />
    </Tabs>
  ),
}; 