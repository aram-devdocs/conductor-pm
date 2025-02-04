import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid } from "./DataGrid";

const meta: Meta<typeof DataGrid> = {
  title: "Core/MUI X/DataGrid",
  component: DataGrid,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGrid', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

export const Default: Story = {
  args: {
    rows: rows,
    columns: columns,
  },
};

export const Density: Story = {
  args: {
    rows: rows,
    columns: columns,
    density: 'compact',
  },
};

export const Pagination: Story = {
  args: {
    rows: rows,
    columns: columns,
    pagination: true,
    paginationMode: 'client',
    initialState: {
      pagination: {
        paginationModel: { pageSize: 5 },
      },
    },
  },
};

export const Sorting: Story = {
  args: {
    rows: rows,
    columns: columns,
    sortModel: [
      {
        field: 'col1',
        sort: 'asc',
      },
    ],
  },
};

export const Selection: Story = {
  args: {
    rows: rows,
    columns: columns,
    checkboxSelection: true,
  },
}; 