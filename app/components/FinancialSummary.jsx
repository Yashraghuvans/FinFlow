import React, { useMemo } from 'react';
import { calculateCumulativeDisbursement, calculatePreEMI, calculateFullEMI, getLoanPhase } from '../lib/financials';

function FinancialSummary({ project }) {
  const summary = useMemo(() => {
    if (!project) return null;
    const phase = getLoanPhase(project);
    const cumulative = calculateCumulativeDisbursement(project);
    const preEmi = calculatePreEMI(cumulative, project.annualInterestRate);
    const fullEmi = calculateFullEMI(project.sanctionedLoanAmount, project.annualInterestRate, project.loanTenureYears);
    const nextPaymentLabel = phase === 'Pre-EMI' ? 'Pre-EMI Due' : 'EMI Due';
    const nextPaymentAmount = phase === 'Pre-EMI' ? preEmi : fullEmi;
    return { phase, cumulative, preEmi, fullEmi, nextPaymentLabel, nextPaymentAmount };
  }, [project]);

  if (!project) {
    return (
      <div className="emi-calculator">
        <h2 className="text-lg font-semibold mb-4 text-white">Financial Summary</h2>
        <p className="text-gray-400">No project configured.</p>
      </div>
    );
  }

  return (
    <div className="emi-calculator">
      <h2 className="text-lg font-semibold mb-4 text-white">Financial Summary</h2>
      <div className="text-gray-200">
        <div className="emi-result mt-4 p-4 bg-green-700 bg-opacity-75 rounded-md">
          <table className="min-w-full leading-normal">
            <tbody>
              <tr>
                <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Loan Phase</td>
                <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">{summary?.phase}</td>
              </tr>
              <tr>
                <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Cumulative Bank Disbursement</td>
                <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">₹{summary?.cumulative?.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Current Pre-EMI (monthly)</td>
                <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">₹{summary?.preEmi?.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Full EMI (monthly)</td>
                <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">₹{summary?.fullEmi?.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">{summary?.nextPaymentLabel}</td>
                <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">₹{summary?.nextPaymentAmount?.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FinancialSummary;


