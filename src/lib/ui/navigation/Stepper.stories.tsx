import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";
import { Button } from "../inputs/Button";
import { Typography } from "../data-display/Typography";
import { Step, StepLabel, StepContent } from "@mui/material";
import React from 'react';

const meta: Meta<typeof Stepper> = {
  title: "Components/Navigation/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    steps: [
      { label: 'Step 1', content: 'Step 1 content' },
      { label: 'Step 2', content: 'Step 2 content' },
      { label: 'Step 3', content: 'Step 3 content' },
    ],
  },
};

export const NonLinear: Story = {
  args: {
    nonLinear: true,
    steps: [
      { label: 'Step 1', content: 'Step 1 content' },
      { label: 'Step 2', content: 'Step 2 content' },
      { label: 'Step 3', content: 'Step 3 content' },
    ],
  },
};

export const Orientation: Story = {
  render: () => (
    <div style={{ height: 300 }}>
      <Stepper orientation="vertical">
        <Step>
          <StepLabel>Step 1</StepLabel>
          <StepContent>
            <Typography>Step 1 content</Typography>
            <Button>Continue</Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Step 2</StepLabel>
          <StepContent>
            <Typography>Step 2 content</Typography>
            <Button>Continue</Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Step 3</StepLabel>
          <StepContent>
            <Typography>Step 3 content</Typography>
            <Button>Finish</Button>
          </StepContent>
        </Step>
      </Stepper>
    </div>
  ),
};

export const CustomLabels: Story = {
  args: {
    steps: [
      { 
        label: 'Select campaign settings',
        labelProps: { 
          StepIconComponent: () => <span>1</span>,
        },
        content: 'Step 1 content',
      },
      {
        label: 'Create an ad group',
        labelProps: {
          StepIconComponent: () => <span>2</span>,
        },  
        content: 'Step 2 content',
      },
      {
        label: 'Create an ad',
        labelProps: {
          StepIconComponent: () => <span>3</span>,
        },
        content: 'Step 3 content',  
      },
    ],
  },
}; 