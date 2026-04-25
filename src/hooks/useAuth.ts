"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ROUTES } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";

interface UseAuthOptions {
  requireAuth?: boolean;
  guestOnly?: boolean;
}

export const useAuth = (options: UseAuthOptions = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, hydrated, hydrateAuth, logout, setAuth } = useAuthStore();

  useEffect(() => {
    if (!hydrated) {
      hydrateAuth();
    }
  }, [hydrateAuth, hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (options.requireAuth && !token && pathname !== ROUTES.login) {
      router.replace(ROUTES.login);
    }

    if (options.guestOnly && token) {
      router.replace(ROUTES.dashboard);
    }
  }, [hydrated, options.guestOnly, options.requireAuth, pathname, router, token]);

  return {
    user,
    token,
    hydrated,
    isAuthenticated: Boolean(token),
    isAdmin: user?.role === "ADMIN",
    logout,
    setAuth,
  };
};
