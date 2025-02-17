import React, { useEffect, useState } from 'react';

function EMICalculator({ loanParams, setCalculatedEMI }) {
    const [emiValue, setEmiValue] = useState(null);

    useEffect(() => {
        if (loanParams) {
            const { principalAmount, annualInterestRate, loanTenureYears, prePayment } = loanParams;

            if (principalAmount && annualInterestRate && loanTenureYears && prePayment) {
                const monthlyInterestRate = annualInterestRate / 12 / 100;
                const numberOfMonths = loanTenureYears * 12;

                const emi =
                    (principalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
                    (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

                setEmiValue(emi.toFixed(2));
                setCalculatedEMI(emi.toFixed(2));
            } else {
                setEmiValue(null);
                setCalculatedEMI(null);
            }
        } else {
            setEmiValue(null);
            setCalculatedEMI(null);
        }
    }, [loanParams, setCalculatedEMI]);

    return (
        <div className="emi-calculator">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">EMI Calculator</h2>
            {loanParams ? (
                <div className="text-gray-200">
                    <p className="mb-2">Principal Amount: <span className="font-semibold text-white">₹{loanParams.principalAmount ? loanParams.principalAmount.toFixed(2) : 'N/A'}</span></p>
                    <p className="mb-2">Interest Rate: <span className="font-semibold text-white">{loanParams.annualInterestRate ? loanParams.annualInterestRate.toFixed(2) : 'N/A'}%</span></p>
                    <p className="mb-2">Loan Tenure: <span className="font-semibold text-white">{loanParams.loanTenureYears ? loanParams.loanTenureYears.toFixed(2) : 'N/A'} Years</span></p>
                    <p className="mb-2">Pre Payment: <span className="font-semibold text-white">{loanParams.prePayment ? loanParams.prePayment.toFixed(2) : 'N/A'} </span></p>
                    {emiValue !== null ? (
                        <div className="emi-result mt-4 p-4 bg-green-700 bg-opacity-75 rounded-md">
                            <h3 className="text-xl font-bold text-white">Calculated EMI: <span className="text-white text-2xl">₹{emiValue}</span></h3>
                        </div>
                    ) : (
                        <p className="text-gray-400">Enter loan details to calculate EMI.</p>
                    )}
                </div>
            ) : (
                <p className="text-gray-400">Enter loan parameters for calculation.</p>
            )}
        </div>
    );
}

export default EMICalculator;