"use client";

import React, { memo, useMemo } from "react";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import { Building2, DollarSign, TrendingUp, BarChart3, Download } from "lucide-react";
import PreEMIInputForm from "../components/PreEMIInputForm";
import FormInputDetails from "../components/FormInputDetails";
import BudgetAnalysis from "../components/BudgetAnalysis";
import BudgetPieChart from "../components/BudgetPieChart";
import ProfitLossComparison from "../components/ProfitLossComparison";
import ProfitBarChart from "../components/ProfitBarChart";

function ContractorDashboardView({ projects, addProject, loading, error }) {
  const stats = useMemo(() => {
    const total = projects.length;
    const revenue = projects.reduce((s, p) => s + (parseFloat(p.revenue) || 0), 0).toLocaleString();
    const expenses = projects.reduce((s, p) => s + (parseFloat(p.expenses) || 0), 0).toLocaleString();
    const margin = (() => {
      const r = projects.reduce((s, p) => s + (parseFloat(p.revenue) || 0), 0);
      const e = projects.reduce((s, p) => s + (parseFloat(p.expenses) || 0), 0);
      return r ? (((r - e) / r) * 100).toFixed(1) : "0.0";
    })();
    return [
      { title: "Projects", value: total, icon: Building2, gradientClass: "from-primary-500 to-primary-600", trend: "+12%", trendType: "positive" },
      { title: "Revenue", value: `₹${revenue}`, icon: DollarSign, gradientClass: "from-success-500 to-success-600", trend: "+8.2%", trendType: "positive" },
      { title: "Expenses", value: `₹${expenses}`, icon: TrendingUp, gradientClass: "from-warning-500 to-warning-600", trend: "-3.1%", trendType: "negative" },
      { title: "Profit Margin", value: `${margin}%`, icon: BarChart3, gradientClass: "from-teal-500 to-teal-600", trend: "+5.7%", trendType: "positive" },
    ];
  }, [projects]);
  return (
    <div className="pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <DashboardHeader
          title="Contractor's Dashboard"
          subtitle="Manage your projects and track financial performance"
          icon={Building2}
          gradientClass="from-primary-500 to-primary-600"
          actions={[{ label: "Export", icon: Download, variant: "secondary" }]}
        />
        {error && (
          <div className="status-error rounded-lg p-3 mb-4">
            Failed to load projects. Please try again.
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card h-64 skeleton" />
            <div className="card h-64 skeleton" />
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((s) => (
                <StatCard key={s.title} {...s} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">Enter Project Details</h2>
                <PreEMIInputForm onSubmit={addProject} className="w-full m-0" />
              </div>
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">Budget Analysis Chart</h2>
                <BudgetPieChart projects={projects} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">Details</h2>
                <FormInputDetails formData={projects} />
              </div>
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">Budget Analysis</h2>
                <BudgetAnalysis projects={projects} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">Profit/Loss Analysis</h2>
                <ProfitLossComparison projects={projects} />
              </div>
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">Profit Bar Chart</h2>
                <ProfitBarChart projects={projects} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(ContractorDashboardView);


