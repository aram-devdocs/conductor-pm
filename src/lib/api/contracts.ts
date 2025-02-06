/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpMethod } from "./consts";

export interface ApiContract<
  TMethod extends HttpMethod,
  TPath extends string,
  TRequest = void,
  TResponse = void,
  TQueryParams = void
> {
  method: TMethod;
  path: TPath;
  request: TRequest;
  response: TResponse;
  queryParams: TQueryParams;
}

export type ApiEndpoint<T extends ApiContract<any, any, any, any, any>> = {
  method: T["method"];
  path: T["path"];
  createRequest: (data: T["request"]) => Promise<T["response"]>;
  queryKey: (params: T["request"]) => readonly unknown[];
};

export const createEndpoint = <T extends ApiContract<any, any, any, any, any>>(
  config: T,
  implementation: {
    createRequest: (data: T["request"]) => Promise<T["response"]>;
    queryKey: (params: T["request"]) => readonly unknown[];
  }
): ApiEndpoint<T> => {
  return {
    method: config.method,
    path: config.path,
    createRequest: implementation.createRequest,
    queryKey: implementation.queryKey,
  };
};
