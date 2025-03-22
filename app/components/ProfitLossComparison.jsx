"use client";
import React from "react";

const ProfitLossComparison = ({ projects }) => {
  const calculateProfitLoss = (revenue, expenses) => revenue - expenses;
  const calculateGrossProfitMargin = (revenue, profitLoss) =>
    revenue > 0 ? ((profitLoss / revenue) * 100).toFixed(2) : "N/A";

  return (
    <div className="w-full bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Profit/Loss Comparison</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-600 py-2 px-4">Project</th>
            <th className="border-b-2 border-gray-600 py-2 px-4">Profit/Loss</th>
            <th className="border-b-2 border-gray-600 py-2 px-4">Gross Profit Margin (%)</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            const profitLoss = calculateProfitLoss(project.revenue, project.expenses);
            const grossProfitMargin = calculateGrossProfitMargin(project.revenue, profitLoss);

            return (
              <tr key={index}>
                <td className="border-b border-gray-600 py-2 px-4">{`Project ${index + 1}`}</td>
                <td className={`border-b border-gray-600 py-2 px-4 ${profitLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {profitLoss >= 0 ? `Profit: $${profitLoss}` : `Loss: $${Math.abs(profitLoss)}`}
                </td>
                <td className="border-b border-gray-600 py-2 px-4">{grossProfitMargin}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProfitLossComparison;
