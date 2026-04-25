import { axiosClient } from "@/lib/axios";
import { unwrapResponse } from "@/services/api";
import type { ApiResponse, ProgressItem, UpdateProgressInput } from "@/types";

export const progressService = {
  async getProgress() {
    const response =
      await axiosClient.get<ApiResponse<ProgressItem[]>>("/api/progress");
    return unwrapResponse(response.data);
  },

  async updateProgress(payload: UpdateProgressInput) {
    const response = await axiosClient.post<ApiResponse<ProgressItem>>(
      "/api/progress",
      payload,
    );

    return unwrapResponse(response.data);
  },
};
