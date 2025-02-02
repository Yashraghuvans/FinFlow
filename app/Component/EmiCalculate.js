import React, { useState } from 'react';
import NavBar from './NavBar';
import RootLayout from './layout';

const EmiCalculate = () => {
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [time, setTime] = useState(0);
  const [emi, setEmi] = useState(0);

  const calculate = () => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = time * 12;
    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    setEmi(emiValue.toFixed(2));
  };

  return (
    <RootLayout>
      <div>
        <NavBar />
        <div className="relative flex justify-center items-center h-full w-full bg-black bg-opacity-70"> 
          <div className="container w-1/2 bg-white bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-lg"> 
            <h2 className="text-2xl font-bold mb-4 text-white">EMI Calculator</h2> 
            <div className="mb-4">
              <label htmlFor="principal" className="block text-gray-700 font-bold mb-2 text-white">Principal Amount:</label>
              <input
                type="number"
                id="principal"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 text-black"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rate" className="block text-gray-700 font-bold mb-2 text-white">Interest Rate:</label>
              <input
                type="number"
                id="rate"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 text-black"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-gray-700 font-bold mb-2 text-white">Time (in years):</label>
              <input
                type="number"
                id="time"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 text-black"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <button
              onClick={calculate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Calculate
            </button>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white">EMI: {emi}</h3>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default EmiCalculate;