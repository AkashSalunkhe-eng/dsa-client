import type { ApiResponse } from "@/types";

export const unwrapResponse = <T>(response: ApiResponse<T>) => {
  if (!response.success) {
    throw new Error(response.message || "Request failed");
  }

  return response.data;
};
