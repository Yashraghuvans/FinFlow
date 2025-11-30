"use client";

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function PaymentTimelineChart({ project }) {
  const chartData = useMemo(() => {
    if (!project?.transactions) return null;

    // Sort transactions by date
    const sortedTransactions = [...project.transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Calculate cumulative amounts for different payment types
    let cumulativeBankDisbursement = 0;
    let cumulativeOwnerPayment = 0;
    let cumulativePreEMI = 0;

    const labels = [];
    const bankData = [];
    const ownerData = [];
    const preEMIData = [];
    const totalData = [];

    sortedTransactions.forEach((txn) => {
      const date = new Date(txn.date).toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short' 
      });

      if (txn.type === 'Bank Disbursement') {
        cumulativeBankDisbursement += Number(txn.amount);
      } else if (txn.type === 'Owner Direct Payment') {
        cumulativeOwnerPayment += Number(txn.amount);
      } else if (txn.type === 'Pre-EMI') {
        cumulativePreEMI += Number(txn.amount);
      }

      labels.push(date);
      bankData.push(cumulativeBankDisbursement);
      ownerData.push(cumulativeOwnerPayment);
      preEMIData.push(cumulativePreEMI);
      totalData.push(cumulativeBankDisbursement + cumulativeOwnerPayment);
    });

    return {
      labels,
      datasets: [
        {
          label: 'Total Payments',
          data: totalData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
        {
          label: 'Bank Disbursement',
          data: bankData,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: 'rgb(16, 185, 129)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
        {
          label: 'Owner Payment',
          data: ownerData,
          borderColor: 'rgb(168, 85, 247)',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: 'rgb(168, 85, 247)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
        {
          label: 'Pre-EMI Paid',
          data: preEMIData,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: 'rgb(239, 68, 68)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
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
        displayColors: true,
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
          color: 'rgba(148, 163, 184, 0.1)',
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
        <h3 className="text-lg font-semibold text-white mb-4">Payment Timeline</h3>
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
          <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Payment Timeline</h3>
            <p className="text-sm text-slate-400">Cumulative payment flow over time</p>
          </div>
        </div>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PaymentTimelineChart;
