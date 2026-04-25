import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-2xl bg-gradient-to-r from-white/6 via-white/12 to-white/6",
        className,
      )}
    />
  );
};
