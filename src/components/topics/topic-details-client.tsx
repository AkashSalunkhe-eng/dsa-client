"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AddProblemModal } from "@/components/dashboard/add-problem-modal";
import { ProblemList } from "@/components/problems/problem-list";
import { TopicHero } from "@/components/topics/topic-hero";
import { useAuth } from "@/hooks/useAuth";
import { problemService } from "@/services/problem.service";
import { progressService } from "@/services/progress.service";
import { topicService } from "@/services/topic.service";
import type { Problem, ProgressItem, Topic } from "@/types";

interface TopicDetailsClientProps {
  topicId: string;
}

export const TopicDetailsClient = ({ topicId }: TopicDetailsClientProps) => {
  const { hydrated, isAdmin } = useAuth({ requireAuth: true });
  const [topic, setTopic] = useState<Topic | undefined>();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingProblemId, setPendingProblemId] = useState<string | null>(null);
  const [problemModalOpen, setProblemModalOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const loadData = async () => {
      setIsLoading(true);

      try {
        const [topicData, problemData, progressData] = await Promise.all([
          topicService.getTopics(),
          problemService.getProblems(topicId),
          progressService.getProgress(),
        ]);

        setTopic(topicData.find((item) => item.id === topicId));
        setProblems(problemData);
        setProgress(progressData);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load topic details.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, [hydrated, topicId]);

  const completedMap = useMemo(
    () =>
      progress.reduce<Record<string, boolean>>((acc, item) => {
        acc[item.problemId] = item.completed;
        return acc;
      }, {}),
    [progress],
  );

  const handleToggle = async (problemId: string, completed: boolean) => {
    const previous = progress;
    setPendingProblemId(problemId);
    setProgress((current) => {
      const next = [...current];
      const index = next.findIndex((item) => item.problemId === problemId);

      if (index >= 0) {
        next[index] = { ...next[index], completed };
      } else {
        next.push({ problemId, completed });
      }

      return next;
    });

    try {
      await progressService.updateProgress({ problemId, completed });
      toast.success(completed ? "Problem marked complete." : "Progress updated.");
    } catch (error) {
      setProgress(previous);
      throw error;
    } finally {
      setPendingProblemId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <TopicHero
          topic={topic}
          isAdmin={isAdmin}
          onAddProblem={() => setProblemModalOpen(true)}
        />

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Problem Set</h2>
            <p className="text-sm text-slate-400">
              Resource links and completion tracking for this topic.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-300">
            {problems.filter((problem) => completedMap[problem.id]).length} /{" "}
            {problems.length} completed
          </div>
        </div>

        <ProblemList
          problems={problems}
          completedMap={completedMap}
          isLoading={isLoading}
          pendingProblemId={pendingProblemId}
          onToggle={handleToggle}
        />
      </div>

      {isAdmin ? (
        <AddProblemModal
          open={problemModalOpen}
          topicId={topicId}
          onClose={() => setProblemModalOpen(false)}
          onCreated={(problem) => setProblems((current) => [problem, ...current])}
        />
      ) : null}
    </div>
  );
};
