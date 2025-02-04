import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";
import { Paper } from "../surfaces/Paper";
import React from 'react';

const meta: Meta<typeof Grid> = {
  title: "Components/Layout/Grid",
  component: Grid,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Paper>xs=8</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>xs=4</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>xs=4</Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper>xs=8</Paper>
      </Grid>
    </Grid>
  ),
};

export const AutoLayout: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs>
        <Paper>xs</Paper>
      </Grid>
      <Grid item xs>
        <Paper>xs</Paper>
      </Grid>
      <Grid item xs>
        <Paper>xs</Paper>
      </Grid>
    </Grid>
  ),
};

export const VariableWidthContent: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs="auto">
        <Paper>Variable width content</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>xs=6</Paper>
      </Grid>
      <Grid item xs>
        <Paper>xs</Paper>
      </Grid>
    </Grid>
  ),
};

export const RowAndColumnSpacing: Story = {
  render: () => (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <Paper>xs=6</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>xs=6</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>xs=6</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>xs=6</Paper>
      </Grid>
    </Grid>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>xs=12 sm=6 md=3</Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>xs=12 sm=6 md=3</Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>xs=12 sm=6 md=3</Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>xs=12 sm=6 md=3</Paper>
      </Grid>
    </Grid>
  ),
}; 