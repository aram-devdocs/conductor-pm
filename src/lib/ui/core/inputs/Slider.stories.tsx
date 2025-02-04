import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Core/Inputs/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    label: "Default Slider",
    defaultValue: 30,
  },
};

export const WithValueLabel: Story = {
  args: {
    label: "Slider with Value Label",
    defaultValue: 30,
    valueLabelDisplay: "auto",
  },
};

export const Range: Story = {
  args: {
    label: "Range Slider",
    defaultValue: [20, 37],
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Slider",
    defaultValue: 30,
    disabled: true,
  },
};

export const CustomMarks: Story = {
  args: {
    label: "Marks Slider",
    defaultValue: 20,
    step: 10,
    marks: true,
    min: 0,
    max: 100,
  },
};

export const DiscreteSlider: Story = {
  args: {
    label: "Discrete Slider",
    defaultValue: 30,
    step: 10,
    marks: true,
    min: 0,
    max: 100,
    valueLabelDisplay: "auto",
  },
}; 