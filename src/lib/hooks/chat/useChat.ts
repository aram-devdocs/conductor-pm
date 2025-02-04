import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { chatEndpoints } from '../../api/chat/client';
import type { ChatMessage } from '../../api/chat/types';
import type { Message } from '../../ui/templates/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const queryClient = useQueryClient();

  const chatMutation = useMutation({
    mutationFn: async (content: string) => {
      const chatMessages: ChatMessage[] = messages.map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.content,
      }));

      chatMessages.push({ role: 'user' as const, content });

      return chatEndpoints.chat.createRequest({
        messages: chatMessages,
      });
    },
    onSuccess: (response) => {
      const newMessage: Message = {
        id: uuidv4(),
        content: response.content,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, newMessage]);
      
      // Invalidate relevant queries if needed
      queryClient.invalidateQueries({ queryKey: chatEndpoints.chat.queryKey() });
    },
  });

  const sendMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMessage]);
    chatMutation.mutate(content);
  }, [chatMutation]);

  return {
    messages,
    sendMessage,
    isLoading: chatMutation.isPending,
    error: chatMutation.error,
  };
}; 