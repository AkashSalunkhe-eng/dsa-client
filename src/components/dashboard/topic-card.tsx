import Link from "next/link";

import { Card } from "@/components/ui/card";
import type { ProgressItem, Problem, Topic } from "@/types";

interface TopicCardProps {
  topic: Topic;
  problems: Problem[];
  progress: ProgressItem[];
}

export const TopicCard = ({ problems, progress, topic }: TopicCardProps) => {
  const topicProblems = problems.filter((problem) => problem.topicId === topic.id);
  const completedCount = topicProblems.filter((problem) =>
    progress.some(
      (item) => item.problemId === problem.id && item.completed,
    ),
  ).length;

  const total = topicProblems.length;
  const percentage = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <Link href={`/topics/${topic.id}`} className="block">
      <Card className="group h-full hover:-translate-y-1 hover:border-cyan-300/30">
        <div className="flex h-full flex-col justify-between gap-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {topic.description || "A focused topic lane for your sheet."}
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
                {total} items
              </span>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
              <span>{completedCount} solved</span>
              <span>{percentage}% complete</span>
            </div>
            <div className="h-2 rounded-full bg-white/8">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-teal-200 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
