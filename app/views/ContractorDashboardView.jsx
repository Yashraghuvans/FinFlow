"use client";

import React, { memo } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { Building2, Download } from "lucide-react";
import ProjectSetupForm from "../components/ProjectSetupForm";
import { generateId, upsertInvoice } from "../lib/api/projectTrackerApi";

function ContractorDashboardView({ project, setupProject, loading, error }) {
  const handleSubmitInvoice = async (milestone) => {
    if (!project) return;
    const amount = Number(((Number(project.totalCost||0) * (Number(milestone.percentageOfCost)||0)) / 100).toFixed(2));
    const invoice = {
      id: generateId('inv'),
      milestoneId: milestone.id,
      invoiceNumber: `INV-${Math.floor(Math.random()*100000)}`,
      amount,
      dueDate: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
      status: 'Due',
    };
    await upsertInvoice(invoice);
    // TODO: In a real application, this would be an API call to the backend to ensure real-time updates.
  };
  return (
    <div className="pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <DashboardHeader
          title="Contractor's Dashboard"
          subtitle="Set up project and submit milestone invoices"
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
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6 mb-6">
              <div className="card 2xl:col-span-2">
                <h2 className="text-lg font-semibold mb-4 text-white">Project Setup</h2>
                <ProjectSetupForm onSubmit={setupProject} className="w-full m-0" />
              </div>
              {project && (
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4 text-white">Quick Stats</h2>
                  <div className="space-y-3 text-gray-200">
                    <div className="flex items-center justify-between"><span>Total Cost</span><span className="text-white font-medium">₹{Number(project.totalCost||0).toLocaleString()}</span></div>
                    <div className="flex items-center justify-between"><span>Sanctioned Loan</span><span className="text-white font-medium">₹{Number(project.sanctionedLoanAmount||0).toLocaleString()}</span></div>
                    <div className="flex items-center justify-between"><span>Milestones</span><span className="text-white font-medium">{project.milestones?.length||0}</span></div>
                    <div className="flex items-center justify-between"><span>Invoices</span><span className="text-white font-medium">{project.invoices?.length||0}</span></div>
                  </div>
                </div>
              )}
            </div>

            {project && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4 text-white">Milestones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {project.milestones?.map(m => (
                    <div key={m.id} className="p-4 bg-slate-800 rounded border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-medium">{m.name}</div>
                        <span className="text-xs px-2 py-1 rounded bg-indigo-600 text-white">{m.percentageOfCost}%</span>
                      </div>
                      <div className="text-gray-400 text-sm mb-3">{m.isCompleted ? 'Completed' : 'Pending'}</div>
                      <button className="btn btn-primary w-full" onClick={() => handleSubmitInvoice(m)}>Submit Invoice</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(ContractorDashboardView);


