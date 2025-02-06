import React from "react";
import { ChatThread } from "../api/chat/types";

interface ChatContextValue {
  threads: ChatThread[];
  activeThread: ChatThread | null;
  setThreads: (threads: ChatThread[]) => void;
  setActiveThread: (thread: ChatThread | null) => void;
}

const ChatContext = React.createContext<ChatContextValue>({
  threads: [],
  activeThread: null,
  setThreads: () => {
    console.log("setThreads");
  },
  setActiveThread: () => {
    console.log("setActiveThread");
  },
});

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [threads, setThreads] = React.useState<ChatThread[]>([]);
  const [activeThread, setActiveThread] = React.useState<ChatThread | null>(
    null
  );

  const value = React.useMemo(
    () => ({
      threads,
      activeThread,
      setThreads,
      setActiveThread,
    }),
    [threads, activeThread]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};
