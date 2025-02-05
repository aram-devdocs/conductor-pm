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
        backgroundColor: "background.default",
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <MessageList messages={messages} />
      </Box>
      <MessageComposer
        onSendMessage={onSendMessage}
        disabled={isLoading}
        placeholder={placeholder}
      />
    </Box>
  );
};
