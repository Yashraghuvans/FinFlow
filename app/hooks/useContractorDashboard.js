"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { getProject, saveProject } from "../lib/api/projectTrackerApi";
import syncManager from "../lib/api/syncManager";

export function useContractorDashboard() {
  const [project, setProject] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

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
      } catch {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = syncManager.subscribe((updatedProject, source) => {
      console.log(`[Contractor Dashboard] Received update from ${source}`);
      setProject(updatedProject);
    });

    return unsubscribe;
  }, []);

  const setupProject = useCallback(async (data) => {
    try {
      const newProject = {
        projectName: data.projectName || "Untitled Project",
        builderName: data.builderName || "",
        totalCost: Number(data.totalCost) || 0,
        downPayment: Number(data.downPayment) || 0,
        sanctionedLoanAmount: Number(data.sanctionedLoanAmount) || 0,
        annualInterestRate: Number(data.annualInterestRate) || 0,
        loanTenureYears: Number(data.loanTenureYears) || 0,
        milestones: data.milestones || [],
        invoices: [],
        transactions: [],
      };
      setProject(newProject);
      await saveProject(newProject);
    } catch {
      setError("Failed to add project");
    }
  }, []);

  const totals = useMemo(() => {
    if (!project) return { revenue: 0, expenses: 0, margin: 0 };
    return { revenue: 0, expenses: 0, margin: 0 };
  }, [project]);

  return { project, setupProject, loading, error, totals };
}


