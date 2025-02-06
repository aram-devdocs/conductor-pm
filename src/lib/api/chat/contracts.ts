import { ApiContract } from "../contracts";
import { HTTP_METHODS } from "../consts";
import type {
  ChatRequest,
  ChatResponse,
  EmbeddingRequest,
  EmbeddingResponse,
  ChatThreadCreate,
  ChatThreadResponse,
} from "./types";

export type ThreadIdParam = {
  thread_id: string;
};

export type ChatContract = ApiContract<
  typeof HTTP_METHODS.POST,
  "/ai/chat",
  ChatRequest,
  ChatResponse
>;

export type EmbeddingContract = ApiContract<
  typeof HTTP_METHODS.POST,
  "/ai/embedding",
  EmbeddingRequest,
  EmbeddingResponse
>;

export type CreateChatThreadContract = ApiContract<
  typeof HTTP_METHODS.POST,
  "/chat/threads",
  ChatThreadCreate,
  ChatThreadResponse  
>;

export type GetChatThreadContract = ApiContract<
  typeof HTTP_METHODS.GET,
  "/chat/threads/{thread_id}",
  ThreadIdParam,
  ChatThreadResponse
>;

export type ListChatThreadsContract = ApiContract<
  typeof HTTP_METHODS.GET,
  "/chat/threads",
  void,
  ChatThreadResponse[]
>;

export type DeleteChatThreadContract = ApiContract<
  typeof HTTP_METHODS.DELETE,
  "/chat/threads/{thread_id}",
  ThreadIdParam,
  void
>;

export const CHAT_CONTRACTS = {
  chat: {
    method: HTTP_METHODS.POST,
    path: "/ai/chat",
  } as ChatContract,

  embedding: {
    method: HTTP_METHODS.POST,
    path: "/ai/embedding",
  } as EmbeddingContract,

  createThread: {
    method: HTTP_METHODS.POST,
    path: "/chat/threads",
  } as CreateChatThreadContract,

  getThread: {
    method: HTTP_METHODS.GET,
    path: "/chat/threads/{thread_id}",
  } as GetChatThreadContract,

  listThreads: { 
    method: HTTP_METHODS.GET,
    path: "/chat/threads",
  } as ListChatThreadsContract,

  deleteThread: {
    method: HTTP_METHODS.DELETE, 
    path: "/chat/threads/{thread_id}",
  } as DeleteChatThreadContract,
} as const;
