import clsx from "clsx";

import { DIFFICULTY_STYLES } from "@/lib/constants";
import type { Difficulty } from "@/types";

interface BadgeProps {
  difficulty: Difficulty;
}

export const DifficultyBadge = ({ difficulty }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold tracking-[0.18em]",
        DIFFICULTY_STYLES[difficulty],
      )}
    >
      {difficulty}
    </span>
  );
};
