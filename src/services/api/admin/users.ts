import { useCallback } from "react";
import { apiService } from "@/services/http";
import { AxiosRequestConfig } from "axios";
// import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { User } from "@/types/user";
import { InfinityPaginationType } from "@/types/infinity-pagination";
import { Role } from "@/types/role";
import { SortEnum } from "@/types/sort-type";

const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export type UsersRequest = {
  page: number;
  limit: number;
  filters?: {
    roles?: Role[];
  };
  sort?: Array<{
    orderBy: keyof User;
    order: SortEnum;
  }>;
};

export type UsersResponse = InfinityPaginationType<User>;

export function useGetUsersService() {
  return useCallback(
    (data: UsersRequest, requestConfig?: AxiosRequestConfig) => {
      const requestUrl = new URL(`${API_BASE_URL}/v1/users`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      if (data.filters) {
        requestUrl.searchParams.append("filters", JSON.stringify(data.filters));
      }
      if (data.sort) {
        requestUrl.searchParams.append("sort", JSON.stringify(data.sort));
      }

      return apiService.get(requestUrl.toString(), requestConfig);
    },
    []
  );
}

export type UserRequest = {
  id: User["id"];
};

export type UserResponse = User;

export function useGetUserService() {
  return useCallback(
    (data: UserRequest, requestConfig?: AxiosRequestConfig) => {
      return apiService.get(
        `${API_BASE_URL}/v1/users/${data.id}`,
        requestConfig
      );
    },
    []
  );
}

export type UserPostRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "photo" | "role"
> & {
  password: string;
};

export type UserPostResponse = User;

export function usePostUserService() {
  return useCallback(
    (data: UserPostRequest, requestConfig?: AxiosRequestConfig) => {
      return apiService.post(`${API_BASE_URL}/v1/users`, data, requestConfig);
    },
    []
  );
}

export type UserPatchRequest = {
  id: User["id"];
  data: Partial<
    Pick<User, "email" | "firstName" | "lastName" | "photo" | "role"> & {
      password: string;
    }
  >;
};

export type UserPatchResponse = User;

export function usePatchUserService() {
  return useCallback(
    (data: UserPatchRequest, requestConfig?: AxiosRequestConfig) => {
      return apiService.patch(
        `${API_BASE_URL}/v1/users/${data.id}`,
        data.data,
        requestConfig
      );
    },
    []
  );
}

export type UsersDeleteRequest = {
  id: User["id"];
};

export type UsersDeleteResponse = undefined;

export function useDeleteUsersService() {
  return useCallback(
    (data: UsersDeleteRequest, requestConfig?: AxiosRequestConfig) => {
      return apiService.delete(
        `${API_BASE_URL}/v1/users/${data.id}`,
        requestConfig
      );
    },
    []
  );
}
