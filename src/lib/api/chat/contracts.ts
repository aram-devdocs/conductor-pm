import { ApiContract } from "../contracts";
import { HTTP_METHODS } from "../consts";
import type {
  ChatRequest,
  ChatResponse,
  EmbeddingRequest,
  EmbeddingResponse,
} from "./types";

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

export const CHAT_CONTRACTS = {
  chat: {
    method: HTTP_METHODS.POST,
    path: "/ai/chat",
  } as ChatContract,

  embedding: {
    method: HTTP_METHODS.POST,
    path: "/ai/embedding",
  } as EmbeddingContract,
} as const;
