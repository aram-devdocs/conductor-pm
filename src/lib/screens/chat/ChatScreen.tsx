import React from "react";
import { ChatView, ScreenBackground } from "../../ui";
import { useChat } from "../../hooks";
import { Box } from "@mui/material";

export const ChatScreen: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <ScreenBackground>
      <Box sx={{ 
        height: "100%", 
        display: "flex", 
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}>
        <ChatView
          messages={messages}
          onSendMessage={sendMessage}
          isLoading={isLoading}
          placeholder="Type your message..."
        />
      </Box>
    </ScreenBackground>
  );
};
