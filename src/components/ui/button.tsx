import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isLoading?: boolean;
}

const variants = {
  primary:
    "bg-cyan-300 text-slate-950 shadow-[0_12px_30px_rgba(34,211,238,0.24)] hover:-translate-y-0.5 hover:bg-cyan-200",
  secondary:
    "border border-white/14 bg-white/8 text-white hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/12",
  ghost:
    "text-slate-200 hover:bg-white/10",
  danger:
    "bg-rose-400 text-slate-950 hover:bg-rose-300",
} as const;

export const Button = ({
  children,
  className,
  disabled,
  isLoading,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
};
