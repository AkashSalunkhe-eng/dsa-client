"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";

import { useAuthStore } from "@/store/auth.store";

export const AppProviders = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  return (
    <>
      {children}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          className: "!border !border-white/10 !bg-slate-900 !text-white",
        }}
      />
    </>
  );
};
