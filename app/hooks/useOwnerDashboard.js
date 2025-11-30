"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { getProject, saveProject, clearProject } from "../lib/api/projectTrackerApi";
import syncManager from "../lib/api/syncManager";

export function useOwnerDashboard() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize sync manager
  useEffect(() => {
    syncManager.init();
  }, []);

  // Load initial project data
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getProject();
        if (mounted) setProject(data);
      } catch (e) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = syncManager.subscribe((updatedProject, source) => {
      console.log(`[Owner Dashboard] Received update from ${source}`);
      setProject(updatedProject);
    });

    return unsubscribe;
  }, []);

  const initializeProject = useCallback(async (projectData) => {
    try {
      setProject(projectData);
      await saveProject(projectData);
    } catch {
      setError("Failed to save project");
    }
  }, []);

  const resetProject = useCallback(async () => {
    try {
      await clearProject();
      setProject(null);
    } catch {
      setError("Failed to clear project");
    }
  }, []);

  const stats = useMemo(() => {
    if (!project) return null;
    const totalInvoices = project.invoices?.length || 0;
    const totalTransactions = project.transactions?.length || 0;
    const paidToBuilder = (project.transactions || [])
      .filter(t => t.type === 'Owner Direct Payment' || t.type === 'Bank Disbursement')
      .reduce((s, t) => s + (Number(t.amount) || 0), 0);
    return { totalInvoices, totalTransactions, paidToBuilder };
  }, [project]);

  return {
    project,
    setProject,
    initializeProject,
    resetProject,
    loading,
    error,
    stats,
  };
}


