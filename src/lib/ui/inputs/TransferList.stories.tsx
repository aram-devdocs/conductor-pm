import type { Meta, StoryObj } from "@storybook/react";
import { TransferList } from "./TransferList";

const meta: Meta<typeof TransferList> = {
  title: "Components/Inputs/TransferList",
  component: TransferList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TransferList>;

const leftItems = [
  { id: '1', label: 'Item 1' },
  { id: '2', label: 'Item 2' },
  { id: '3', label: 'Item 3' },
  { id: '4', label: 'Item 4' },
];

const rightItems = [
  { id: '5', label: 'Item 5' },
  { id: '6', label: 'Item 6' },
];

export const Default: Story = {
  args: {
    leftItems,
    rightItems,
  },
};

export const WithCustomTitles: Story = {
  args: {
    leftItems,
    rightItems,
    leftTitle: "Available",
    rightTitle: "Selected",
  },
};

export const EmptyRight: Story = {
  args: {
    leftItems,
    rightItems: [],
  },
};

export const EmptyLeft: Story = {
  args: {
    leftItems: [],
    rightItems,
  },
}; 