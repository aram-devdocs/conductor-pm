import axios from "axios";
import { API_BASE_URL } from "../consts";
import { createEndpoint } from "../contracts";
import { DATA_CONTRACTS } from "./contracts";
import type { DataResponse } from "./types";

const dataClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const dataEndpoints = {
  users: createEndpoint(DATA_CONTRACTS.users, {
    createRequest: async (): Promise<DataResponse> => {
      const response = await dataClient.get<DataResponse>(
        DATA_CONTRACTS.users.path
      );
      return response.data;
    },
    queryKey: () => ["users"],
  }),

  sprint: createEndpoint(DATA_CONTRACTS.sprint, {
    createRequest: async (): Promise<DataResponse> => {
      const response = await dataClient.get<DataResponse>(
        DATA_CONTRACTS.sprint.path
      );
      return response.data;
    },
    queryKey: () => ["sprint"],
  }),
}; 