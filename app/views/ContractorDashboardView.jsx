"use client";

import React, { memo, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { Building2, Download, Plus } from "lucide-react";
import ProjectSetupForm from "../components/ProjectSetupForm";
import { generateId, upsertInvoice, saveProject } from "../lib/api/projectTrackerApi";
import { toast } from "react-toastify";
import SyncIndicator from "../components/SyncIndicator";
import RealTimeMetrics from "../components/charts/RealTimeMetrics";
import PaymentTimelineChart from "../components/charts/PaymentTimelineChart";
import ProjectProgressChart from "../components/charts/ProjectProgressChart";
import MilestoneGanttChart from "../components/charts/MilestoneGanttChart";
import ContractorRevenueChart from "../components/charts/ContractorRevenueChart";
import CreateMilestoneDialog from "../components/CreateMilestoneDialog";

function ContractorDashboardView({ project, setupProject, loading, error }) {
  const [isAddMilestoneOpen, setIsAddMilestoneOpen] = useState(false);

  const handleSubmitInvoice = async (milestone) => {
    if (!project) return;
    
    try {
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
      toast.success(`Invoice ${invoice.invoiceNumber} submitted successfully!`);
    } catch (error) {
      toast.error("Failed to submit invoice");
      console.error(error);
    }
  };

  const handleAddMilestoneToProject = async (milestoneData) => {
    if (!project) return;

    try {
      const newMilestone = {
        id: generateId('ms'),
        ...milestoneData,
      };

      const updatedProject = {
        ...project,
        milestones: [...(project.milestones || []), newMilestone],
      };

      await saveProject(updatedProject);
      toast.success('Milestone added successfully!');
    } catch (error) {
      toast.error('Failed to add milestone');
      console.error(error);
    }
  };
  return (
    <div className="pt-24 pb-8">
      <SyncIndicator />
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
            {project && (
              <>
                {/* Real-Time Metrics */}
                <div className="mb-8">
                  <RealTimeMetrics project={project} />
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                  <ContractorRevenueChart project={project} />
                  <PaymentTimelineChart project={project} />
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                  <ProjectProgressChart project={project} />
                  <div className="xl:col-span-2">
                    <MilestoneGanttChart project={project} />
                  </div>
                </div>
              </>
            )}

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
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Milestones</h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {project.milestones?.length || 0} milestone{project.milestones?.length !== 1 ? 's' : ''} • {
                        project.milestones?.reduce((sum, m) => sum + (Number(m.percentageOfCost) || 0), 0)
                      }% allocated
                    </p>
                  </div>
                  <button 
                    className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
                    onClick={() => setIsAddMilestoneOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Add Milestone
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {project.milestones?.map(m => (
                    <div key={m.id} className="p-4 bg-slate-800 rounded border border-slate-700 hover:border-primary-500/50 transition-colors">
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

            {/* Add Milestone Dialog for Existing Project */}
            {project && (
              <CreateMilestoneDialog
                isOpen={isAddMilestoneOpen}
                onClose={() => setIsAddMilestoneOpen(false)}
                onSubmit={handleAddMilestoneToProject}
                existingMilestones={project.milestones || []}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(ContractorDashboardView);


