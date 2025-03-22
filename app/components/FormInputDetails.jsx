import React from 'react';

function FormInputDetails({ formData }) {
    if (!formData || formData.length === 0) {
        return <p className="text-gray-400">No form data available.</p>;
    }

    return (
        <div className="form-input-details overflow-x-auto w-full">
            <table className="min-w-full leading-normal">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Project
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Location
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Project Value (₹)
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Time Period (Months)
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Planned Budget (₹)
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Actual Spending (₹)
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Revenue (₹)
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Expenses (₹)
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 text-gray-50">
                    {formData.map((data, index) => (
                        <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">{data.name}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">{data.selectedProject}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">{data.selectedLocation}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{data.projectValue}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">{data.projectTimePeriod}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{data.plannedBudget}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{data.actualSpending}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{data.revenue}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{data.expenses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FormInputDetails;
