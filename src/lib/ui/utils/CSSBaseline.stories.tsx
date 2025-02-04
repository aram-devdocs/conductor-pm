import type { Meta, StoryObj } from "@storybook/react";
import { CSSBaseline } from "./CSSBaseline";
import React from 'react';

const meta: Meta<typeof CSSBaseline> = {
  title: "Components/Utils/CSSBaseline",
  component: CSSBaseline,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CSSBaseline>;

export const Default: Story = {
  render: () => (
    <>
      <CSSBaseline />
      <div>
        <h1>Hello World</h1>
        <p>This is some sample content.</p>
      </div>
    </>
  ),
}; 