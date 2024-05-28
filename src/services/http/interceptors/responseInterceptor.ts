import { AxiosInstance, AxiosResponse, AxiosError } from "axios";

/**
 * Default functions to be triggered on response
 * @param response
 * @returns
 */
let successHandler = (response: AxiosResponse) => response;
let errorHandler = (error: AxiosError) => {
  const status = error.response ? error.response.status : null;

  if (status !== null && status < 500) {
    return error.response;
  } else {
    // Handle other errors
  }
  return Promise.reject(error);
};

/**
 * Response Interceptor
 * @param axiosInstance
 */
export const responseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => successHandler(response),
    (error: AxiosError) => errorHandler(error)
  );
};

export const setResponseSuccessHandler = (
  customSuccessHandler: (response: AxiosResponse) => AxiosResponse
) => {
  successHandler = customSuccessHandler;
  return;
};

export const setResponseErrorHandler = (
  customErrorHandler: (response: AxiosError) => Promise<never>
) => {
  errorHandler = customErrorHandler;
  return;
};

export default responseInterceptor;
