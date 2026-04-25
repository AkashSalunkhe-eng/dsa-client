import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-[0_18px_70px_rgba(2,8,23,0.28)] backdrop-blur-xl transition duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
