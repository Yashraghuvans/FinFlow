import React from 'react';

function BudgetAnalysis({ projects }) {
    if (!projects || projects.length === 0) {
        return <p className="text-gray-400">No project data available.</p>;
    }

    return (
        <div className="budget-analysis overflow-x-auto">

            <table className="min-w-full leading-normal">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Project Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Budget Variance (₹)
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Budget Variance (%)
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Profit/Loss (₹)
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Gross Profit Margin (%)
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 text-gray-50">
                    {projects.map((project, index) => {
                        const budgetVariance = project.plannedBudget - project.actualSpending;
                        const budgetVariancePercentage = ((budgetVariance / project.plannedBudget) * 100).toFixed(2);
                        const profitLoss = project.revenue - project.expenses;
                        const grossProfitMargin = ((profitLoss / project.revenue) * 100).toFixed(2);

                        return (
                            <tr key={index}>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">{project.name}</td>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{budgetVariance.toFixed(2)}</td>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">{budgetVariancePercentage}%</td>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{profitLoss.toFixed(2)}</td>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">{grossProfitMargin}%</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default BudgetAnalysis;
