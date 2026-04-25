"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { User } from "@/types";

interface DashboardHeaderProps {
  user: User | null;
  isAdmin: boolean;
  onAddTopic: () => void;
  onLogout: () => void;
}

export const DashboardHeader = ({
  isAdmin,
  onAddTopic,
  onLogout,
  user,
}: DashboardHeaderProps) => {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/6 p-6 shadow-[0_18px_70px_rgba(2,8,23,0.35)] backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            DSA Workspace
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
            {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Dashboard"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            Browse every topic, jump into problems quickly, and keep your sheet
            moving with a clean progress workflow.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {isAdmin ? (
            <Button variant="primary" onClick={onAddTopic}>
              Add Topic
            </Button>
          ) : null}
          <Button variant="ghost" onClick={onLogout}>
            Logout
          </Button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/12"
          >
            Refresh View
          </Link>
        </div>
      </div>
    </div>
  );
};
