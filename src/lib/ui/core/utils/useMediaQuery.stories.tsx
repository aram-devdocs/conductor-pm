import type { Meta, StoryObj } from "@storybook/react";
import { useMediaQuery } from "./useMediaQuery";
import { Typography } from "@mui/material";
import React from 'react';

const meta: Meta<typeof useMediaQuery> = {
  title: "Core/Utils/useMediaQuery",
  component: () => <></>,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<() => boolean>;

export const Default: Story = {
  render: () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
      <div>
        <Typography>
          Screen size: {isSmallScreen ? 'Small' : 'Large'}
        </Typography>
      </div>
    );
  },
}; 