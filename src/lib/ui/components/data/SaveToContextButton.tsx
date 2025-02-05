import React from 'react';
import { Button, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useDataContext } from '../../../contexts/DataContext';
import type { User, SprintTask } from '../../../api/data/types';

interface SaveToContextButtonProps {
  data: User[] | SprintTask[];
  type: 'users' | 'sprint';
  label?: string;
}

export const SaveToContextButton: React.FC<SaveToContextButtonProps> = ({
  data,
  type,
  label,
}) => {
  const { addToContext } = useDataContext();

  return (
    <Tooltip title="Save current view to context">
      <Button
        variant="outlined"
        size="small"
        startIcon={<SaveIcon />}
        onClick={() => addToContext(data, type, label)}
      >
        Save to Context
      </Button>
    </Tooltip>
  );
}; 