import Link from "next/link";
import type { ReactNode } from "react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  footerText: string;
  footerLinkLabel: string;
  footerHref: string;
  children: ReactNode;
}

export const AuthShell = ({
  children,
  description,
  eyebrow,
  footerHref,
  footerLinkLabel,
  footerText,
  title,
}: AuthShellProps) => {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.16),_transparent_28%)]" />
      <div className="absolute left-10 top-14 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-orange-300/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div className="hidden rounded-[36px] border border-white/10 bg-white/6 p-8 shadow-[0_30px_120px_rgba(8,15,29,0.55)] backdrop-blur-xl lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-6">
            <div className="inline-flex w-fit items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
              {eyebrow}
            </div>
            <div className="max-w-xl space-y-4">
              <h1 className="text-5xl font-semibold tracking-tight text-white">
                Practice with structure, not scattered bookmarks.
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                A polished DSA workspace for topics, curated problem links, and
                progress tracking that stays fast as your sheet grows.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Topics", "Organize the full sheet into focused learning tracks."],
              ["Progress", "Track completion cleanly with optimistic updates."],
              ["Admin", "Create new topics and problems without leaving the flow."],
            ].map(([heading, body]) => (
              <div
                key={heading}
                className="rounded-[28px] border border-white/10 bg-slate-950/45 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30"
              >
                <h3 className="text-base font-semibold text-white">{heading}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-900/88 p-6 shadow-[0_24px_90px_rgba(8,15,29,0.65)] backdrop-blur-xl sm:p-8">
            <div className="mb-8">
              <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                {eyebrow}
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
            </div>

            {children}

            <p className="mt-6 text-center text-sm text-slate-400">
              {footerText}{" "}
              <Link
                href={footerHref}
                className="font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
