import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { chatEndpoints } from '../../api/chat/client';
import type { ChatMessage } from '../../api/chat/types';
import type { Message } from '../../ui/templates/chat';
import { useToast } from '../../contexts/ToastContext';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const queryClient = useQueryClient();
  const { showErrorToast } = useToast();

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
    onError: (error) => {
      // Show error toast
      showErrorToast(error.message || 'Failed to send message. Please try again.');
      
      // Remove the last user message that failed to send
      setMessages(prev => prev.slice(0, -1));
    }
  });

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return; // Prevent sending empty messages

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