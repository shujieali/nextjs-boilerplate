import { AxiosRequestConfig } from "axios";
import httpService, {
  setBaseURL,
  setApiTimeout,
  setDynamicParam,
  getDynamicParams,
  removeDynamicParam,
  setHeaders,
  setHeader,
  removeHeader,
  useHTTPRequestCount,
  getAuthTokens,
  removeAuthTokens,
  setAuthTokens,
} from "./http-service";
import {
  setResponseErrorHandler,
  setResponseSuccessHandler,
} from "./interceptors";
/**
 * Our Main instance of http handler
 * support get, post, delete, put
 */
export const apiService = {
  get: (url: string, config?: AxiosRequestConfig) =>
    httpService.get(url, config),
  post: (url: string, data: Object, config?: AxiosRequestConfig | undefined) =>
    httpService.post(url, data, config),
  put: (url: string, data: Object, config?: AxiosRequestConfig | undefined) =>
    httpService.put(url, data, config),
  patch: (url: string, data: Object, config?: AxiosRequestConfig | undefined) =>
    httpService.patch(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig | undefined) =>
    httpService.delete(url, config),
  // Some of the helpers
  setBaseURL,
  setApiTimeout,
  setDynamicParam,
  getDynamicParams,
  removeDynamicParam,
  setHeaders,
  setHeader,
  removeHeader,
  // Interceptors
  setResponseErrorHandler,
  setResponseSuccessHandler,
  httpRequestCount: useHTTPRequestCount,
  getClient: () => httpService,
  getAuthTokens,
  removeAuthTokens,
  setAuthTokens,
};

export {
  // Some of the helpers
  setBaseURL,
  setApiTimeout,
  setDynamicParam,
  getDynamicParams,
  removeDynamicParam,
  setHeaders,
  setHeader,
  removeHeader,
  // Interceptors
  setResponseErrorHandler,
  setResponseSuccessHandler,
};

export default apiService;
