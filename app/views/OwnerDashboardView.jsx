"use client";

import React, { memo } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { Home, Download } from "lucide-react";
import MilestoneTracker from "../components/MilestoneTracker";
import InvoiceList from "../components/InvoiceList";
import TransactionHistory from "../components/TransactionHistory";
import FinancialSummary from "../components/FinancialSummary";
import SyncIndicator from "../components/SyncIndicator";
import RealTimeMetrics from "../components/charts/RealTimeMetrics";
import PaymentTimelineChart from "../components/charts/PaymentTimelineChart";
import CashFlowChart from "../components/charts/CashFlowChart";
import ProjectProgressChart from "../components/charts/ProjectProgressChart";
import MilestoneGanttChart from "../components/charts/MilestoneGanttChart";

function OwnerDashboardView({ project, setProject, loading, error, stats }) {

  return (
    <div className="pt-24 pb-8">
      <SyncIndicator />
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
            {/* Real-Time Metrics */}
            <div className="mb-8">
              <RealTimeMetrics project={project} />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
              <PaymentTimelineChart project={project} />
              <CashFlowChart project={project} />
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              <ProjectProgressChart project={project} />
              <div className="xl:col-span-2">
                <MilestoneGanttChart project={project} />
              </div>
            </div>

            {/* Full-width Invoices Section */}
            <div className="mb-6">
              <InvoiceList project={project} onProjectChange={setProject} />
            </div>

            {/* Side-by-side sections */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              <MilestoneTracker milestones={project?.milestones} />
              <FinancialSummary project={project} />
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-sm">Download Report</button>
                  <button className="w-full btn-secondary text-sm">View All Payments</button>
                  <button className="w-full btn-secondary text-sm">Contact Builder</button>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="grid grid-cols-1 gap-6">
              <TransactionHistory project={project} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(OwnerDashboardView);


