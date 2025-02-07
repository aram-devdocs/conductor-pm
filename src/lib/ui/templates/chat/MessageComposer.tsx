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
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ width: '100%', p: 1, backgroundColor: 'background.paper' }}>
        <MessageInput
          onSendMessage={onSendMessage}
          disabled={disabled}
          placeholder={placeholder}
        />
      </Box>
    </Paper>
  );
};
