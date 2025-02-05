import React from 'react';
import { Box, Typography } from '@mui/material';
import { ContextChip } from '../components/data/ContextChip';
import { useDataContext } from '../../contexts/DataContext';

export const ContextBar: React.FC = () => {
  const { entries, removeFromContext, copyToClipboard } = useDataContext();

  if (entries.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
        px: 2,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        overflowX: 'auto',
        minHeight: 48,
        ml: 'auto',
        maxWidth: '100%',
      }}
    >
      <Typography variant="subtitle2" sx={{ flexShrink: 0 }}>
        Data Context:
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 1, 
          flexWrap: 'nowrap',
          direction: 'rtl',
          '& > *': {
            direction: 'ltr',
          },
        }}
      >
        {entries.map((entry) => (
          <ContextChip
            key={entry.id}
            entry={entry}
            onCopy={copyToClipboard}
            onDelete={removeFromContext}
          />
        ))}
      </Box>
    </Box>
  );
}; 