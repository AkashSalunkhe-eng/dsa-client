"use client";

import axios from "axios";

import {
  API_BASE_URL,
  AUTH_COOKIE_KEY,
  AUTH_STORAGE_KEY,
  ROUTES,
} from "@/lib/constants";
import type { AuthPayload } from "@/types";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return config;
  }

  try {
    const { token } = JSON.parse(raw) as AuthPayload;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;

      if (window.location.pathname !== ROUTES.login) {
        window.location.href = ROUTES.login;
      }
    }

    return Promise.reject(error);
  },
);
