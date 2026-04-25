"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Topic } from "@/types";

interface TopicHeroProps {
  topic?: Topic;
  isAdmin: boolean;
  onAddProblem: () => void;
}

export const TopicHero = ({ isAdmin, onAddProblem, topic }: TopicHeroProps) => {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/6 p-6 shadow-[0_18px_70px_rgba(2,8,23,0.35)] backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Link
            href="/dashboard"
            className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-200"
          >
            Back To Dashboard
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
            {topic?.title ?? "Topic Details"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            {topic?.description ||
              "Practice the problems in this lane and keep your solved state synced."}
          </p>
        </div>

        {isAdmin ? <Button onClick={onAddProblem}>Add Problem</Button> : null}
      </div>
    </div>
  );
};
