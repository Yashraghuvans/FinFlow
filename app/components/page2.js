"use client"
import React, { useState } from 'react';

const Page2 = () => {
  const [principal, setPrincipal] = useState();
  const [rate, setRate] = useState();
  const [time, setTime] = useState();
  const [emi, setEmi] = useState();

  const calculate = () => {
    const monthlyRate = rate / 100 / 12;
    const totalMonths = time * 12;
    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    setEmi(emiValue.toFixed(2));
  };

  return (
    <div className='h-screen w-full bg-[#363e4d] flex items-center justify-center absolute text-black'>
      <div className='flex flex-col items-center justify-center h-screen w-full gap-10'>
        <input
          type='number'
          placeholder='Principal Amount'
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className='p-2 rounded-md'
        />
        <input
          type='number'
          placeholder='Interest Rate (%)'
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className='p-2 rounded-md'
        />
        <input
          type='number'
          placeholder='Time Period (years)'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className='p-2 rounded-md'
        />
        <button
          onClick={calculate}
          className='p-5 bg-gray-500 rounded-md text-[20px] text-white'
        >
          Calculate
        </button>
        {emi > 0 && (
          <div className='mt-4 text-white'>
            <h3 className='text-xl font-bold'>EMI: {emi}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page2;