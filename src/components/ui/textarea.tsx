import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, id, label, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        <textarea
          ref={ref}
          id={id}
          className={clsx(
            "min-h-28 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20",
            error &&
              "border-rose-400/60 focus:border-rose-400/60 focus:ring-rose-400/20",
            className,
          )}
          {...props}
        />
        {error ? <span className="text-xs text-rose-300">{error}</span> : null}
      </label>
    );
  },
);

Textarea.displayName = "Textarea";
