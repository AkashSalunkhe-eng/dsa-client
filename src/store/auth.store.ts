"use client";

import { create } from "zustand";

import {
  AUTH_COOKIE_KEY,
  AUTH_STORAGE_KEY,
  ROUTES,
} from "@/lib/constants";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  hydrated: boolean;
  setAuth: (payload: { user: User; token: string }) => void;
  clearAuth: () => void;
  hydrateAuth: () => void;
  logout: () => void;
}

const syncCookie = (token: string | null) => {
  if (typeof document === "undefined") {
    return;
  }

  if (!token) {
    document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
};

const syncStorage = (user: User | null, token: string | null) => {
  if (typeof window === "undefined") {
    return;
  }

  if (!user || !token) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ user, token }),
  );
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  hydrated: false,
  setAuth: ({ user, token }) => {
    syncStorage(user, token);
    syncCookie(token);
    set({ user, token, hydrated: true });
  },
  clearAuth: () => {
    syncStorage(null, null);
    syncCookie(null);
    set({ user: null, token: null, hydrated: true });
  },
  hydrateAuth: () => {
    if (typeof window === "undefined") {
      set({ hydrated: true });
      return;
    }

    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      syncCookie(null);
      set({ user: null, token: null, hydrated: true });
      return;
    }

    try {
      const parsed = JSON.parse(raw) as { user: User; token: string };
      syncCookie(parsed.token);
      set({ user: parsed.user, token: parsed.token, hydrated: true });
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      syncCookie(null);
      set({ user: null, token: null, hydrated: true });
    }
  },
  logout: () => {
    syncStorage(null, null);
    syncCookie(null);
    set({ user: null, token: null, hydrated: true });

    if (typeof window !== "undefined") {
      window.location.href = ROUTES.login;
    }
  },
}));
