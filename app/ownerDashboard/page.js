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
        <>
            <NavBar />

            <div className="bg-gray-900 text-white min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8"> 
                <div className="container mx-auto max-w-7xl">
                    <h1 className="text-3xl font-bold mb-6 text-center z-[99]">Owners Dashboard</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6"> 
                        <div className="bg-gray-800 rounded-lg shadow-md p-6">
                            <LoanInputForm onLoanSubmit={addLoan} onCalculateEMI={handleCalculateEMI} />
                        </div>
                        <div className="bg-gray-800 rounded-lg shadow-md p-6">
                            <EMICalculator loanParams={currentLoanParams} setCalculatedEMI={setCalculatedEMI} />
                            {currentLoanParams && <LoanSavingsPieChart loanParams={currentLoanParams} />}
                        </div>
                        <div className="bg-gray-800 rounded-lg shadow-md p-8 sm:col-span-2 h-[300px] pt-11">
                            <EMIOutstandingGraph loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
                        </div>
                        <div className="bg-gray-800 rounded-lg shadow-md p-8 sm:col-span-2 h-[300px] pt-11">
                            <EMIWithPrepaymentGraph loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Loan Details Table</h2>
                        <LoanDetailsTable loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Loan Data Table</h2>
                        <LoanDataTable loans={loanData} onRecalculate={handleRecalculate} />
                    </div>
                </div>
            </div>
        </>
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