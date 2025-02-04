import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import React from 'react';

const meta: Meta<typeof Accordion> = {
  title: "Components/Surfaces/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    summaryContent: "Accordion Summary",
    detailsContent: "Accordion Details",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    summaryContent: "Disabled Accordion",
    detailsContent: "This accordion is disabled",
  },
};

export const ExpandedByDefault: Story = {
  args: {
    defaultExpanded: true,
    summaryContent: "Expanded Accordion",
    detailsContent: "This accordion is expanded by default",
  },
};

export const CustomContent: Story = {
  render: () => (
    <Accordion
      summaryContent={
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img 
            src="https://mui.com/static/images/cards/contemplative-reptile.jpg" 
            alt="Contemplative Reptile"
            style={{ width: 50, height: 50, borderRadius: '50%' }}
          />
          <span>Custom Summary</span>
        </div>
      }
      detailsContent={
        <div>
          <h3>Custom Details</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        </div>
      }
    />
  ),
}; 