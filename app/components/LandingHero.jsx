"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const DashboardPreviewPlayer = dynamic(
  () => import("./DashboardPreviewPlayer"),
  {
    ssr: false,
    loading: () => (
      <div
        className="aspect-[960/580] w-full animate-pulse rounded-xl bg-white/[0.04]"
        aria-hidden
      />
    ),
  }
);

const highlights = [
  "Bank disbursements & owner payments in one timeline",
  "Pre-EMI tracking through construction phase",
  "Milestone-aware project progress",
];

export default function LandingHero() {
  return (
    <section className="page-container section-pad pb-12 lg:pb-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <Reveal>
            <span className="badge mb-6 inline-flex">Construction finance, simplified</span>
          </Reveal>

          <Reveal delay={75}>
            <h1 className="max-w-xl animate-fade-in-up delay-75 lg:mx-0">
              Every rupee of your home build,{" "}
              <span className="text-zinc-500">in one calm dashboard.</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--muted)] sm:text-xl lg:mx-0">
              FinFlow connects loan disbursements, builder milestones, and pre-EMI
              so property owners stay ahead of cash flow—not buried in spreadsheets.
            </p>
          </Reveal>

          <Reveal delay={225}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/signin" className="btn-primary px-8 py-3 text-base">
                Get started
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/signin" className="btn-secondary px-8 py-3 text-base">
                Contractor sign in
              </Link>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-10 flex flex-col gap-3 sm:items-center lg:items-start">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-zinc-400"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-[var(--accent)]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120} className="w-full lg:max-w-none">
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-zinc-500 lg:text-left">
              Product preview
            </p>
            <DashboardPreviewPlayer />
            <p className="mt-3 text-center text-xs text-zinc-600 lg:text-left">
              Toggle owner vs contractor · auto-rotates every 8s · illustrative sample data
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
