"use client";

import React, { useMemo } from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

function MilestoneGanttChart({ project }) {
  const ganttData = useMemo(() => {
    if (!project?.milestones) return null;

    const now = new Date();
    const milestones = project.milestones.map((milestone, index) => {
      const completedDate = milestone.completedDate ? new Date(milestone.completedDate) : null;
      const expectedDate = milestone.expectedDate ? new Date(milestone.expectedDate) : null;
      
      return {
        ...milestone,
        completedDate,
        expectedDate,
        index,
      };
    });

    // Calculate timeline range
    const allDates = milestones
      .flatMap(m => [m.completedDate, m.expectedDate])
      .filter(d => d !== null);
    
    const minDate = allDates.length > 0 ? new Date(Math.min(...allDates)) : new Date();
    const maxDate = allDates.length > 0 ? new Date(Math.max(...allDates)) : new Date();
    
    // Add padding
    minDate.setMonth(minDate.getMonth() - 1);
    maxDate.setMonth(maxDate.getMonth() + 2);

    return { milestones, minDate, maxDate, now };
  }, [project]);

  if (!ganttData) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Project Timeline</h3>
        <div className="h-64 flex items-center justify-center text-slate-400">
          No milestone data available
        </div>
      </div>
    );
  }

  const { milestones, minDate, maxDate, now } = ganttData;
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));

  const getPositionPercentage = (date) => {
    if (!date) return 0;
    const daysSinceStart = Math.ceil((date - minDate) / (1000 * 60 * 60 * 24));
    return (daysSinceStart / totalDays) * 100;
  };

  const nowPosition = getPositionPercentage(now);

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Project Timeline</h3>
          <p className="text-sm text-slate-400">Milestone schedule and progress</p>
        </div>
      </div>

      {/* Timeline Header */}
      <div className="mb-4 pb-4 border-b border-slate-700">
        <div className="flex justify-between text-xs text-slate-400">
          <span>{minDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
          <span className="text-primary-400 font-medium">Today</span>
          <span>{maxDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="space-y-4 relative">
        {/* Current date indicator */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-primary-500 z-10"
          style={{ left: `${nowPosition}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
        </div>

        {milestones.map((milestone) => {
          const startPos = milestone.completedDate 
            ? getPositionPercentage(milestone.completedDate) - 5
            : milestone.expectedDate 
            ? getPositionPercentage(milestone.expectedDate) - 5
            : 0;
          
          const barWidth = 10;
          const isOverdue = !milestone.isCompleted && milestone.expectedDate && milestone.expectedDate < now;

          return (
            <div key={milestone.id} className="relative">
              {/* Milestone Info */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                  {milestone.index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white truncate">{milestone.name}</span>
                    {milestone.isCompleted && (
                      <CheckCircle className="w-4 h-4 text-success-400 flex-shrink-0" />
                    )}
                    {isOverdue && (
                      <AlertCircle className="w-4 h-4 text-error-400 flex-shrink-0" />
                    )}
                    {!milestone.isCompleted && !isOverdue && (
                      <Clock className="w-4 h-4 text-warning-400 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-slate-400">
                    {milestone.percentageOfCost}% of cost
                    {milestone.completedDate && (
                      <span className="ml-2">• Completed {milestone.completedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    )}
                    {!milestone.isCompleted && milestone.expectedDate && (
                      <span className="ml-2">• Due {milestone.expectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Timeline Bar */}
              <div className="relative h-8 bg-slate-800/50 rounded-lg overflow-hidden">
                <div
                  className={`absolute top-1/2 -translate-y-1/2 h-4 rounded-full transition-all duration-300 ${
                    milestone.isCompleted
                      ? 'bg-gradient-to-r from-success-500 to-success-400'
                      : isOverdue
                      ? 'bg-gradient-to-r from-error-500 to-error-400'
                      : 'bg-gradient-to-r from-warning-500 to-warning-400'
                  }`}
                  style={{
                    left: `${Math.max(0, Math.min(startPos, 90))}%`,
                    width: `${barWidth}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-700 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success-500" />
          <span className="text-slate-400">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning-500" />
          <span className="text-slate-400">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-error-500" />
          <span className="text-slate-400">Overdue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3 bg-primary-500" />
          <span className="text-slate-400">Today</span>
        </div>
      </div>
    </div>
  );
}

export default MilestoneGanttChart;
