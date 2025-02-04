import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker, TimePicker, DateTimePicker } from "./DatePickers";
import React from 'react';
import dayjs from 'dayjs';

const meta: Meta<typeof DatePicker> = {
  title: "Core/MUI X/DatePickers",
  component: DatePicker,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Date: Story = {
  render: () => <DatePicker label="Date Picker" />,
};

export const Time: Story = {
  render: () => <TimePicker label="Time Picker" />,
};

export const DateTime: Story = {
  render: () => <DateTimePicker label="Date Time Picker" />,
};

export const DateWithInitialValue: Story = {
  render: () => <DatePicker label="Date Picker" defaultValue={dayjs()} />,
};

export const TimeWithInitialValue: Story = {
  render: () => <TimePicker label="Time Picker" defaultValue={dayjs()} />,
};

export const DateTimeWithInitialValue: Story = {
  render: () => <DateTimePicker label="Date Time Picker" defaultValue={dayjs()} />,
};

export const DateWithMinMax: Story = {
  render: () => (
    <DatePicker 
      label="Date Picker" 
      minDate={dayjs('2023-01-01')} 
      maxDate={dayjs('2023-12-31')} 
    />
  ),
};

export const TimeWithMinMax: Story = {
  render: () => (
    <TimePicker 
      label="Time Picker" 
      minTime={dayjs('2023-01-01T09:00')} 
      maxTime={dayjs('2023-01-01T17:00')} 
    />
  ),
};

export const DateTimeWithMinMax: Story = {
  render: () => (
    <DateTimePicker 
      label="Date Time Picker" 
      minDateTime={dayjs('2023-01-01T09:00')} 
      maxDateTime={dayjs('2023-12-31T17:00')} 
    />
  ),
}; 