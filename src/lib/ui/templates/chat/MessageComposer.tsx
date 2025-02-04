import React from 'react';
import { Box, Paper } from '@mui/material';
import { MessageInput } from '../../components/chat';

interface MessageComposerProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSendMessage,
  disabled,
  placeholder,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: 1,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ maxWidth: '100%' }}>
        <MessageInput
          onSendMessage={onSendMessage}
          disabled={disabled}
          placeholder={placeholder}
        />
      </Box>
    </Paper>
  );
};
