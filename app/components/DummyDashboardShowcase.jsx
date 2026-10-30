"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Building2,
  IndianRupee,
  Landmark,
  TrendingDown,
  Users,
  Wallet,
  FileText,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const OWNER_STATS = [
  { label: "Bank disbursed", value: "₹42.50L", icon: Landmark, className: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { label: "Owner direct", value: "₹8.20L", icon: Wallet, className: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  { label: "Pre-EMI paid", value: "₹1.84L", icon: TrendingDown, className: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { label: "Agreement", value: "₹85.00L", icon: IndianRupee, className: "text-zinc-300 bg-white/5 border-white/10" },
];

const OWNER_TX = [
  { type: "Bank disbursement", date: "12 Oct 2026", amount: "₹12,50,000", pill: "bg-blue-500/10 text-blue-300 border-blue-500/25" },
  { type: "Pre-EMI", date: "01 Oct 2026", amount: "₹18,420", pill: "bg-orange-500/10 text-orange-300 border-orange-500/25" },
  { type: "Owner direct", date: "28 Sep 2026", amount: "₹3,00,000", pill: "bg-indigo-500/10 text-indigo-300 border-indigo-500/25" },
];

const CONTRACTOR_CLIENTS = [
  { name: "Ananya Mehta", project: "Prestige Falcon City", status: "Structure phase", paid: "68%", amount: "₹58.2L" },
  { name: "Rahul Kapoor", project: "Brigade Cornerstone", status: "Foundation complete", paid: "41%", amount: "₹34.8L" },
  { name: "Priya Nair", project: "Sobha Dream Acres", status: "Possession Q2", paid: "92%", amount: "₹78.1L" },
];

const CONTRACTOR_STATS = [
  { label: "Active owners", value: "12", sub: "Across 3 townships", icon: Users, accent: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { label: "Outstanding", value: "₹4.2L", sub: "Pending milestones", icon: FileText, accent: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { label: "On-time releases", value: "94%", sub: "Last 90 days", icon: CheckCircle2, accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
];

function RoleToggle({ role, onChange }) {
  return (
    <div
      className="flex gap-1 rounded-lg border border-[color:var(--surface-border)] bg-black/40 p-1"
      role="tablist"
      aria-label="Dashboard role preview"
    >
      {[
        { id: "owner", label: "Owner" },
        { id: "contractor", label: "Contractor" },
      ].map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={role === id}
          onClick={() => onChange(id)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
            role === id
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function OwnerPreview() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3 animate-fade-in p-3 sm:gap-4 sm:p-4">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[color:var(--surface-border)] pb-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-indigo-400/90 sm:text-xs">
            Project overview
          </p>
          <p className="text-sm font-semibold text-white sm:text-base">Prestige Falcon City</p>
          <p className="text-[11px] text-zinc-500 sm:text-xs">
            Builder: <span className="text-zinc-300">Prestige Group</span>
          </p>
        </div>
        <span className="badge border-indigo-500/30 bg-indigo-500/10 text-[10px] text-indigo-200 sm:text-xs">
          Active construction
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
        {OWNER_STATS.map(({ label, value, icon: Icon, className }) => (
          <div
            key={label}
            className="rounded-lg border border-[color:var(--surface-border)] bg-[var(--surface)] p-2.5 sm:p-3"
          >
            <div className={`mb-2 flex h-7 w-7 items-center justify-center rounded-md border ${className}`}>
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </div>
            <p className="text-[9px] uppercase tracking-wide text-zinc-500 sm:text-[10px]">{label}</p>
            <p className="text-sm font-semibold tabular-nums text-white sm:text-base">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-5">
        <div className="rounded-lg border border-[color:var(--surface-border)] bg-[var(--surface)] p-3 sm:col-span-3">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium text-white sm:text-sm">Project liquidity</p>
              <p className="text-[10px] text-zinc-500">Deployed vs agreement</p>
            </div>
            <p className="text-lg font-semibold text-indigo-400 sm:text-xl">68.4%</p>
          </div>
          <div className="h-2 overflow-hidden rounded-full border border-[color:var(--surface-border)] bg-black/30 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
              style={{ width: "68.4%" }}
            />
          </div>
          <p className="mt-2 text-[10px] text-zinc-500">₹26.84L remaining to possession</p>
          <div className="mt-3 flex h-16 items-end gap-1.5 border-t border-[color:var(--surface-border)] pt-3">
            {[35, 55, 45, 72, 68, 85].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm bg-indigo-500/50"
                  style={{ height: `${h * 0.45}px` }}
                />
                <span className="text-[8px] text-zinc-600">
                  {["J", "F", "M", "A", "M", "J"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-[color:var(--surface-border)] bg-[var(--surface)] sm:col-span-2">
          <p className="border-b border-[color:var(--surface-border)] px-3 py-2 text-xs font-medium text-white">
            Recent movements
          </p>
          <ul className="min-h-0 flex-1 divide-y divide-[color:var(--surface-border)] overflow-y-auto">
            {OWNER_TX.map((tx) => (
              <li key={tx.date + tx.type} className="flex items-center justify-between gap-2 px-3 py-2">
                <div className="min-w-0">
                  <span className={`inline-block rounded-full border px-1.5 py-0.5 text-[8px] font-semibold uppercase ${tx.pill}`}>
                    {tx.type}
                  </span>
                  <p className="mt-0.5 text-[10px] text-zinc-500">{tx.date}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-white">{tx.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ContractorPreview() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3 animate-fade-in p-3 sm:gap-4 sm:p-4">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[color:var(--surface-border)] pb-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-teal-400/90 sm:text-xs">
            Contractor portal
          </p>
          <p className="text-sm font-semibold text-white sm:text-base">Prestige Build Partners</p>
          <p className="text-[11px] text-zinc-500 sm:text-xs">
            <span className="text-zinc-300">12</span> active owner projects
          </p>
        </div>
        <span className="badge border-orange-500/30 bg-orange-500/10 text-[10px] text-orange-200 sm:text-xs">
          API connected
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5">
        {CONTRACTOR_STATS.map(({ label, value, sub, icon: Icon, accent }) => (
          <div
            key={label}
            className="rounded-lg border border-[color:var(--surface-border)] bg-[var(--surface)] p-2.5 sm:p-3"
          >
            <div className={`mb-2 flex h-7 w-7 items-center justify-center rounded-md border ${accent}`}>
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </div>
            <p className="text-[9px] uppercase tracking-wide text-zinc-500 sm:text-[10px]">{label}</p>
            <p className="text-lg font-semibold text-white sm:text-xl">{value}</p>
            <p className="text-[10px] text-zinc-500">{sub}</p>
          </div>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-[color:var(--surface-border)] bg-[var(--surface)]">
        <div className="flex items-center justify-between border-b border-[color:var(--surface-border)] px-3 py-2">
          <p className="text-xs font-medium text-white">Assigned owners</p>
          <span className="text-[10px] text-zinc-500">Sample data</span>
        </div>
        <ul className="divide-y divide-[color:var(--surface-border)]">
          {CONTRACTOR_CLIENTS.map((client) => (
            <li
              key={client.name}
              className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 sm:flex-nowrap"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-white sm:text-sm">{client.name}</p>
                <p className="flex items-center gap-1 text-[10px] text-zinc-500 sm:text-xs">
                  <Building2 className="h-3 w-3 shrink-0" aria-hidden />
                  {client.project}
                </p>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-[10px] text-zinc-500">{client.status}</p>
                  <p className="text-xs font-semibold tabular-nums text-white">{client.amount}</p>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400">
                  {client.paid}
                  <ArrowUpRight className="h-3 w-3" aria-hidden />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function DummyDashboardShowcase({ autoRotate = true }) {
  const [role, setRole] = useState("owner");

  const cycle = useCallback(() => {
    setRole((r) => (r === "owner" ? "contractor" : "owner"));
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(cycle, 8000);
    return () => clearInterval(id);
  }, [autoRotate, cycle]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--background)]">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[color:var(--surface-border)] bg-[var(--surface)]/80 px-3 py-2 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/15 text-xs font-bold text-indigo-300">
            F
          </span>
          <span className="text-xs font-semibold text-white sm:text-sm">FinFlow</span>
        </div>
        <RoleToggle role={role} onChange={setRole} />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {role === "owner" ? <OwnerPreview /> : <ContractorPreview />}
      </div>
    </div>
  );
}
