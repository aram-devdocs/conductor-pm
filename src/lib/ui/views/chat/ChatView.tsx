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
      className="chat-view"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        position: "relative",
     
      }}
    >
      <Box 
        sx={{ 
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <MessageList messages={messages} isLoading={isLoading} />
      </Box>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <MessageComposer
          onSendMessage={onSendMessage}
          disabled={isLoading}
          placeholder={placeholder}
        />
      </Box>
    </Box>
  );
};
