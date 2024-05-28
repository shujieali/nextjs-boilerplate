"use client";

import { User } from "@/types/user";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthActionsContext, AuthContext, TokensInfo } from "./auth-context";
import apiService from "@/services/http/api-service";
import HTTP_CODES_ENUM from "@/types/http-codes";
import GoogleAuthProvider from "./social-auth/google/google-auth-provider";
import FacebookAuthProvider from "./social-auth/facebook/facebook-auth-provider";

function AuthProvider(props: PropsWithChildren<{}>) {
  const API_BASE_URL =
    process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const AUTH_ME_URL = API_BASE_URL + "/v1/auth/me";
  const AUTH_LOGOUT_URL = API_BASE_URL + "/v1/auth/logout";

  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const logOut = useCallback(async () => {
    if (apiService.getAuthTokens()?.token) {
      await apiService.post(AUTH_LOGOUT_URL, {});
      apiService.removeAuthTokens();
      setUser(null);
    }
  }, [AUTH_LOGOUT_URL, setUser]);

  const loadData = useCallback(async () => {
    const tokens = apiService.getAuthTokens() as TokensInfo;
    try {
      if (tokens?.token) {
        const response = await apiService.get(AUTH_ME_URL);
        if (response.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
          logOut();
          return;
        }
        const data = await response.data;
        setUser(data);
      }
    } catch {
      logOut();
    } finally {
      setIsLoaded(true);
    }
  }, [logOut, AUTH_ME_URL]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
    }),
    [isLoaded, user]
  );

  const contextActionsValue = useMemo(
    () => ({
      setUser,
      logOut,
    }),
    [logOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthActionsContext.Provider value={contextActionsValue}>
        <GoogleAuthProvider>
          <FacebookAuthProvider>{props.children}</FacebookAuthProvider>
        </GoogleAuthProvider>
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
