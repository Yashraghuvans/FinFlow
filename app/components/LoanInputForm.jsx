import React, { useState } from 'react';

function LoanInputForm({ onLoanSubmit, onCalculateEMI }) {
    const [bankName, setBankName] = useState('');
    const [location, setLocation] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [interest, setInterest] = useState('');
    const [principal, setPrincipal] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [prePayment, setprePayment] = useState('');
    const bankNames = ['SBI', 'HDFC', 'Axis', 'ICICI', 'PNB', 'LIC', 'Citibank', 'Others'];

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLoan = {
            bankName,
            location,
            timePeriod: parseFloat(timePeriod),
            interest: parseFloat(interest),
            principal: parseFloat(principal),
            downPayment: parseFloat(downPayment),
            prePayment: parseFloat(prePayment),
        };
        onLoanSubmit(newLoan);
        setBankName('');
        setLocation('');
        setTimePeriod('');
        setInterest('');
        setPrincipal('');
        setDownPayment('');
        setprePayment('');
    };

    const handleCalculateClick = (e) => {
        e.preventDefault();

        const loanParams = {
            principalAmount: parseFloat(principal) - parseFloat(downPayment || 0),
            annualInterestRate: parseFloat(interest),
            loanTenureYears: parseFloat(timePeriod),
            prePayment: parseFloat(prePayment || 0),
            bankName: bankName,
        };
        onCalculateEMI(loanParams);
    };

    return (
        <div className="loan-input-form">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Enter Loan Details</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="bankName" className="block text-gray-300 text-sm font-bold mb-2">Bank Name:</label>
                <select
                    id="bankName"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select Bank</option> 
                    {bankNames.map((bank) => (
                        <option key={bank} value={bank}>
                            {bank}
                        </option>
                    ))}
                </select>
            </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-300 text-sm font-bold mb-2">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Location"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="timePeriod" className="block text-gray-300 text-sm font-bold mb-2">Time Period (Years):</label>
                    <input
                        type="number"
                        id="timePeriod"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Time Period"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="interest" className="block text-gray-300 text-sm font-bold mb-2">Interest Rate (%):</label>
                    <input
                        type="number"
                        id="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Interest Rate"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="principal" className="block text-gray-300 text-sm font-bold mb-2">Principal Amount:</label>
                    <input
                        type="number"
                        id="principal"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Principal Amount"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="downPayment" className="block text-gray-300 text-sm font-bold mb-2">Down Payment:</label>
                    <input
                        type="number"
                        id="downPayment"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Down Payment"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="downPayment" className="block text-gray-300 text-sm font-bold mb-2">Pre Payment:</label>
                    <input
                        type="number"
                        id="prePayment"
                        value={prePayment}
                        onChange={(e) => setprePayment(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Pre Payment"
                    />
                </div>

                <div className="flex justify-start mt-6">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                        Add Loan
                    </button>
                    <button type="button" onClick={handleCalculateClick} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Calculate EMI
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoanInputForm;