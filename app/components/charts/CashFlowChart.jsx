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
import { DollarSign } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CashFlowChart({ project }) {
  const chartData = useMemo(() => {
    if (!project?.transactions) return null;

    // Group transactions by month
    const monthlyData = {};
    
    project.transactions.forEach((txn) => {
      const date = new Date(txn.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          label: monthLabel,
          inflow: 0,
          outflow: 0,
        };
      }

      if (txn.type === 'Bank Disbursement' || txn.type === 'Owner Direct Payment') {
        monthlyData[monthKey].inflow += Number(txn.amount);
      } else if (txn.type === 'Pre-EMI') {
        monthlyData[monthKey].outflow += Number(txn.amount);
      }
    });

    // Sort by month
    const sortedMonths = Object.keys(monthlyData).sort();
    const labels = sortedMonths.map(key => monthlyData[key].label);
    const inflowData = sortedMonths.map(key => monthlyData[key].inflow);
    const outflowData = sortedMonths.map(key => -monthlyData[key].outflow); // Negative for visual effect

    return {
      labels,
      datasets: [
        {
          label: 'Inflow (Payments)',
          data: inflowData,
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'Outflow (Pre-EMI)',
          data: outflowData,
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: 'rgb(239, 68, 68)',
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
            const value = Math.abs(context.parsed.y);
            label += '₹' + value.toLocaleString('en-IN');
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
            const absValue = Math.abs(value);
            return (value >= 0 ? '+' : '-') + '₹' + (absValue / 100000).toFixed(1) + 'L';
          }
        },
      },
    },
  };

  if (!chartData) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Cash Flow Analysis</h3>
        <div className="h-64 flex items-center justify-center text-slate-400">
          No transaction data available
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Cash Flow Analysis</h3>
            <p className="text-sm text-slate-400">Monthly inflow vs outflow</p>
          </div>
        </div>
      </div>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default CashFlowChart;
