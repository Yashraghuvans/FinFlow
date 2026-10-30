import Link from "next/link";
import { Github, Mail } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--surface-border)] bg-[var(--surface)]/40">
      <div className="page-container flex flex-col gap-10 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="text-lg font-semibold text-white">
            FinFlow
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Construction-phase finance for property owners—disbursements,
            milestones, and pre-EMI in one place.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://github.com/Yashraghuvans/FinFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--surface-border)] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="mailto:contact@finflow.com"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--surface-border)] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:gap-16">
          <div>
            <p className="font-medium text-white">Product</p>
            <ul className="mt-3 space-y-2 text-[var(--muted)]">
              <li>
                <Link href="/signin" className="hover:text-white">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-white">
                  Create account
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-white">Legal</p>
            <ul className="mt-3 space-y-2 text-[var(--muted)]">
              <li>
                <span className="cursor-default">Privacy</span>
              </li>
              <li>
                <span className="cursor-default">Terms</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--surface-border)]">
        <div className="page-container py-6 text-center text-xs text-zinc-500 sm:text-left">
          © {year} FinFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
