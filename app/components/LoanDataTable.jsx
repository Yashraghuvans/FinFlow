import React from 'react';

function LoanDataTable({ loans }) {
    if (!loans || loans.length === 0) {
        return <p className="text-gray-400">No loan data added yet.</p>;
    }

    return (
        <div className="loan-data-table overflow-x-auto">
            <table className="min-w-full leading-normal">
                <thead className="bg-gray-700 text-white">
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Bank Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Location
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Time Period (Years)
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Interest Rate (%)
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Principal Amount
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Down Payment
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                            Monthly Pre-Payment
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 text-gray-50">
                    {loans.map((loan, index) => (
                        <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">{loan.bankName}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">{loan.location}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">{loan.timePeriod}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">{loan.interest}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{loan.principal}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{loan.downPayment}</td>
                            <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{loan.prePayment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LoanDataTable;