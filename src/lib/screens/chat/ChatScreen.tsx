import React from "react";
import { ChatView, ScreenBackground } from "../../ui";
import { useChat } from "../../hooks";

export const ChatScreen: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChat();

  return (
    <ScreenBackground>
      <ChatView
        messages={messages}
        onSendMessage={sendMessage}
        isLoading={isLoading}
        placeholder="Type your message..."
      />
    </ScreenBackground>
  );
};
