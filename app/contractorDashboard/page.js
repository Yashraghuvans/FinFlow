"use client"
import React, { Suspense } from 'react';
import NavBar from '../components/navbar';
import ContractorDashboardView from '../views/ContractorDashboardView';
import { useContractorDashboard } from '../hooks/useContractorDashboard';

function ContractorDashboardPage() {
  const vm = useContractorDashboard();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavBar />
      <ContractorDashboardView
        projects={vm.projects}
        addProject={vm.addProject}
        loading={vm.loading}
        error={vm.error}
      />
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