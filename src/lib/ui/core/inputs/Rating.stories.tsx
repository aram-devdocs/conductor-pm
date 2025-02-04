import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./Rating";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react';

const meta: Meta<typeof Rating> = {
  title: "Core/Inputs/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    defaultValue: 2.5,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 3,
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 4,
    disabled: true,
  },
};

export const CustomIcons: Story = {
  args: {
    defaultValue: 2,
    icon: <FavoriteIcon fontSize="inherit" />,
    emptyIcon: <FavoriteBorderIcon fontSize="inherit" />,
  },
};

export const Precision: Story = {
  args: {
    defaultValue: 3.5,
    precision: 0.5,
  },
};

export const Size: Story = {
  args: {
    defaultValue: 2,
    size: "large",
  },
}; 