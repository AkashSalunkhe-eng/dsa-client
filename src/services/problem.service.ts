import { axiosClient } from "@/lib/axios";
import { unwrapResponse } from "@/services/api";
import type { ApiResponse, CreateProblemInput, Problem } from "@/types";

interface ApiProblem extends Problem {
  leetcodeLink?: string | null;
  articleLink?: string | null;
  youtubeLink?: string | null;
}

const normalizeLinkValue = (value?: string | null) => {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const normalizeProblem = (problem: ApiProblem): Problem => ({
  ...problem,
  leetcodeUrl: normalizeLinkValue(problem.leetcodeUrl ?? problem.leetcodeLink),
  articleUrl: normalizeLinkValue(problem.articleUrl ?? problem.articleLink),
  youtubeUrl: normalizeLinkValue(problem.youtubeUrl ?? problem.youtubeLink),
});

export const problemService = {
  async getProblems(topicId?: string) {
    const response = await axiosClient.get<ApiResponse<ApiProblem[]>>(
      "/api/problems",
      {
        params: topicId ? { topicId } : undefined,
      },
    );

    return unwrapResponse(response.data).map(normalizeProblem);
  },

  async createProblem(payload: CreateProblemInput) {
    const response = await axiosClient.post<ApiResponse<ApiProblem>>(
      "/api/problems",
      {
        topicId: payload.topicId,
        title: payload.title,
        difficulty: payload.difficulty,
        leetcodeLink: normalizeLinkValue(payload.leetcodeUrl),
        articleLink: normalizeLinkValue(payload.articleUrl),
        youtubeLink: normalizeLinkValue(payload.youtubeUrl),
      },
    );
    return normalizeProblem(unwrapResponse(response.data));
  },
};
