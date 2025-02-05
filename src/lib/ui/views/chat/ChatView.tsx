import React from "react";
import { Box } from "@mui/material";
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
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        flex: 1,
        overflow: "hidden",
        backgroundColor: "background.default",
      }}
    >
      <Box sx={{ flex: 1, overflow: "auto", minHeight: 0 }}>
        <MessageList messages={messages} isLoading={isLoading} />
      </Box>
      <MessageComposer
        onSendMessage={onSendMessage}
        disabled={isLoading}
        placeholder={placeholder}
      />
    </Box>
  );
};
