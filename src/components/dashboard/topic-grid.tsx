import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProgressItem, Problem, Topic } from "@/types";

import { TopicCard } from "./topic-card";

interface TopicGridProps {
  isLoading: boolean;
  topics: Topic[];
  problems: Problem[];
  progress: ProgressItem[];
}

export const TopicGrid = ({
  isLoading,
  problems,
  progress,
  topics,
}: TopicGridProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-56 rounded-[28px]" />
        ))}
      </div>
    );
  }

  if (!topics.length) {
    return (
      <EmptyState
        title="No topics yet"
        description="Create your first topic to start structuring the DSA sheet."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          problems={problems}
          progress={progress}
        />
      ))}
    </div>
  );
};
