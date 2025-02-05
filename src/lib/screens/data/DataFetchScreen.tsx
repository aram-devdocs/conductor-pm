import React from 'react';
import { Box } from '@mui/material';
import { DataView } from '../../ui/views/data/DataView';
import { ScreenBackground } from '../../ui/layout/ScreenBackground';
import { useData } from '../../hooks/data/useData';
import type { DataType } from '../../api/data/types';

export const DataFetchScreen: React.FC = () => {
  const [selectedType, setSelectedType] = React.useState<DataType>('users');
  const { data, isLoading } = useData(selectedType);

  return (
    <ScreenBackground>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <DataView
          data={data}
          isLoading={isLoading}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />
      </Box>
    </ScreenBackground>
  );
}; 