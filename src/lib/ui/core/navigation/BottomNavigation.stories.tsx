import type { Meta, StoryObj } from "@storybook/react";
import { BottomNavigation } from "./BottomNavigation";
import { BottomNavigationAction } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';

const meta: Meta<typeof BottomNavigation> = {
  title: "Core/Navigation/BottomNavigation",
  component: BottomNavigation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  args: {
    actions: [
      { label: 'Recents', icon: <RestoreIcon /> },
      { label: 'Favorites', icon: <FavoriteIcon /> },
      { label: 'Nearby', icon: <LocationOnIcon /> },
    ],
  },
};

export const WithValue: Story = {
  args: {
    value: 1,
    actions: [
      { label: 'Recents', icon: <RestoreIcon /> },
      { label: 'Favorites', icon: <FavoriteIcon /> },
      { label: 'Nearby', icon: <LocationOnIcon /> },
    ],
  },
};

export const ShowLabels: Story = {
  args: {
    showLabels: true,
    actions: [
      { label: 'Recents', icon: <RestoreIcon /> },
      { label: 'Favorites', icon: <FavoriteIcon /> },
      { label: 'Nearby', icon: <LocationOnIcon /> },
    ],
  },
};

export const CustomActions: Story = {
  render: () => (
    <BottomNavigation>
      <BottomNavigationAction label="Custom 1" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Custom 2" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Custom 3" icon={<LocationOnIcon />} />
    </BottomNavigation>
  ),
}; 