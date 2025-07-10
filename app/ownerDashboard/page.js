"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EMICalculator from '../components/EMICalculator';
import EMIOutstandingGraph from '../components/EMIOutstandingGraph';
import LoanDataTable from '../components/LoanDataTable';
import LoanInputForm from '../components/LoanInputForm';
import NavBar from '../components/NavBar';
import LoanSavingsPieChart from '../components/LoanSavingsPieChart';
import EMIWithPrepaymentGraph from '../components/EMIWithPrepaymentGraph';
import LoanDetailsTable from '../components/LoanDetailsTable';

function HomePage() {
    const searchParams = useSearchParams();
    const [loanData, setLoanData] = useState([]);
    const [calculatedEMI, setCalculatedEMI] = useState(null);
    const [currentLoanParams, setCurrentLoanParams] = useState(null);

    useEffect(() => {
        const loanDataParam = searchParams.get('loanData');
        if (loanDataParam) {
            setLoanData(JSON.parse(loanDataParam));
        }
    }, [searchParams]);

    const addLoan = (newLoan) => {
        setLoanData([...loanData, newLoan]);
    };

    const handleCalculateEMI = (loanParams) => {
        setCurrentLoanParams(loanParams);
    };

    const handleRecalculate = (loan) => {
        setCurrentLoanParams(loan);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col">
            <NavBar />
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="w-full bg-gray-950/80 border-b border-gray-800 shadow flex items-center px-6 py-4 sticky z-20" style={{marginTop: '64px'}}>
                    <span className="text-2xl font-bold text-white tracking-tight">Owner's Dashboard</span>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-br from-gray-900/80 to-black/90">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col">
                            <h2 className="text-lg font-semibold mb-4 text-white">Add New Loan</h2>
                            <LoanInputForm onLoanSubmit={addLoan} onCalculateEMI={handleCalculateEMI} />
                        </div>
                        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
                            <h2 className="text-lg font-semibold mb-4 text-white">EMI Calculator</h2>
                            <EMICalculator loanParams={currentLoanParams} setCalculatedEMI={setCalculatedEMI} />
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold mb-4 text-white">Loan Savings Overview</h2>
                                {currentLoanParams && <LoanSavingsPieChart loanParams={currentLoanParams} />}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 overflow-x-auto">
                                <h2 className="text-lg font-semibold mb-4 text-white">All Loans</h2>
                                <LoanDataTable loans={loanData} onRecalculate={handleRecalculate} />
                            </div>
                            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 h-[350px] flex flex-col">
                                <h2 className="text-lg font-semibold mb-4 text-white">EMI With Prepayment Graph</h2>
                                <EMIWithPrepaymentGraph loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
                                <h2 className="text-lg font-semibold mb-4 text-white">Loan Details</h2>
                                <LoanDetailsTable loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
                            </div>
                            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 h-[350px] flex flex-col">
                                <h2 className="text-lg font-semibold mb-4 text-white">EMI Outstanding Graph</h2>
                                <EMIOutstandingGraph loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function HomePageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
        </Suspense>
    );
}

export default HomePageWrapper;