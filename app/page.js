import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Shield,
  LineChart,
  Users,
} from "lucide-react";
import Reveal from "./components/Reveal";
import Footer from "./components/Footer";
import LandingHero from "./components/LandingHero";

const features = [
  {
    icon: Activity,
    title: "Live loan math",
    description:
      "Track outstanding principal and pre-EMI as the bank releases tranches—always current, never spreadsheet drift.",
  },
  {
    icon: LineChart,
    title: "Scenario planning",
    description:
      "Model prepayments and rate shifts. See interest saved before you commit extra capital.",
  },
  {
    icon: Shield,
    title: "Audit-ready ledger",
    description:
      "Structured transaction history for tax season and annual reviews—clear types, dates, and notes.",
  },
  {
    icon: Users,
    title: "Owner & contractor views",
    description:
      "Separate dashboards so builders manage milestones while owners keep the full financial picture.",
  },
];

export default function LandingPage() {
  return (
    <div className="page-shell overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-[480px] w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-indigo-600/[0.07] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-teal-500/[0.05] blur-3xl" />
      </div>

      <LandingHero />

      <section className="border-t border-[color:var(--surface-border)] section-pad">
        <div className="page-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="text-sm font-medium uppercase tracking-wider text-indigo-400/90">
                Platform
              </p>
              <h2 className="mt-3">Built for clarity under pressure</h2>
              <p className="mt-4 max-w-md">
                Construction loans move fast. FinFlow keeps owners, lenders, and
                builders aligned with numbers you can trust at every milestone.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:gap-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Reveal key={feature.title} delay={index * 60}>
                    <article className="card-interactive h-full p-6 sm:p-7">
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--primary-muted)] text-indigo-400">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad pb-8">
        <Reveal>
          <div className="page-container">
            <div className="card-interactive flex flex-col items-start gap-6 border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.08] to-transparent p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div className="max-w-xl">
                <h2 className="text-2xl sm:text-3xl">
                  Ready to replace the spreadsheet?
                </h2>
                <p className="mt-2 text-[var(--muted)]">
                  Set up your project in minutes. Log disbursements as they
                  happen and watch pre-EMI stay predictable.
                </p>
              </div>
              <Link
                href="/signin"
                className="btn-primary shrink-0 px-8 py-3"
              >
                Create account
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
