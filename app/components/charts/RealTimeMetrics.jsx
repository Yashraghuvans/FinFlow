"use client";

import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Percent, Clock } from 'lucide-react';

function RealTimeMetrics({ project }) {
  const metrics = useMemo(() => {
    if (!project) return null;

    const totalInvoiced = (project.invoices || []).reduce((sum, inv) => sum + Number(inv.amount), 0);
    const totalReceived = (project.transactions || [])
      .filter(t => t.type === 'Owner Direct Payment' || t.type === 'Bank Disbursement')
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const totalPreEMI = (project.transactions || [])
      .filter(t => t.type === 'Pre-EMI')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const completedMilestones = (project.milestones || []).filter(m => m.isCompleted).length;
    const totalMilestones = (project.milestones || []).length;
    const completionRate = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

    const pendingInvoices = (project.invoices || []).filter(inv => inv.status !== 'Paid').length;
    const avgPaymentTime = 7; // Mock data - days

    const collectionRate = totalInvoiced > 0 ? (totalReceived / totalInvoiced) * 100 : 0;

    return {
      totalInvoiced,
      totalReceived,
      totalPreEMI,
      completionRate,
      pendingInvoices,
      avgPaymentTime,
      collectionRate,
      outstandingAmount: totalInvoiced - totalReceived,
    };
  }, [project]);

  if (!metrics) {
    return null;
  }

  const metricCards = [
    {
      title: 'Total Invoiced',
      value: `₹${(metrics.totalInvoiced / 100000).toFixed(2)}L`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'primary',
      bgGradient: 'from-primary-500/20 to-primary-600/20',
      iconBg: 'bg-primary-500/20',
      iconColor: 'text-primary-400',
    },
    {
      title: 'Total Received',
      value: `₹${(metrics.totalReceived / 100000).toFixed(2)}L`,
      change: '+8.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'success',
      bgGradient: 'from-success-500/20 to-success-600/20',
      iconBg: 'bg-success-500/20',
      iconColor: 'text-success-400',
    },
    {
      title: 'Outstanding',
      value: `₹${(metrics.outstandingAmount / 100000).toFixed(2)}L`,
      change: '-5.2%',
      trend: 'down',
      icon: Clock,
      color: 'warning',
      bgGradient: 'from-warning-500/20 to-warning-600/20',
      iconBg: 'bg-warning-500/20',
      iconColor: 'text-warning-400',
    },
    {
      title: 'Collection Rate',
      value: `${metrics.collectionRate.toFixed(1)}%`,
      change: '+3.1%',
      trend: 'up',
      icon: Percent,
      color: 'teal',
      bgGradient: 'from-teal-500/20 to-teal-600/20',
      iconBg: 'bg-teal-500/20',
      iconColor: 'text-teal-400',
    },
    {
      title: 'Completion Rate',
      value: `${metrics.completionRate.toFixed(0)}%`,
      change: '+15.0%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
      bgGradient: 'from-purple-500/20 to-purple-600/20',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Pre-EMI Paid',
      value: `₹${(metrics.totalPreEMI / 1000).toFixed(0)}K`,
      change: '+2.8%',
      trend: 'up',
      icon: Calendar,
      color: 'error',
      bgGradient: 'from-error-500/20 to-error-600/20',
      iconBg: 'bg-error-500/20',
      iconColor: 'text-error-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metricCards.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl border border-slate-700/50 bg-gradient-to-br ${metric.bgGradient} backdrop-blur-sm p-5 hover:scale-105 transition-transform duration-300`}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${metric.iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  metric.trend === 'up' ? 'text-success-400' : 'text-error-400'
                }`}>
                  <TrendIcon className="w-3 h-3" />
                  {metric.change}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-slate-400">{metric.title}</div>
              </div>

              {/* Sparkline effect */}
              <div className="mt-4 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${
                    metric.trend === 'up' 
                      ? 'from-success-500 to-success-400' 
                      : 'from-error-500 to-error-400'
                  } animate-pulse`}
                  style={{ width: '70%' }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RealTimeMetrics;
