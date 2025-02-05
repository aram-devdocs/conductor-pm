import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { MessageBubble } from "../../components/chat";
import { Dots } from "../../components/loading";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp?: string;
}

interface MessageListProps {
  messages: Message[];
  autoScroll?: boolean;
  isLoading?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  autoScroll = true,
  isLoading = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages, autoScroll]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 2,
        height: "100%",
        overflowY: "auto",
      }}
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          content={message.content}
          isUser={message.isUser}
          timestamp={message.timestamp}
        />
      ))}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Dots />
        </Box>
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
};
