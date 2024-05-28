"use client";

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

import {
  requestInterceptor,
  responseInterceptor,
  requestHeadersInterceptor,
} from "./interceptors";
import { runsOnServerSide } from "@/utils";

/**
 * Default options for axios
 */
const options: AxiosRequestConfig = {
  baseURL:
    process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "",
  timeout: parseInt(process.env.API_TIMEOUT || "10000"),
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Dynamic Parameters for request
 */
const DYNAMIC_PARAMS_KEY = "dynamicParams";
interface dynamicParamsInterface {
  [key: string]: string;
}
let dynamicParams: dynamicParamsInterface = {};

/**
 * Main instance of axios to handle http requests
 * This is singleton instance for http handler
 * It will be loaded only once in application lifecycle
 * All the headers and dynamic parameters will stay alive
 */
const httpService: AxiosInstance = axios.create(options);

/**
 * This function will update the default base url for our endpoints
 * This will only impact the api without host name
 * @param newBaseURL base URL to our endpoints
 */
export const setBaseURL = (newBaseURL: string) => {
  options.baseURL = newBaseURL;
  httpService.defaults.baseURL = newBaseURL;
};

/**
 * Set the API TIMEOUT dynamically, default is 10000 ms
 */
export const setApiTimeout = (apiTimeout: number) => {
  options.timeout = apiTimeout;
  httpService.defaults.timeout = apiTimeout;
};
/**
 * This will replace all the default headers with the ones provided
 * @param headers list of all the headers to be set as default headers
 */
export const setHeaders = (headers: string[]) => {
  Object.assign(httpService.defaults.headers, headers);
};

/**
 * This will set the given header and value in default headers
 * @param headerName
 * @param headerValue
 */
export const setHeader = (headerName: string, headerValue: string) => {
  httpService.defaults.headers[headerName] = headerValue;
};

/**
 * This will remove the given header from the http handler
 * @param headerName Name of the header to be removed
 */
export const removeHeader = (headerName: string) => {
  delete httpService.defaults.headers[headerName];
};

/**
 *
 * @returns return a json object of all the dynamic parameters set
 */
export const getDynamicParams = (): { [key: string]: string } => {
  return dynamicParams;
};

/**
 * This will set the dynamic parameter in http handler.
 * If you want to retain these parameter even on page refresh then set setLocalStorage to true
 * @param paramName Name of the parameter
 * @param value Value of the parameter
 * @param setLocalStorage a boolean to decide if this needs to be set in localStorage, default is false
 */
export const setDynamicParam = (
  paramName: string,
  value: string,
  setLocalStorage: boolean = false
) => {
  dynamicParams[paramName] = value;
  if (setLocalStorage && !runsOnServerSide)
    localStorage.setItem(DYNAMIC_PARAMS_KEY, JSON.stringify(dynamicParams));
};

/**
 * This will remove the parameter from dynamic parameters
 * @param paramName Parameter to be removed
 */
export const removeDynamicParam = (paramName: string) => {
  delete dynamicParams[paramName];

  // Handle if this parameter was stored in the localStorage
  const storedObject: dynamicParamsInterface = getDynamicParams();
  if (Object.keys(storedObject).includes(paramName) && !runsOnServerSide) {
    delete storedObject[paramName];
    localStorage.setItem(DYNAMIC_PARAMS_KEY, JSON.stringify(storedObject));
  }
};

/**
 * Private function to initialize the dynamic parameter
 */
const initializeDynamicParams = () => {
  const storedDynamicParams: string | null =
    localStorage.getItem(DYNAMIC_PARAMS_KEY);
  if (storedDynamicParams) {
    try {
      dynamicParams = JSON.parse(storedDynamicParams);
    } catch (error) {
      console.error("Error parsing stored dynamicParams:", error);
    }
  }
};

export const useHTTPRequestCount = () => {
  const [requests, setRequests] = useState(0);

  useEffect(() => {
    const requestInterceptor = httpService.interceptors.request.use(
      (config) => {
        setRequests((prevRequests) => prevRequests + 1);
        return config;
      },
      (error) => {
        setRequests((prevRequests) => prevRequests - 1);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = httpService.interceptors.response.use(
      (response) => {
        setRequests((prevRequests) => prevRequests - 1);
        return response;
      },
      (error) => {
        setRequests((prevRequests) => prevRequests - 1);
        return Promise.reject(error);
      }
    );

    return () => {
      httpService.interceptors.request.eject(requestInterceptor);
      httpService.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return requests;
};

/**
 * loading dynamic parameters on startup
 */
!runsOnServerSide && initializeDynamicParams();

/**
 * Attaching interceptors
 */
requestInterceptor(httpService, dynamicParams);
requestHeadersInterceptor(httpService);
responseInterceptor(httpService);

export {
  getAuthTokens,
  setAuthTokens,
  removeAuthTokens,
} from "./interceptors/requestInterceptor";
export default httpService;
