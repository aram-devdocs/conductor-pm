import React from "react";
import { DataGrid } from "../../core/muix/DataGrid";
import type { User, SprintTask } from "../../../api/data/types";
import { Box, CircularProgress } from "@mui/material";

interface DataTableProps {
  data: (User | SprintTask)[];
  isLoading: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ data, isLoading }) => {
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
      />
    </Box>
  );
};
