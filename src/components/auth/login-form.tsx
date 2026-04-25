"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/constants";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import type { LoginInput } from "@/types";

export const LoginForm = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);

    try {
      const response = await authService.login(values);
      setAuth(response);
      toast.success("Welcome back. Dashboard is ready.");
      router.replace(ROUTES.dashboard);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Login failed. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Enter a valid email address",
          },
        })}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Sign In
      </Button>
    </form>
  );
};
