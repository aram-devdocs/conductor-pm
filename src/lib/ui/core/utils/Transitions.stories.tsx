import type { Meta, StoryObj } from "@storybook/react";
import { 
  CollapseTransition,
  FadeTransition,
  GrowTransition,
  SlideTransition,
  ZoomTransition,
} from "./Transitions";
import { Button, Paper } from "@mui/material";
import React from 'react';

const meta: Meta<typeof CollapseTransition> = {
  title: "Core/Utils/Transitions",
  component: CollapseTransition,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CollapseTransition>;

export const Collapse: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    return (
      <div>
        <Button onClick={handleChange}>Toggle Collapse</Button>
        <div style={{ height: '200px' }}>
          <CollapseTransition in={checked} timeout="auto" unmountOnExit>
            <Paper elevation={4} style={{ margin: '10px 0', padding: '20px' }}>
              Collapse Transition Content
            </Paper>
          </CollapseTransition>
        </div>
      </div>
    );
  },
};

export const Fade: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    return (
      <div>
        <Button onClick={handleChange}>Toggle Fade</Button>
        <FadeTransition in={checked} timeout={500}>
          <Paper elevation={4} style={{ margin: '10px 0', padding: '20px' }}>
            Fade Transition Content
          </Paper>
        </FadeTransition>
      </div>
    );
  },
};

export const Grow: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    return (
      <div>
        <Button onClick={handleChange}>Toggle Grow</Button>
        <GrowTransition in={checked} timeout={500}>
          <Paper elevation={4} style={{ margin: '10px 0', padding: '20px' }}>
            Grow Transition Content
          </Paper>
        </GrowTransition>
      </div>
    );
  },
};

export const Slide: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    return (
      <div>
        <Button onClick={handleChange}>Toggle Slide</Button>
        <div style={{ height: '200px' }}>
          <SlideTransition in={checked} timeout={500} direction="up" mountOnEnter unmountOnExit>
            <Paper elevation={4} style={{ margin: '10px 0', padding: '20px' }}>
              Slide Transition Content
            </Paper>
          </SlideTransition>
        </div>
      </div>
    );
  },
};

export const Zoom: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };

    return (
      <div>
        <Button onClick={handleChange}>Toggle Zoom</Button>
        <ZoomTransition in={checked} timeout={500}>
          <Paper elevation={4} style={{ margin: '10px 0', padding: '20px' }}>
            Zoom Transition Content
          </Paper>
        </ZoomTransition>
      </div>
    );
  },
}; 