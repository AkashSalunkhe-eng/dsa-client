import { axiosClient } from "@/lib/axios";
import { unwrapResponse } from "@/services/api";
import type { ApiResponse, CreateProblemInput, Problem } from "@/types";

export const problemService = {
  async getProblems(topicId?: string) {
    const response = await axiosClient.get<ApiResponse<Problem[]>>(
      "/api/problems",
      {
        params: topicId ? { topicId } : undefined,
      },
    );

    return unwrapResponse(response.data);
  },

  async createProblem(payload: CreateProblemInput) {
    const response = await axiosClient.post<ApiResponse<Problem>>(
      "/api/problems",
      payload,
    );
    return unwrapResponse(response.data);
  },
};
