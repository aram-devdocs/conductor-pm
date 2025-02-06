import axios from "axios";
import { API_BASE_URL } from "../consts";
import { createEndpoint } from "../contracts";
import { CHAT_CONTRACTS } from "./contracts";

import type { ThreadIdParam } from "./contracts";

const chatClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const chatEndpoints = {
  chat: createEndpoint(CHAT_CONTRACTS.chat, {
    createRequest: async (data) => {
      const response = await chatClient.post(CHAT_CONTRACTS.chat.path, data);
      return response.data;
    },
    queryKey: () => [CHAT_CONTRACTS.chat.path],
  }),

  embedding: createEndpoint(CHAT_CONTRACTS.embedding, {
    createRequest: async (data) => {
      const response = await chatClient.post(
        CHAT_CONTRACTS.embedding.path,
        data
      );
      return response.data;
    },
    queryKey: () => [CHAT_CONTRACTS.embedding.path],
  }),

  createThread: createEndpoint(CHAT_CONTRACTS.createThread, {
    createRequest: async (data) => {
      const response = await chatClient.post(
        CHAT_CONTRACTS.createThread.path,
        data
      );
      return response.data;
    },
    queryKey: () => [CHAT_CONTRACTS.createThread.path],
  }),

  getThread: createEndpoint(CHAT_CONTRACTS.getThread, {
    createRequest: async (params: ThreadIdParam) => {
      const response = await chatClient.get(
        CHAT_CONTRACTS.getThread.path.replace("{thread_id}", params.thread_id)
      );
      console.log(response.data);
      return response.data;
    },
    queryKey: (params: ThreadIdParam) => [
      CHAT_CONTRACTS.getThread.path,
      params.thread_id,
    ],
  }),

  listThreads: createEndpoint(CHAT_CONTRACTS.listThreads, {
    createRequest: async () => {
      const response = await chatClient.get(CHAT_CONTRACTS.listThreads.path);
      return response.data;
    },
    queryKey: () => [CHAT_CONTRACTS.listThreads.path],
  }),

  deleteThread: createEndpoint(CHAT_CONTRACTS.deleteThread, {
    createRequest: async (params: ThreadIdParam) => {
      await chatClient.delete(
        CHAT_CONTRACTS.deleteThread.path.replace(
          "{thread_id}",
          params.thread_id
        )
      );
    },
    queryKey: (params: ThreadIdParam) => [
      CHAT_CONTRACTS.deleteThread.path,
      params.thread_id,
    ],
  }),
};
