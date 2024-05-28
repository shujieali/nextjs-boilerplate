import { useCallback } from "react";
import { apiService } from "../http";
import { FileEntity } from "@/types/file-entity";
// import { RequestConfigType } from "@/types/request-config";
import HTTP_CODES_ENUM from "@/types/http-codes";
import { AxiosRequestConfig } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
export type FileUploadRequest = File;

export type FileUploadResponse = {
  file: FileEntity;
  uploadSignedUrl: string;
};

export function useFileUploadService() {
  return useCallback(
    async (data: FileUploadRequest, requestConfig?: AxiosRequestConfig) => {
      if (process.env.NEXT_PUBLIC_FILE_DRIVER === "s3-presigned") {
        const result = await apiService.post(
          `${API_BASE_URL}/v1/files/upload`,
          {
            fileName: data.name,
            fileSize: data.size,
          },
          requestConfig
        );

        if (result.status === HTTP_CODES_ENUM.CREATED) {
          await apiService.put(result.data.uploadSignedUrl, data, {
            headers: {
              "Content-Type": data.type,
            },
          });
        }

        return result;
      } else {
        const formData = new FormData();
        formData.append("file", data);

        return apiService.post(`${API_BASE_URL}/v1/files/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    },
    []
  );
}
