import { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";
import { Tokens } from "@/types/tokens";

const AUTH_REFRESH_URL =
  (process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "") +
  "/v1/auth/refresh";

// for dynamic parameters
export const requestInterceptor = (
  axiosInstance: AxiosInstance,
  dynamicParams: Object
) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Inject dynamic parameters into the URL
      const { url, params, ...otherConfig } = config;
      const mergedParams = { ...dynamicParams, ...params };
      let finalUrl = url;
      // Attach dynamic parameters only if the URL contains placeholders
      if (url?.includes("{")) {
        finalUrl = Object.keys(mergedParams).reduce((prevUrl, paramName) => {
          return prevUrl.replace(`{${paramName}}`, mergedParams[paramName]);
        }, url);
      }

      return {
        ...otherConfig,
        url: finalUrl,
        params,
      };
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
};

/**
 * Tokens for authentication
 */

// for request body and headers
const AUTH_TOKEN_KEY = "auth-token-data";
export const getAuthTokens = () => {
  const tokens = JSON.parse(
    Cookies.get(AUTH_TOKEN_KEY) ?? "null"
  ) as Tokens | null;
  return tokens;
};

export const setAuthTokens = (tokens: Tokens) => {
  Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(tokens));
};

export const removeAuthTokens = () => {
  Cookies.remove(AUTH_TOKEN_KEY);
};

export const requestHeadersInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const tokens = getAuthTokens();
      config.headers["x-custom-lang"] = window.location.pathname.split("/")[1];

      if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
      }

      if (tokens?.token) {
        config.headers["Authorization"] = `Bearer ${tokens.token}`;
      }

      if (tokens?.tokenExpires && tokens.tokenExpires <= Date.now()) {
        const newTokens = await fetch(AUTH_REFRESH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.refreshToken}`,
          },
        }).then((res) => res.json());

        if (newTokens.token) {
          setAuthTokens({
            token: newTokens.token,
            refreshToken: newTokens.refreshToken,
            tokenExpires: newTokens.tokenExpires,
          });
          config.headers["Authorization"] = `Bearer ${newTokens.token}`;
        } else {
          removeAuthTokens();
          throw new Error("Refresh token expired");
        }
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
};

export default requestInterceptor;
