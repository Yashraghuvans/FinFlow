import React, { useEffect, useState } from 'react';

function EMICalculator({ loanParams, setCalculatedEMI }) {
    const [emiValue, setEmiValue] = useState(null);
    const [emiWithPrePayment, setEmiWithPrePayment] = useState(null);
    const [processingFees, setProcessingFees] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);

    const bankFees = {
        SBI: { percentage: 0.35, max: 10000 },
        HDFC: { percentage: 0.50, min: 3000 },
        Axis: { percentage: 1, min: 10000 },
        ICICI: { percentage: 1 },
        PNB: { percentage: 0.35, min: 2500, max: 15000, docCharges: 1350 },
        LIC: { percentage: 1 },
        Citibank: { percentage: 0.40 },
    };

    useEffect(() => {
        if (loanParams) {
            const { principalAmount, annualInterestRate, loanTenureYears, prePayment = 0, bankName } = loanParams;

            if (principalAmount && annualInterestRate && loanTenureYears && bankName) {
                const monthlyInterestRate = annualInterestRate / 12 / 100;
                const numberOfMonths = loanTenureYears * 12;

                const emi =
                    (principalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
                    (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

                const newPrincipalAmount = principalAmount - prePayment;
                const emiWithPrePayment =
                    (newPrincipalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
                    (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

                let fee = 0;
                const bankData = bankFees[bankName];

                if (bankData) {
                    fee = (principalAmount * bankData.percentage) / 100;

                    if (bankData.max && fee > bankData.max) {
                        fee = bankData.max;
                    }
                    if (bankData.min && fee < bankData.min) {
                        fee = bankData.min;
                    }

                    if (bankData.docCharges) {
                        fee += bankData.docCharges;
                    }
                }
                setProcessingFees(fee);

                const totalEmi = emi + (fee / numberOfMonths);
                const totalEmiWithPrePayment = emiWithPrePayment + (fee / numberOfMonths);

                setEmiValue(totalEmi.toFixed(2));
                setEmiWithPrePayment(totalEmiWithPrePayment.toFixed(2));
                setCalculatedEMI(totalEmi.toFixed(2));

                const monthlySavings = totalEmi - totalEmiWithPrePayment;
                const totalSavings = monthlySavings * numberOfMonths;

                setMonthlySavings(monthlySavings.toFixed(2));
                setTotalSavings(totalSavings.toFixed(2));
            } else {
                setEmiValue(null);
                setEmiWithPrePayment(null);
                setCalculatedEMI(null);
                setProcessingFees(0);
                setMonthlySavings(0);
                setTotalSavings(0);
            }
        } else {
            setEmiValue(null);
            setEmiWithPrePayment(null);
            setCalculatedEMI(null);
            setProcessingFees(0);
            setMonthlySavings(0);
            setTotalSavings(0);
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
                    <p className="mb-2">Pre Payment: <span className="font-semibold text-white">₹{loanParams.prePayment ? loanParams.prePayment.toFixed(2) : 'N/A'} </span></p>
                    <p className="mb-2">Bank Fees: <span className="font-semibold text-white">₹{processingFees ? processingFees.toFixed(2) : 'N/A'}</span></p>
                    {emiValue !== null && emiWithPrePayment !== null ? (
                        <div className="emi-result mt-4 p-4 bg-green-700 bg-opacity-75 rounded-md">
                            <h3 className="text-xl font-bold text-white">Calculated EMI: <span className="text-white text-2xl">₹{emiValue}</span></h3>
                            <h3 className="text-xl font-bold text-white">EMI with Pre Payment: <span className="text-white text-2xl">₹{emiWithPrePayment}</span></h3>
                            <h3 className="text-xl font-bold text-white">Monthly Savings: <span className="text-white text-2xl">₹{monthlySavings}</span></h3>
                            <h3 className="text-xl font-bold text-white">Total Savings: <span className="text-white text-2xl">₹{totalSavings}</span></h3>
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