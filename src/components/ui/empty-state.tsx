import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState = ({
  action,
  description,
  title,
}: EmptyStateProps) => {
  return (
    <Card className="border-dashed text-center">
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-6">
        <div className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
          DSA Sheet
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm leading-6 text-slate-400">{description}</p>
        {action}
      </div>
    </Card>
  );
};
