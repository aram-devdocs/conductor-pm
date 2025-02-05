import React from "react";
import { DataGrid } from "../../core/muix/DataGrid";
import { gridFilteredSortedRowIdsSelector, GridRowModel } from "@mui/x-data-grid";
import type { User, SprintTask } from "../../../api/data/types";
import { Box, CircularProgress } from "@mui/material";
import { SaveToContextButton } from "./SaveToContextButton";

interface DataTableProps {
  data: User[] | SprintTask[];
  isLoading: boolean;
  type: 'users' | 'sprint';
}

export const DataTable: React.FC<DataTableProps> = ({ data, isLoading, type }) => {
  const [filteredData, setFilteredData] = React.useState<User[] | SprintTask[]>(data);

  const columns = React.useMemo(() => {
    if (data.length === 0) return [];

    // Dynamically create columns based on the first data item
    return Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      flex: 1,
      minWidth: 150,
    }));
  }, [data]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "90%",
        maxHeight: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveToContextButton
          data={filteredData}
          type={type}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          "& .MuiDataGrid-root": {
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            bgcolor: "background.paper",
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          sx={{
            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              lineHeight: "normal",
              p: 2,
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid",
              borderColor: "divider",
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          onStateChange={(state) => {
            // Get filtered row IDs
            const filteredIds = gridFilteredSortedRowIdsSelector(state);
            // Map IDs back to the original data
            const filtered = data.filter((row) => 
              filteredIds.includes((row as GridRowModel).id)
            );
            setFilteredData(filtered as typeof data);
            console.log('Filtered data length:', filtered.length);
          }}
        />
      </Box>
    </Box>
  );
};
