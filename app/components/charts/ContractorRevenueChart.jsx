"use client";

import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { BarChart3 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ContractorRevenueChart({ project }) {
  const chartData = useMemo(() => {
    if (!project?.milestones || !project?.invoices) return null;

    const labels = [];
    const invoicedData = [];
    const receivedData = [];
    const pendingData = [];

    project.milestones.forEach((milestone) => {
      const milestoneInvoices = project.invoices.filter(
        inv => inv.milestoneId === milestone.id
      );

      if (milestoneInvoices.length > 0) {
        const totalInvoiced = milestoneInvoices.reduce(
          (sum, inv) => sum + Number(inv.amount), 0
        );

        const totalReceived = milestoneInvoices.reduce((sum, inv) => {
          const paid = (project.transactions || [])
            .filter(t => t.invoiceId === inv.id && 
              (t.type === 'Owner Direct Payment' || t.type === 'Bank Disbursement'))
            .reduce((s, t) => s + Number(t.amount), 0);
          return sum + paid;
        }, 0);

        const pending = totalInvoiced - totalReceived;

        labels.push(milestone.name.length > 15 ? milestone.name.substring(0, 15) + '...' : milestone.name);
        invoicedData.push(totalInvoiced);
        receivedData.push(totalReceived);
        pendingData.push(pending);
      }
    });

    return {
      labels,
      datasets: [
        {
          label: 'Invoiced Amount',
          data: invoicedData,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'Received Amount',
          data: receivedData,
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'Pending Amount',
          data: pendingData,
          backgroundColor: 'rgba(251, 191, 36, 0.8)',
          borderColor: 'rgb(251, 191, 36)',
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    };
  }, [project]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
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
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += '₹' + context.parsed.y.toLocaleString('en-IN');
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11,
          },
          callback: function(value) {
            return '₹' + (value / 100000).toFixed(1) + 'L';
          }
        },
      },
    },
  };

  if (!chartData) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Revenue by Milestone</h3>
        <div className="h-64 flex items-center justify-center text-slate-400">
          No invoice data available
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Revenue by Milestone</h3>
          <p className="text-sm text-slate-400">Invoiced vs received amounts</p>
        </div>
      </div>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default ContractorRevenueChart;
