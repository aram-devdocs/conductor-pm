import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";
import { Button } from "../inputs/Button";
import { MenuItem } from "@mui/material";
import React from 'react';

const meta: Meta<typeof Menu> = {
  title: "Components/Navigation/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button onClick={handleClick}>Open Menu</Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          items={[
            { label: 'Profile' },
            { label: 'My account' },
            { label: 'Logout' },
          ]}
        />
      </div>
    );
  },
};

export const CustomItems: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button onClick={handleClick}>Open Menu</Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Custom Item 1</MenuItem>
          <MenuItem onClick={handleClose}>Custom Item 2</MenuItem>
          <MenuItem onClick={handleClose}>Custom Item 3</MenuItem>
        </Menu>
      </div>
    );
  },
};

export const Positioned: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button onClick={handleClick}>Open Menu</Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          items={[
            { label: 'Profile' },
            { label: 'My account' },
            { label: 'Logout' },
          ]}
        />
      </div>
    );
  },
}; 