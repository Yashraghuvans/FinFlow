"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { fetchProjects, createProject } from "../lib/api/projectApi";

export function useContractorDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        if (mounted) setProjects(data);
      } catch {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const addProject = useCallback(async (data) => {
    try {
      const { projectValue, projectTimePeriod } = data;
      const preEmi = projectValue && projectTimePeriod
        ? (projectValue / projectTimePeriod).toFixed(2)
        : 0;

      const newProject = { ...data, preEmi };
      setProjects(prev => [...prev, newProject]);
      await createProject(newProject);
    } catch {
      setError("Failed to add project");
    }
  }, []);

  const totals = useMemo(() => {
    const revenue  = projects.reduce((s, p) => s + (parseFloat(p.revenue) || 0), 0);
    const expenses = projects.reduce((s, p) => s + (parseFloat(p.expenses) || 0), 0);
    const margin   = revenue ? ((revenue - expenses) / revenue) * 100 : 0;
    return { revenue, expenses, margin };
  }, [projects]);

  return { projects, addProject, loading, error, totals };
}


