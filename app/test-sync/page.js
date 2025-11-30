"use client";

import React, { useState, useEffect } from 'react';
import { getProject, clearProject, saveProject } from '../lib/api/projectTrackerApi';
import { getCompleteMockProject, calculateOwnerPaymentSummary, calculateContractorProjectSummary } from '../lib/mockData';
import NavBar from '../components/navbar';
import { RefreshCw, Trash2, Database, Building2, Home } from 'lucide-react';

export default function TestSyncPage() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProject = async () => {
    setLoading(true);
    const data = await getProject();
    setProject(data);
    setLoading(false);
  };

  const handleSeedData = async () => {
    setLoading(true);
    const mockProject = getCompleteMockProject();
    await saveProject(mockProject);
    await loadProject();
  };

  const handleClearData = async () => {
    if (confirm('Are you sure you want to clear all project data?')) {
      setLoading(true);
      await clearProject();
      setProject(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sync Test Page</h1>
            <p className="text-slate-300 mb-6">
              Use this page to test real-time synchronization between Owner and Contractor dashboards.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <button 
                onClick={handleSeedData}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                Seed Demo Data
              </button>
              
              <button 
                onClick={loadProject}
                disabled={loading}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button 
                onClick={handleClearData}
                disabled={loading}
                className="btn-secondary flex items-center gap-2 bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Clear Data
              </button>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <h3 className="text-white font-semibold mb-2">Testing Instructions:</h3>
              <ol className="text-slate-300 space-y-2 list-decimal list-inside">
                <li>Click "Seed Demo Data" to create a sample project</li>
                <li>Open the Owner Dashboard in one browser tab</li>
                <li>Open the Contractor Dashboard in another tab</li>
                <li>Make changes in one dashboard (submit invoice, log payment, etc.)</li>
                <li>Watch the other dashboard update automatically!</li>
                <li>Look for the sync indicator in the bottom-right corner</li>
              </ol>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4">Current Project Data</h2>
            
            {loading ? (
              <div className="text-slate-400">Loading...</div>
            ) : project ? (
              <div className="space-y-6">
                {/* Project Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-slate-400 text-sm">Project Name</div>
                    <div className="text-white font-medium">{project.projectName}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Builder</div>
                    <div className="text-white font-medium">{project.builderName}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Total Cost</div>
                    <div className="text-white font-medium">₹{Number(project.totalCost).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Sanctioned Loan</div>
                    <div className="text-white font-medium">₹{Number(project.sanctionedLoanAmount).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Down Payment</div>
                    <div className="text-white font-medium">₹{Number(project.downPayment).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Interest Rate</div>
                    <div className="text-white font-medium">{project.annualInterestRate}% per annum</div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="border-t border-slate-700 pt-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary-400">{project.milestones?.length || 0}</div>
                      <div className="text-slate-400 text-sm">Milestones</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-400">{project.invoices?.length || 0}</div>
                      <div className="text-slate-400 text-sm">Invoices</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">{project.transactions?.length || 0}</div>
                      <div className="text-slate-400 text-sm">Transactions</div>
                    </div>
                  </div>
                </div>

                {/* Contractor View Summary */}
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-primary-400" />
                    <h3 className="text-white font-semibold">Contractor View</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(() => {
                      const summary = calculateContractorProjectSummary(project);
                      return (
                        <>
                          <div className="bg-slate-900 rounded p-3">
                            <div className="text-slate-400 text-xs">Total Invoiced</div>
                            <div className="text-white font-semibold">₹{summary.totalInvoiced.toLocaleString()}</div>
                          </div>
                          <div className="bg-slate-900 rounded p-3">
                            <div className="text-slate-400 text-xs">Total Received</div>
                            <div className="text-success-400 font-semibold">₹{summary.totalReceived.toLocaleString()}</div>
                          </div>
                          <div className="bg-slate-900 rounded p-3">
                            <div className="text-slate-400 text-xs">Pending Amount</div>
                            <div className="text-warning-400 font-semibold">₹{summary.pendingAmount.toLocaleString()}</div>
                          </div>
                          <div className="bg-slate-900 rounded p-3">
                            <div className="text-slate-400 text-xs">Completion</div>
                            <div className="text-primary-400 font-semibold">{summary.completionPercentage}%</div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Owner View Summary */}
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Home className="w-5 h-5 text-teal-400" />
                    <h3 className="text-white font-semibold">Owner View</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(() => {
                      const summary = calculateOwnerPaymentSummary(project);
                      return (
                        <>
                          <div className="bg-slate-900 rounded p-3">
                            <div className="text-slate-400 text-xs">Total Paid</div>
                            <div className="text-white font-semibold">₹{summary.totalPaid.toLocaleString()}</div>
                          </div>
                          <div className="bg-slate-900 rounded p-3">
                            <div className="text-slate-400 text-xs">Interest Paid</div>
                            <div className="text-error-400 font-semibold">₹{summary.totalInterestPaid.toLocaleString()}</div>
                          </div>
                          <div className="bg-slate-900 rounded p-3">
                            <div className="text-slate-400 text-xs">Remaining</div>
                            <div className="text-warning-400 font-semibold">₹{summary.remainingAmount.toLocaleString()}</div>
                          </div>
                          <div className="bg-slate-900 rounded p-3">
                            <div className="text-slate-400 text-xs">Next Payment</div>
                            <div className="text-primary-400 font-semibold">
                              {summary.nextPaymentDue ? `₹${summary.nextPaymentDue.amount.toLocaleString()}` : 'None'}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Milestones Status */}
                <div className="border-t border-slate-700 pt-4">
                  <h3 className="text-white font-semibold mb-3">Milestone Status</h3>
                  <div className="space-y-2">
                    {project.milestones?.slice(0, 5).map((milestone, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-900 rounded p-2">
                        <div className="flex-1">
                          <div className="text-white text-sm">{milestone.name}</div>
                          <div className="text-slate-400 text-xs">{milestone.percentageOfCost}% of total cost</div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          milestone.isCompleted 
                            ? 'bg-success-600 text-white' 
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {milestone.isCompleted ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    ))}
                    {project.milestones?.length > 5 && (
                      <div className="text-slate-400 text-xs text-center">
                        +{project.milestones.length - 5} more milestones
                      </div>
                    )}
                  </div>
                </div>

                {/* Raw Data (Collapsible) */}
                <details className="border-t border-slate-700 pt-4">
                  <summary className="text-slate-400 text-sm cursor-pointer hover:text-white">
                    Show Raw JSON Data (for debugging)
                  </summary>
                  <div className="bg-slate-900 rounded p-3 border border-slate-700 mt-2">
                    <pre className="text-xs text-slate-300 overflow-auto max-h-64">
                      {JSON.stringify(project, null, 2)}
                    </pre>
                  </div>
                </details>
              </div>
            ) : (
              <div className="text-slate-400">
                No project data found. Click "Seed Demo Data" to create a sample project.
              </div>
            )}
          </div>

          <div className="card mt-8 bg-primary-900/20 border-primary-700">
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-wrap gap-3">
              <a href="/ownerDashboard" target="_blank" className="btn-primary">
                Open Owner Dashboard →
              </a>
              <a href="/contractorDashboard" target="_blank" className="btn-primary">
                Open Contractor Dashboard →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
