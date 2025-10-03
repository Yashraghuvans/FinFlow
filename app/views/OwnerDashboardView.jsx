"use client";

import React, { memo, useMemo } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { Home, Download } from "lucide-react";
import MilestoneTracker from "../components/MilestoneTracker";
import InvoiceList from "../components/InvoiceList";
import TransactionHistory from "../components/TransactionHistory";
import FinancialSummary from "../components/FinancialSummary";

function OwnerDashboardView({ project, setProject, loading, error, stats }) {
  const summaryStats = useMemo(() => {
    if (!project) return [];
    const totalCost = Number(project.totalCost || 0).toLocaleString();
    const sanctioned = Number(project.sanctionedLoanAmount || 0).toLocaleString();
    const down = Number(project.downPayment || 0).toLocaleString();
    return [
      { title: "Total Cost", value: `₹${totalCost}` },
      { title: "Sanctioned Loan", value: `₹${sanctioned}` },
      { title: "Down Payment", value: `₹${down}` },
    ];
  }, [project]);

  return (
    <div className="pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <DashboardHeader
          title="Owner's Dashboard"
          subtitle="Track phased real-estate payments"
          icon={Home}
          gradientClass="from-teal-500 to-teal-600"
          actions={[
            { label: "Export", icon: Download, variant: "secondary" },
          ]}
        />
        {error && (
          <div className="status-error rounded-lg p-3 mb-4">
            Something went wrong. Please try again.
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card h-64 skeleton" />
            <div className="card h-64 skeleton" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {summaryStats.map((s) => (
                <div key={s.title} className="card">
                  <div className="text-gray-400 text-xs uppercase">{s.title}</div>
                  <div className="text-white text-2xl font-semibold">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              <MilestoneTracker milestones={project?.milestones} />
              <InvoiceList project={project} onProjectChange={setProject} />
              <FinancialSummary project={project} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <TransactionHistory project={project} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(OwnerDashboardView);


