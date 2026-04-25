export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export const AUTH_STORAGE_KEY = "dsa-sheet-auth";
export const AUTH_COOKIE_KEY = "dsa_sheet_token";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  topics: "/topics",
} as const;

export const PROTECTED_MATCHERS = ["/dashboard", "/topics"];

export const DIFFICULTY_STYLES = {
  EASY: "border-emerald-500/30 bg-emerald-500/12 text-emerald-200",
  MEDIUM: "border-amber-500/30 bg-amber-500/12 text-amber-200",
  HARD: "border-rose-500/30 bg-rose-500/12 text-rose-200",
} as const;
