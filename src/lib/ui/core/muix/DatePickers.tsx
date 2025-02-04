import React from 'react';
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TimePicker as MuiTimePicker, TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker as MuiDateTimePicker, DateTimePickerProps as MuiDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

export type DatePickerProps = MuiDatePickerProps<Dayjs>;
export type TimePickerProps = MuiTimePickerProps<Dayjs>;
export type DateTimePickerProps = MuiDateTimePickerProps<Dayjs>;

export const DatePicker = (props: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker {...props} />
    </LocalizationProvider>
  );
};

export const TimePicker = (props: TimePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiTimePicker {...props} />
    </LocalizationProvider>
  );
};

export const DateTimePicker = (props: DateTimePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDateTimePicker {...props} />
    </LocalizationProvider>
  );
}; 