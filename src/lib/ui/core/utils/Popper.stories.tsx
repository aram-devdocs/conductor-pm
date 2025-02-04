import type { Meta, StoryObj } from "@storybook/react";
import { Popper } from "./Popper";
import { Button, Typography } from "@mui/material";
import React from 'react';

const meta: Meta<typeof Popper> = {
  title: "Core/Utils/Popper",
  component: Popper,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popper>;

export const Default: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
      <div>
        <Button aria-describedby={id} type="button" onClick={handleClick}>
          Toggle Popper
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Typography sx={{ p: 2, bgcolor: 'background.paper' }}>
            The content of the Popper.
          </Typography>
        </Popper>
      </div>
    );
  },
};

export const Placement: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'placement-popper' : undefined;

    return (
      <div>
        <Button aria-describedby={id} type="button" onClick={handleClick}>
          Toggle Popper
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="right-start">
          <Typography sx={{ p: 2, bgcolor: 'background.paper' }}>
            Popper with custom placement.
          </Typography>
        </Popper>
      </div>
    );
  },
}; 