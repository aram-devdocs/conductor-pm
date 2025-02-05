export interface User {
  id: string;
  name: string;
  // Add other user fields as needed
}

export interface SprintTask {
  id: string;
  title: string;
  // Add other sprint task fields as needed
}

export type DataType = 'users' | 'sprint';

export interface DataResponse {
  results: User[] | SprintTask[];
} 