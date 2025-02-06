import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import {
  MessageList,
  MessageComposer,
  type Message,
} from "../../templates/chat";

interface ChatViewProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  model?: string;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder,
  model,
}) => {
  return (
    <Box
      className="chat-view"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" component="div">
          Chat
        </Typography>
        {model && (
          <Chip
            label={model}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Box>

      {/* Messages */}
      <Box 
        sx={{ 
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <MessageList messages={messages} isLoading={isLoading} />
      </Box>

      {/* Composer */}
      <Box sx={{ position: "relative", zIndex: 2, bgcolor: "background.paper", borderTop: "1px solid", borderColor: "divider" }}>
        <MessageComposer
          onSendMessage={onSendMessage}
          disabled={isLoading}
          placeholder={placeholder}
        />
      </Box>
    </Box>
  );
};
