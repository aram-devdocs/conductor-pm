import axios from 'axios';
import { API_BASE_URL } from '../consts';
import { createEndpoint } from '../contracts';
import { CHAT_CONTRACTS } from './contracts';
import type { ChatRequest, ChatResponse, EmbeddingRequest, EmbeddingResponse } from './types';

const chatClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatEndpoints = {
  chat: createEndpoint(CHAT_CONTRACTS.chat, {
    createRequest: async (request: ChatRequest): Promise<ChatResponse> => {
      const response = await chatClient.post<ChatResponse>(CHAT_CONTRACTS.chat.path, request);
      return response.data;
    },
    queryKey: () => ['chat'],
  }),

  embedding: createEndpoint(CHAT_CONTRACTS.embedding, {
    createRequest: async (request: EmbeddingRequest): Promise<EmbeddingResponse> => {
      const response = await chatClient.post<EmbeddingResponse>(CHAT_CONTRACTS.embedding.path, request);
      return response.data;
    },
    queryKey: () => ['embedding'],
  }),
}; 