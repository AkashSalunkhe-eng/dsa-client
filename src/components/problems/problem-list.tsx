import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import type { Problem } from "@/types";

import { ProblemItem } from "./problem-item";

interface ProblemListProps {
  problems: Problem[];
  completedMap: Record<string, boolean>;
  isLoading: boolean;
  pendingProblemId: string | null;
  onToggle: (problemId: string, completed: boolean) => Promise<void>;
}

export const ProblemList = ({
  completedMap,
  isLoading,
  onToggle,
  pendingProblemId,
  problems,
}: ProblemListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-36 rounded-[28px]" />
        ))}
      </div>
    );
  }

  if (!problems.length) {
    return (
      <EmptyState
        title="No problems yet"
        description="This topic is empty for now. Add a problem to start filling the sheet."
      />
    );
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <ProblemItem
          key={problem.id}
          problem={problem}
          completed={Boolean(completedMap[problem.id])}
          disabled={pendingProblemId === problem.id}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};
