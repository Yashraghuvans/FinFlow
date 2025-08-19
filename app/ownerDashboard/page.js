"use client"
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NavBar from '../components/navbar';
import OwnerDashboardView from '../views/OwnerDashboardView';
import { useOwnerDashboard } from '../hooks/useOwnerDashboard';

function OwnerDashboardPage() {
  const searchParams = useSearchParams();
  const vm = useOwnerDashboard(searchParams);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavBar />
      <OwnerDashboardView {...vm} />
    </div>
  );
}

export default function HomePageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <OwnerDashboardPage />
    </Suspense>
  );
}