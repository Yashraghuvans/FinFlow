"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const LoanDetail = () => {
  const [principal, setPrincipal] = useState(""); 
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");

  const handleClick = () => {
      if (!principal || !rate || !time) {
          alert("Please fill in all fields.");
          return; 
      }
  };

  return (
    <div id='main' className='h-screen w-screen flex items-center justify-center absolute text-black'>
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

        <Link href={{
          pathname: '/page1',
          query: {
            principal: principal,
            rate: rate,
            time: time,
          },
        }}>
          <button onClick={handleClick} className='p-5 bg-green-600 rounded-md text-[20px] text-white hover:bg-green-700 transition duration-500'>
            Calculate
          </button>
        </Link>

      </div>
    </div>
  );
};

export default LoanDetail;