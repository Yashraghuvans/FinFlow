"use client";
import React, { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, PieController } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, PieController);

const BudgetPieChart = ({ projects }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const data = {
        labels: projects.map((project, index) => `Project ${index + 1}`),
        datasets: [
          {
            label: "Budget Distribution",
            data: projects.map((project) => project.plannedBudget),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
            hoverOffset: 4,
          },
        ],
      };
      chartInstanceRef.current = new Chart(ctx, {
        type: "pie",
        data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
              labels: {
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw;
                  return `Budget: $${value}`;
                },
              },
            },
          },
        },
      });
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [projects]);

  return (
    <div className="w-[500px] h-[500px] flex justify-center items-center">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BudgetPieChart;
