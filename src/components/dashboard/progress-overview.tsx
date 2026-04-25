import { Card } from "@/components/ui/card";

interface ProgressOverviewProps {
  completedCount: number;
  totalProblems: number;
  totalTopics: number;
}

export const ProgressOverview = ({
  completedCount,
  totalProblems,
  totalTopics,
}: ProgressOverviewProps) => {
  const completionRate =
    totalProblems === 0 ? 0 : Math.round((completedCount / totalProblems) * 100);

  const metrics = [
    {
      label: "Topics",
      value: totalTopics,
      hint: "Organized learning tracks",
    },
    {
      label: "Solved",
      value: completedCount,
      hint: "Problems marked complete",
    },
    {
      label: "Completion",
      value: `${completionRate}%`,
      hint: "Across the full sheet",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className="group hover:-translate-y-1 hover:border-cyan-300/25"
        >
          <p className="text-sm text-slate-400">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
          <p className="mt-2 text-sm text-slate-500">{metric.hint}</p>
        </Card>
      ))}
    </div>
  );
};
