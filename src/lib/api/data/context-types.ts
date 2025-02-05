import type { User, SprintTask } from './types';

export interface DataContextEntry {
  id: string;
  type: 'users' | 'sprint';
  label: string;
  timestamp: number;
  data: User[] | SprintTask[];
}

export interface DataContextState {
  entries: DataContextEntry[];
}

export interface DataContextValue extends DataContextState {
  addToContext: (data: User[] | SprintTask[], type: 'users' | 'sprint', label?: string) => void;
  removeFromContext: (id: string) => void;
  copyToClipboard: (id: string) => Promise<void>;
} 