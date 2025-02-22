import React, { useEffect, useState } from 'react';


function EMICalculator({ loanParams, setCalculatedEMI }) {
    const [emiValue, setEmiValue] = useState(null);
    const [emiWithPrePayment, setEmiWithPrePayment] = useState(null);
    const [processingFees, setProcessingFees] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [totalInterestPaid, setTotalInterestPaid] = useState(0);
    const [nextPaymentDue, setNextPaymentDue] = useState(null);

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

                const totalSavings = (totalEmi - totalEmiWithPrePayment) * numberOfMonths;

                setTotalSavings(totalSavings.toFixed(2));

                let totalInterest = 0;
                let outstandingPrincipal = principalAmount;

                for (let month = 1; month <= numberOfMonths; month++) {
                    const interestPayment = outstandingPrincipal * monthlyInterestRate;
                    const principalPayment = emi - interestPayment;
                    outstandingPrincipal -= principalPayment;
                    totalInterest += interestPayment;
                }

                setTotalInterestPaid(totalInterest.toFixed(2));

                const nextPaymentDate = new Date();
                nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
                setNextPaymentDue({
                    date: nextPaymentDate.toLocaleDateString(),
                    amount: emi.toFixed(2),
                });
            } else {
                setEmiValue(null);
                setEmiWithPrePayment(null);
                setCalculatedEMI(null);
                setProcessingFees(0);
                setTotalSavings(0);
                setTotalInterestPaid(0);
                setNextPaymentDue(null);
            }
        } else {
            setEmiValue(null);
            setEmiWithPrePayment(null);
            setCalculatedEMI(null);
            setProcessingFees(0);
            setTotalSavings(0);
            setTotalInterestPaid(0);
            setNextPaymentDue(null);
        }
    }, [loanParams, setCalculatedEMI]);

    return (
        <div className="emi-calculator">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Details</h2>
            {loanParams ? (
                <div className="text-gray-200">
                    <p className="mb-2">Principal Amount: <span className="font-semibold text-white">₹{loanParams.principalAmount ? loanParams.principalAmount.toFixed(2) : 'N/A'}</span></p>
                    <p className="mb-2">Interest Rate: <span className="font-semibold text-white">{loanParams.annualInterestRate ? loanParams.annualInterestRate.toFixed(2) : 'N/A'}%</span></p>
                    <p className="mb-2">Loan Tenure: <span className="font-semibold text-white">{loanParams.loanTenureYears ? loanParams.loanTenureYears.toFixed(2) : 'N/A'} Years</span></p>
                    <p className="mb-2">One-Time Prepayment: <span className="font-semibold text-white">₹{loanParams.prePayment ? loanParams.prePayment.toFixed(2) : 'N/A'} </span></p>
                    <p className="mb-2">Bank Fees: <span className="font-semibold text-white">₹{processingFees ? processingFees.toFixed(2) : 'N/A'}</span></p>
                    {emiValue !== null && emiWithPrePayment !== null ? (
                        <div className="emi-result mt-4 p-4 bg-green-700 bg-opacity-75 rounded-md">
                            <table className="min-w-full leading-normal">
                                <tbody>
                                    <tr>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Calculated EMI:</td>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">₹{emiValue}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">EMI with Pre Payment:</td>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">₹{emiWithPrePayment}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Total Savings:</td>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">₹{totalSavings}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Total Interest Paid:</td>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">₹{totalInterestPaid}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Next Payment Due:</td>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">₹{nextPaymentDue?.amount}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Next Payment Date:</td>
                                        <td className="px-5 py-3 border-b border-gray-600 text-left text-xs font-semibold uppercase tracking-wider">{nextPaymentDue?.date}</td>
                                    </tr>
                                </tbody>
                            </table>
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