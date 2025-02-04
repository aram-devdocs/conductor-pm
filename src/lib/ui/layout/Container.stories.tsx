import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";
import React from 'react';

const meta: Meta<typeof Container> = {
  title: "Components/Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: "Container Content",
  },
};

export const FixedWidth: Story = {
  args: {
    fixed: true,
    children: "Fixed Width Container",
  },
};

export const MaxWidth: Story = {
  render: () => (
    <>
      <Container maxWidth="xs">
        <div style={{ backgroundColor: 'lightblue', padding: '1rem' }}>
          xs Container
        </div>
      </Container>
      <Container maxWidth="sm">
        <div style={{ backgroundColor: 'lightgreen', padding: '1rem' }}>
          sm Container
        </div>
      </Container>
      <Container maxWidth="md">
        <div style={{ backgroundColor: 'lightyellow', padding: '1rem' }}>
          md Container
        </div>
      </Container>
      <Container maxWidth="lg">
        <div style={{ backgroundColor: 'lightpink', padding: '1rem' }}>
          lg Container
        </div>
      </Container>
      <Container maxWidth="xl">
        <div style={{ backgroundColor: 'lightgray', padding: '1rem' }}>
          xl Container
        </div>
      </Container>
    </>
  ),
};

export const Fluid: Story = {
  args: {
    maxWidth: false,
    children: "Fluid Container",
  },
};

export const DisableGutters: Story = {
  args: {
    disableGutters: true,
    children: "Container without Gutters",
  },
}; 