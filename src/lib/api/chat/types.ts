export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  thread_id: string;
}

export interface ChatResponse {
  role: 'assistant';
  content: string;
}

export interface EmbeddingRequest {
  text: string;
}

export interface EmbeddingResponse {
  embedding: number[];
}

export interface ChatThreadResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  model: string;
  messages: ChatMessage[] | null;
}

export interface ChatThreadCreate {
  model: string;
}

export type ChatThread = ChatThreadResponse; 