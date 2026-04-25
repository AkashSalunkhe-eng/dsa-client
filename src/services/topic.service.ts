import { axiosClient } from "@/lib/axios";
import { unwrapResponse } from "@/services/api";
import type { ApiResponse, CreateTopicInput, Topic } from "@/types";

export const topicService = {
  async getTopics() {
    const response =
      await axiosClient.get<ApiResponse<Topic[]>>("/api/topics");
    return unwrapResponse(response.data);
  },

  async createTopic(payload: CreateTopicInput) {
    const response = await axiosClient.post<ApiResponse<Topic>>(
      "/api/topics",
      payload,
    );
    return unwrapResponse(response.data);
  },
};
