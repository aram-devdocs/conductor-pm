import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "../inputs/Button";
import { Typography } from "../data-display/Typography";
import { 
  CardHeader,
  CardMedia, 
  CardContent,
  CardActions,
} from "@mui/material";
import React from 'react';

const meta: Meta<typeof Card> = {
  title: "Components/Surfaces/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    headerContent: "Card Header",
    content: "Card Content",
    actions: <Button size="small">Learn More</Button>,
  },
};

export const WithMedia: Story = {
  args: {
    headerContent: "Card With Media",
    mediaSrc: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
    content: "Lizards are a widespread group of squamate reptiles, with over 6,000 species.",
    actions: <Button size="small">Share</Button>,
  },
};

export const Complex: Story = {
  render: () => (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://mui.com/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ),
}; 