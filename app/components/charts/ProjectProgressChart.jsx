"use client";

import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Activity, CheckCircle, Clock } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

function ProjectProgressChart({ project }) {
  const progressData = useMemo(() => {
    if (!project?.milestones) return null;

    const completed = project.milestones.filter(m => m.isCompleted).length;
    const pending = project.milestones.length - completed;
    const completionPercentage = Math.round((completed / project.milestones.length) * 100);

    const completedCost = project.milestones
      .filter(m => m.isCompleted)
      .reduce((sum, m) => sum + m.percentageOfCost, 0);
    
    const pendingCost = 100 - completedCost;

    return {
      milestones: { completed, pending, total: project.milestones.length },
      percentage: completionPercentage,
      cost: { completed: completedCost, pending: pendingCost }
    };
  }, [project]);

  const chartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: progressData ? [progressData.cost.completed, progressData.cost.pending] : [0, 100],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(100, 116, 139, 0.3)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(100, 116, 139)',
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '% of project cost';
          }
        }
      },
    },
  };

  if (!progressData) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Project Progress</h3>
        <div className="h-64 flex items-center justify-center text-slate-400">
          No milestone data available
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-success-500/20 rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-success-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Project Progress</h3>
          <p className="text-sm text-slate-400">Construction completion status</p>
        </div>
      </div>

      <div className="relative h-64 mb-6">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-white">{progressData.percentage}%</div>
          <div className="text-sm text-slate-400 mt-1">Complete</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-success-500/10 border border-success-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-success-400" />
            <span className="text-xs text-success-400 font-medium">Completed</span>
          </div>
          <div className="text-2xl font-bold text-white">{progressData.milestones.completed}</div>
          <div className="text-xs text-slate-400 mt-1">{progressData.cost.completed}% of cost</div>
        </div>

        <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">Pending</span>
          </div>
          <div className="text-2xl font-bold text-white">{progressData.milestones.pending}</div>
          <div className="text-xs text-slate-400 mt-1">{progressData.cost.pending}% of cost</div>
        </div>
      </div>
    </div>
  );
}

export default ProjectProgressChart;
