import { useCallback } from "react";
import HTTP_CODES_ENUM from "@/types/http-codes";
import { apiService } from "@/services/http";
import { useAuthActions } from "@/services/auth";
import { User } from "@/types/user";
import { Tokens } from "@/types/tokens";

const API_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = Tokens & {
  user: User;
};

export function useCredentialsLogin() {
  const { setUser } = useAuthActions();
  return useCallback(
    async (data: AuthLoginRequest) => {
      const response = await apiService.post(
        `${API_URL}/v1/auth/email/login`,
        data
      );
      if (response.status === HTTP_CODES_ENUM.OK) {
        apiService.setAuthTokens({
          token: response?.data?.token,
          refreshToken: response?.data?.refreshToken,
          tokenExpires: response?.data?.tokenExpires,
        });
        setUser(response?.data.user);
      }
      return response;
    },
    [setUser]
  );
}

export type AuthGoogleLoginRequest = {
  idToken: string;
};

export type AuthGoogleLoginResponse = Tokens & {
  user: User;
};

export function useAuthGoogleLoginService() {
  const { setUser } = useAuthActions();
  return useCallback(
    async (data: AuthGoogleLoginRequest) => {
      const response = await apiService.post(
        `${API_URL}/v1/auth/google/login`,
        data
      );
      if (response.status === HTTP_CODES_ENUM.OK) {
        apiService.setAuthTokens({
          token: response?.data?.token,
          refreshToken: response?.data?.refreshToken,
          tokenExpires: response?.data?.tokenExpires,
        });
        setUser(response?.data.user);
      }
      return response;
    },
    [setUser]
  );
}

export type AuthFacebookLoginRequest = {
  accessToken: string;
};

export type AuthFacebookLoginResponse = Tokens & {
  user: User;
};

export function useAuthFacebookLoginService() {
  const { setUser } = useAuthActions();
  return useCallback(
    async (data: AuthFacebookLoginRequest) => {
      const response = await apiService.post(
        `${API_URL}/v1/auth/facebook/login`,
        data
      );
      if (response.status === HTTP_CODES_ENUM.OK) {
        apiService.setAuthTokens({
          token: response?.data?.token,
          refreshToken: response?.data?.refreshToken,
          tokenExpires: response?.data?.tokenExpires,
        });
        setUser(response?.data.user);
      }
      return response;
    },
    [setUser]
  );
}

export type AuthSignUpRequest = {
  email: string;
  password: string;
};

export type AuthSignUpResponse = void;

export function useAuthSignUpService() {
  return useCallback((data: AuthSignUpRequest) => {
    return apiService.post(`${API_URL}/v1/auth/email/register`, data);
  }, []);
}

export type AuthConfirmEmailRequest = {
  hash: string;
};

export type AuthConfirmEmailResponse = void;

export function useAuthConfirmEmailService() {
  return useCallback((data: AuthConfirmEmailRequest) => {
    return apiService.post(`${API_URL}/v1/auth/email/confirm`, data);
  }, []);
}

export type AuthForgotPasswordRequest = {
  email: string;
};

export type AuthForgotPasswordResponse = void;

export function useAuthForgotPasswordService() {
  return useCallback((data: AuthForgotPasswordRequest) => {
    return apiService.post(`${API_URL}/v1/auth/forgot/password`, data);
  }, []);
}

export type AuthResetPasswordRequest = {
  password: string;
  hash: string;
};

export type AuthResetPasswordResponse = void;

export function useAuthResetPasswordService() {
  return useCallback((data: AuthResetPasswordRequest) => {
    return apiService.post(`${API_URL}/v1/auth/reset/password`, data);
  }, []);
}

export type AuthPatchMeRequest =
  | Partial<Pick<User, "firstName" | "lastName">>
  | { password: string; oldPassword: string };

export type AuthPatchMeResponse = User;

export function useAuthPatchMeService() {
  return useCallback((data: AuthPatchMeRequest) => {
    return apiService.patch(`${API_URL}/v1/auth/me`, data);
  }, []);
}
