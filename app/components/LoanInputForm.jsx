import React, { useState } from 'react';
import { ToastContainer, toast, Slide, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoanInputForm({ onLoanSubmit, onCalculateEMI }) {
    const [bankName, setBankName] = useState('');
    const [location, setLocation] = useState('');
    const [loanTenureYears, setLoanTenureYears] = useState('');
    const [annualInterestRate, setAnnualInterestRate] = useState('');
    const [principalAmount, setPrincipalAmount] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [prePayment, setPrePayment] = useState('');
    const bankNames = ['SBI', 'HDFC', 'Axis', 'ICICI', 'PNB', 'LIC', 'Citibank', 'Others'];
    const locations = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];

    const notify1 = () => toast.success('Complete!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
    });
    const notify2 = () => toast.success('Adding Data!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLoan = {
            bankName,
            location,
            loanTenureYears: parseFloat(loanTenureYears),
            annualInterestRate: parseFloat(annualInterestRate),
            principalAmount: parseFloat(principalAmount),
            downPayment: parseFloat(downPayment),
            prePayment: parseFloat(prePayment),
        };
        onLoanSubmit(newLoan);
        setBankName('');
        setLocation('');
        setLoanTenureYears('');
        setAnnualInterestRate('');
        setPrincipalAmount('');
        setDownPayment('');
        setPrePayment('');
    };

    const handleCalculateClick = (e) => {
        e.preventDefault();
        notify1();

        const loanParams = {
            principalAmount: parseFloat(principalAmount) - parseFloat(downPayment || 0),
            annualInterestRate: parseFloat(annualInterestRate),
            loanTenureYears: parseFloat(loanTenureYears),
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
                    <select
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Location</option>
                        {locations.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="loanTenureYears" className="block text-gray-300 text-sm font-bold mb-2">Loan Tenure (Years):</label>
                    <input
                        type="number"
                        id="loanTenureYears"
                        value={loanTenureYears}
                        onChange={(e) => setLoanTenureYears(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Loan Tenure"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="annualInterestRate" className="block text-gray-300 text-sm font-bold mb-2">Annual Interest Rate (%):</label>
                    <input
                        type="number"
                        id="annualInterestRate"
                        value={annualInterestRate}
                        onChange={(e) => setAnnualInterestRate(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Annual Interest Rate"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="principalAmount" className="block text-gray-300 text-sm font-bold mb-2">Principal Amount:</label>
                    <input
                        type="number"
                        id="principalAmount"
                        value={principalAmount}
                        onChange={(e) => setPrincipalAmount(e.target.value)}
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
                    <label htmlFor="prePayment" className="block text-gray-300 text-sm font-bold mb-2">One-Time Prepayment:</label>
                    <input
                        type="number"
                        id="prePayment"
                        value={prePayment}
                        onChange={(e) => setPrePayment(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="One-Time Prepayment"
                    />
                </div>

                <div className="flex justify-start mt-6">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4" onClick={notify2}>
                        Add
                    </button>
                    <button type="button" onClick={handleCalculateClick} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Calculate
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default LoanInputForm;