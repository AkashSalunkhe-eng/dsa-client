export type Role = "USER" | "ADMIN";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthPayload {
  user: User;
  token: string;
}

export interface Topic {
  id: string;
  title: string;
  description?: string | null;
  order?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  topicId: string;
  description?: string | null;
  leetcodeUrl?: string | null;
  articleUrl?: string | null;
  youtubeUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProgressItem {
  id?: string;
  userId?: string;
  problemId: string;
  completed: boolean;
  updatedAt?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateTopicInput {
  title: string;
  description?: string;
}

export interface CreateProblemInput {
  topicId: string;
  title: string;
  difficulty: Difficulty;
  leetcodeUrl?: string;
  articleUrl?: string;
  youtubeUrl?: string;
}

export interface UpdateProgressInput {
  problemId: string;
  completed: boolean;
}
