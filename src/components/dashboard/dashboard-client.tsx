"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AddTopicModal } from "@/components/dashboard/add-topic-modal";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProgressOverview } from "@/components/dashboard/progress-overview";
import { TopicGrid } from "@/components/dashboard/topic-grid";
import { useAuth } from "@/hooks/useAuth";
import { problemService } from "@/services/problem.service";
import { progressService } from "@/services/progress.service";
import { topicService } from "@/services/topic.service";
import type { Problem, ProgressItem, Topic } from "@/types";

export const DashboardClient = () => {
  const { hydrated, isAdmin, logout, user } = useAuth({ requireAuth: true });
  const [topics, setTopics] = useState<Topic[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topicModalOpen, setTopicModalOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const loadDashboard = async () => {
      setIsLoading(true);

      try {
        const [topicData, problemData, progressData] = await Promise.all([
          topicService.getTopics(),
          problemService.getProblems(),
          progressService.getProgress(),
        ]);

        setTopics(topicData);
        setProblems(problemData);
        setProgress(progressData);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load dashboard data.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboard();
  }, [hydrated]);

  const completedCount = useMemo(
    () => progress.filter((item) => item.completed).length,
    [progress],
  );

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <DashboardHeader
          user={user}
          isAdmin={isAdmin}
          onAddTopic={() => setTopicModalOpen(true)}
          onLogout={logout}
        />

        <ProgressOverview
          completedCount={completedCount}
          totalProblems={problems.length}
          totalTopics={topics.length}
        />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Topic Library</h2>
              <p className="text-sm text-slate-400">
                Open a topic to view problem references and update progress.
              </p>
            </div>
          </div>

          <TopicGrid
            isLoading={isLoading}
            topics={topics}
            problems={problems}
            progress={progress}
          />
        </section>
      </div>

      {isAdmin ? (
        <AddTopicModal
          open={topicModalOpen}
          onClose={() => setTopicModalOpen(false)}
          onCreated={(topic) => setTopics((current) => [topic, ...current])}
        />
      ) : null}
    </div>
  );
};
