import { axiosClient } from "@/lib/axios";
import { unwrapResponse } from "@/services/api";
import type { ApiResponse, AuthPayload, LoginInput, RegisterInput } from "@/types";

export const authService = {
  async login(payload: LoginInput) {
    const response = await axiosClient.post<ApiResponse<AuthPayload>>(
      "/api/auth/login",
      payload,
    );

    return unwrapResponse(response.data);
  },

  async register(payload: RegisterInput) {
    const response = await axiosClient.post<ApiResponse<AuthPayload>>(
      "/api/auth/register",
      payload,
    );

    return unwrapResponse(response.data);
  },
};
