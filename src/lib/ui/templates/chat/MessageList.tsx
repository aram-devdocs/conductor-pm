import React, { useEffect, useRef, memo } from "react";
import { Box } from "@mui/material";
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

// Memoized MessageBubble component to prevent unnecessary re-renders
const MemoizedMessageBubble = memo(MessageBubble);

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  autoScroll = true,
  isLoading = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(messages.length);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Only auto-scroll if new messages were added
    if (autoScroll && messages.length > prevMessagesLengthRef.current) {
      scrollToBottom();
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages, autoScroll]);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 2,
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {messages.map((message) => (
        <MemoizedMessageBubble
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
