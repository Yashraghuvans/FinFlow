"use client"
import React from 'react';
import EMICalculator from '../components/EMICalculator';
import EMIOutstandingGraph from '../components/EMIOutstandingGraph';
import LoanDataTable from '../components/LoanDataTable';
import LoanInputForm from '../components/LoanInputForm';
import NavBar from '../components/navbar';

export default function HomePage() {
    const [loanData, setLoanData] = React.useState([]);
    const [calculatedEMI, setCalculatedEMI] = React.useState(null);
    const [currentLoanParams, setCurrentLoanParams] = React.useState(null);

    const addLoan = (newLoan) => {
        setLoanData([...loanData, newLoan]);
    };

    const handleCalculateEMI = (loanParams) => {
        setCurrentLoanParams(loanParams);
    };
    

    return (
        <>
        <NavBar/>
            
            <div className="bg-gray-900 text-white min-h-screen py-24 px-4 sm:px-6 lg:px-8 ">
                <div className="container mx-auto max-w-7xl"> 
                    <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6"> 
                        <div className="bg-gray-800 rounded-lg shadow-md p-6">
                            <LoanInputForm onLoanSubmit={addLoan} onCalculateEMI={handleCalculateEMI} />
                        </div>
                        <div className="bg-gray-800 rounded-lg shadow-md p-6">
                            <EMICalculator loanParams={currentLoanParams} setCalculatedEMI={setCalculatedEMI} />
                        </div>
                        <div className="bg-gray-800 rounded-lg shadow-md p-6 lg:col-span-3" > 
                            <EMIOutstandingGraph loanParams={currentLoanParams} calculatedEMI={calculatedEMI} />
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Loan Data Table</h2>
                        <LoanDataTable loans={loanData} />
                    </div>
                </div>
            </div>
        </>
    );
}