import React from 'react';
import { DataGrid as MuiDataGrid, DataGridProps as MuiDataGridProps } from '@mui/x-data-grid';

export type DataGridProps = MuiDataGridProps;

export const DataGrid = (props: DataGridProps) => {
  return <MuiDataGrid {...props} />;
}; 