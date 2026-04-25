"use client";

import Link from "next/link";
import { toast } from "sonner";

import { DifficultyBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Problem } from "@/types";

interface ProblemItemProps {
  problem: Problem;
  completed: boolean;
  disabled?: boolean;
  onToggle: (problemId: string, completed: boolean) => Promise<void>;
}

export const ProblemItem = ({
  completed,
  disabled,
  onToggle,
  problem,
}: ProblemItemProps) => {
  const links = [
    { label: "LeetCode", href: problem.leetcodeUrl },
    { label: "Article", href: problem.articleUrl },
    { label: "YouTube", href: problem.youtubeUrl },
  ].filter((link) => Boolean(link.href));

  return (
    <Card className="hover:border-cyan-300/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>
          <div className="flex flex-wrap gap-2">
            {links.length ? (
              links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href!}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:text-cyan-200"
                >
                  {link.label}
                </Link>
              ))
            ) : (
              <span className="text-sm text-slate-500">
                Links were not provided for this problem yet.
              </span>
            )}
          </div>
        </div>

        <label className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/50 px-4 py-2 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={completed}
            disabled={disabled}
            onChange={async (event) => {
              try {
                await onToggle(problem.id, event.target.checked);
              } catch (error) {
                toast.error(
                  error instanceof Error
                    ? error.message
                    : "Unable to update progress.",
                );
              }
            }}
            className="h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-300 focus:ring-cyan-300/60"
          />
          {completed ? "Completed" : "Mark Complete"}
        </label>
      </div>
    </Card>
  );
};
