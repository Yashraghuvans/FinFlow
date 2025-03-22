"use client";
import React, { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

Chart.register(BarController, BarElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const ProfitBarChart = ({ projects }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const labels = projects.map((_, index) => `Project ${index + 1}`);
      const datasets = projects.map((project, index) => ({
        label: `Project ${index + 1}`,
        data: [project.revenue - project.expenses],
        backgroundColor: `hsl(${(index * 360) / projects.length}, 70%, 50%)`,
        borderColor: `hsl(${(index * 360) / projects.length}, 70%, 40%)`,
        borderWidth: 1,
      }));

      const data = {
        labels,
        datasets,
      };

      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `Profit: $${tooltipItem.raw}`,
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Projects",
                color: "#ffffff",
              },
              ticks: {
                color: "#ffffff",
              },
            },
            y: {
              title: {
                display: true,
                text: "Profit ($)",
                color: "#ffffff",
              },
              ticks: {
                color: "#ffffff",
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
    <div className="w-full h-[400px] flex justify-center items-center bg-gray-800 p-4 rounded-lg shadow-md">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ProfitBarChart;
