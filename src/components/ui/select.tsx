import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import clsx from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, error, label, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        <select
          ref={ref}
          className={clsx(
            "h-12 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20",
            error &&
              "border-rose-400/60 focus:border-rose-400/60 focus:ring-rose-400/20",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {error ? <span className="text-xs text-rose-300">{error}</span> : null}
      </label>
    );
  },
);

Select.displayName = "Select";
