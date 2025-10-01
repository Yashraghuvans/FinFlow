"use client"
import React, { Suspense } from 'react';
import NavBar from '../components/navbar';
import ContractorDashboardView from '../views/ContractorDashboardView';
import { useContractorDashboard } from '../hooks/useContractorDashboard';

function ContractorDashboardPage() {
  const vm = useContractorDashboard();
  const isAuthed = typeof window !== 'undefined' && (() => {
    try { const s = JSON.parse(localStorage.getItem('finflow_auth')); return s && s.role === 'CONTRACTOR'; } catch { return false; }
  })();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavBar />
      {isAuthed ? (
        <ContractorDashboardView
          project={vm.project}
          setupProject={vm.setupProject}
          loading={vm.loading}
          error={vm.error}
        />
      ) : (
        <div className="pt-24 pb-8"><div className="max-w-4xl mx-auto px-4 md:px-8"><div className="card"><div className="text-white text-lg">Please sign in to view the dashboard.</div></div></div></div>
      )}
    </div>
  );
}

export default function ContractorDashboardWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <ContractorDashboardPage />
    </Suspense>
  );
}