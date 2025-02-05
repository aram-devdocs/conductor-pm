import { ApiContract } from "../contracts";
import { HTTP_METHODS } from "../consts";
import type { DataResponse } from "./types";

export type UsersContract = ApiContract<
  typeof HTTP_METHODS.GET,
  "/users",
  void,
  DataResponse
>;

export type SprintContract = ApiContract<
  typeof HTTP_METHODS.GET,
  "/sprint/current",
  void,
  DataResponse
>;

export const DATA_CONTRACTS = {
  users: {
    method: HTTP_METHODS.GET,
    path: "/users",
  } as UsersContract,

  sprint: {
    method: HTTP_METHODS.GET,
    path: "/sprint/current",
  } as SprintContract,
} as const; 