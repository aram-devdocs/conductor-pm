import React from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
}

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  padding: theme.spacing(2),
  maxWidth: '70%',
  marginLeft: isUser ? 'auto' : theme.spacing(1),
  marginRight: isUser ? theme.spacing(1) : 'auto',
  marginBottom: theme.spacing(1),
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.background.paper,
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  borderRadius: theme.spacing(2),
}));

export const MessageBubble: React.FC<MessageBubbleProps> = ({ content, isUser, timestamp }) => {
  return (
    <StyledPaper isUser={isUser} elevation={1}>
      <Typography variant="body1">{content}</Typography>
      {timestamp && (
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}>
          {timestamp}
        </Typography>
      )}
    </StyledPaper>
  );
};
