import { useState, useCallback, useEffect } from "react";
import {
  useMutation,
  useQueryClient,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { chatEndpoints } from "../../api/chat/client";
import type {
  ChatMessage,
  ChatThread,
} from "../../api/chat/types";
import type { Message } from "../../ui/templates/chat";
import { useToast } from "../../contexts/ToastContext";
import { useChatContext } from "../../contexts";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { threads, setThreads, activeThread, setActiveThread } = useChatContext();
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

  const { data: threadsData } = useQuery({
    queryKey: chatEndpoints.listThreads.queryKey(),
    queryFn: () => chatEndpoints.listThreads.createRequest(),
  });

  useEffect(() => {
    if (threadsData) {
      setThreads(threadsData);
    }
  }, [threadsData]);

  const getThreadQueryOptions: UseQueryOptions<ChatThread, Error, ChatThread, readonly unknown[]> = {
    queryKey: activeThread ? chatEndpoints.getThread.queryKey({ thread_id: activeThread.id }) : ['getThread', ''],
    queryFn: () => activeThread ? chatEndpoints.getThread.createRequest({ thread_id: activeThread.id }) : Promise.resolve(null),
    enabled: !!activeThread,
  };
  const getThreadQuery = useQuery(getThreadQueryOptions);

  useEffect(() => {
    if (getThreadQuery.data) {
      setMessages(getThreadQuery.data.messages.map(messageToUIMessage));
    }
  }, [getThreadQuery.data]);

  const createThreadMutation = useMutation({
    mutationFn: (model: string) => chatEndpoints.createThread.createRequest({ model }),
    onSuccess: (thread) => {
      queryClient.invalidateQueries({ queryKey: chatEndpoints.listThreads.queryKey() });
      setActiveThread(thread);
    },
  });

  const deleteThreadMutation = useMutation({
    mutationFn: (thread_id: string) => chatEndpoints.deleteThread.createRequest({ thread_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatEndpoints.listThreads.queryKey() });
      setActiveThread(null);
      setMessages([]);
    },
  });

  const chatMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!activeThread) return;

      const chatMessages: ChatMessage[] = messages.map((msg) => ({
        role: msg.isUser ? ("user" as const) : ("assistant" as const),
        content: msg.content,
      }));

      chatMessages.push({ role: "user" as const, content });

      return chatEndpoints.chat.createRequest({
        messages: chatMessages,
        thread_id: activeThread.id,
      });
    },
    onSuccess: (response) => {
      if (!response || !activeThread) return;

      const newMessage: Message = {
        id: uuidv4(),
        content: response.content,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, newMessage]);

      queryClient.invalidateQueries({
        queryKey: chatEndpoints.getThread.queryKey({ thread_id: activeThread.id }),
      });
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to send message. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    },
  });

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || !activeThread) return;

      const newMessage: Message = {
        id: uuidv4(),
        content,
        isUser: true,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, newMessage]);
      chatMutation.mutate(content);
    },
    [activeThread, chatMutation]
  );

  const createThread = useCallback(
    (model: string) => {
      createThreadMutation.mutate(model);
    },
    [createThreadMutation]
  );

  const deleteThread = useCallback(
    (thread_id: string) => {
      deleteThreadMutation.mutate(thread_id);
    },
    [deleteThreadMutation]
  );

  const messageToUIMessage = useCallback(
    (msg: ChatMessage): Message => ({
      id: uuidv4(),
      content: msg.content,
      isUser: msg.role === "user",
      timestamp: "",
    }),
    []
  );

  return {
    messages,
    sendMessage,
    isLoading: chatMutation.isPending,
    error: chatMutation.error,
    threads,
    activeThread,
    setActiveThread,
    createThread,
    deleteThread,
    getThreadQuery,
  };
};
