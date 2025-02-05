import React from "react";
import { Box } from "@mui/material";
import { ChatView } from "../../ui";
import { useChat } from "../../hooks";

export const ChatScreen: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <ChatView
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
        placeholder="Type your message..."
      />
    </Box>
  );
};
