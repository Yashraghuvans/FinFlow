import React from 'react';

function LoanDetailsTable({ loanParams, calculatedEMI }) {
    if (!loanParams || !calculatedEMI) {
        return <p className="text-gray-400">No loan details available.</p>;
    }

    const { principalAmount, annualInterestRate, loanTenureYears } = loanParams;
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfMonths = loanTenureYears * 12;
    const emi = parseFloat(calculatedEMI);

    if (isNaN(emi)) return null;

    const rows = [];
    let currentOutstandingPrincipal = principalAmount;

    for (let month = 1; month <= numberOfMonths; month++) {
        const interestPayment = currentOutstandingPrincipal * monthlyInterestRate;
        const principalPayment = emi - interestPayment;
        currentOutstandingPrincipal -= principalPayment;
        if (currentOutstandingPrincipal < 0) currentOutstandingPrincipal = 0;

        rows.push({
            month,
            emi: emi.toFixed(2),
            interestPayment: interestPayment.toFixed(2),
            principalPayment: principalPayment.toFixed(2),
            outstandingPrincipal: currentOutstandingPrincipal.toFixed(2),
        });
    }

    return (
        <div className="loan-details-table overflow-x-auto mb-6">
            <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full leading-normal">
                    <thead className="bg-gray-700 text-white sticky top-0">
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                                Month
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                                EMI (₹)
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                                Interest Payment (₹)
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                                Principal Payment (₹)
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                                Outstanding Principal (₹)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-gray-50">
                        {rows.map((row) => (
                            <tr key={row.month}>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">{row.month}</td>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{row.emi}</td>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{row.interestPayment}</td>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{row.principalPayment}</td>
                                <td className="px-5 py-5 border-b border-gray-700 text-sm">₹{row.outstandingPrincipal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LoanDetailsTable;
