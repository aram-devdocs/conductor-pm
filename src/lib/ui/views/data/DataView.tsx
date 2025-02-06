import React from "react";
import { Box } from "@mui/material";
import { Select } from "../../core/inputs/Select";
import { DataTable } from "../../components/data/DataTable";
import type { DataType } from "../../../api/data/types";

interface DataViewProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  data: any[];
  isLoading: boolean;
  selectedType: DataType;
  onTypeChange: (type: DataType) => void;
}

const dataTypeOptions = [
  { label: "Users", value: "users" },
  { label: "Current Sprint", value: "sprint" },
];

export const DataView: React.FC<DataViewProps> = ({
  data,
  isLoading,
  selectedType,
  onTypeChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        height: "100%",
        width: "100%",
        p: 3,
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: 300, flexShrink: 0 }}>
        <Select
          label="Data Type"
          value={selectedType}
          options={dataTypeOptions}
          onChange={(e) => onTypeChange(e.target.value as DataType)}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          width: "95%",
          height: "95%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          pb: 2,
          pt: 2,
        }}
      >
        <DataTable 
          data={data} 
          isLoading={isLoading} 
          type={selectedType}
        />
      </Box>
    </Box>
  );
};
