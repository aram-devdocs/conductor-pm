import React from 'react';
import { Chip, IconButton, Box, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import type { DataContextEntry } from '../../../api/data/context-types';

interface ContextChipProps {
  entry: DataContextEntry;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ContextChip: React.FC<ContextChipProps> = ({
  entry,
  onCopy,
  onDelete,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Chip
        label={entry.label}
        variant="outlined"
        color="primary"
        size="small"
      />
      <Tooltip title="Copy to clipboard">
        <IconButton
          size="small"
          onClick={() => onCopy(entry.id)}
          sx={{ p: 0.5 }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remove from context">
        <IconButton
          size="small"
          onClick={() => onDelete(entry.id)}
          sx={{ p: 0.5 }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}; 