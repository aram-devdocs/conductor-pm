import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button, Typography } from "@mui/material";
import React from 'react';

const meta: Meta<typeof Popover> = {
  title: "Components/Utils/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Open Popover
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>
      </div>
    );
  },
};

export const Placement: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'placement-popover' : undefined;

    return (
      <div>
        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
          Open Popover
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Typography sx={{ p: 2 }}>Popover with custom placement.</Typography>
        </Popover>
      </div>
    );
  },
}; 