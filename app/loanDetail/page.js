//loan detail page
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import NavBar from '../components/navbar';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoanDetail = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [bank, setbank] = useState("")
  const [downpay, setdownpay] = useState("")


  const handleClick = () => {
    if (!principal || !rate || !time || !bank || !downpay) {
      alert("Please fill in all fields.");
      return;
    }
    else{
      notify();
    }
  };

  const notify = () => toast.success('Complete !', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  return (
    <>
      <NavBar />
      <div id='main' className='h-screen w-screen flex items-center justify-center absolute text-black bg-black/70 backdrop-blur-sm' >
        <div className='h-screen w-[80%] text-white flex flex-col gap-5 justify-center items-center text-2xl'>
          
          <img src="favicon.ico" className='h-[50%] w-[60%] rounded-full mix-blend-multiply' />
        </div>
        <div className='flex flex-col items-center justify-center h-screen w-full gap-10 '>
          <h1 className='text-white text-2xl font-semibold border-b-2 border-white'>Kindly Enter Your Loan Details</h1>
          <input
            type='text'
            placeholder='Bank Name'
            value={bank}
            onChange={(e) => setbank(e.target.value)}
            className='p-2 rounded-md'
            required
          />
          <input
              type='text'
              placeholder='Location'
              className='p-2 rounded-md'
            />
          <div className='flex flex-row gap-5'>
            
            <input
              type='number'
              placeholder='Down Payment'
              value={downpay}
              onChange={(e) => setdownpay(e.target.value)}
              className='p-2 rounded-md'
              required
            />
            <input
              type='number'
              placeholder='Principal Amount'
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className='p-2 rounded-md'
              required
            />
          </div>
          <div className='flex flex-row gap-5'>
            
            <input
              type='number'
              placeholder='Interest Rate (%)'
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className='p-2 rounded-md'
              required
            />
            <input
              type='number'
              placeholder='Time Period (years)'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className='p-2 rounded-md'
              required
            />
          </div>

          <button onClick={handleClick}className='p-3 w-[55%] bg-green-600 rounded-md text-[20px] text-white hover:bg-green-700 transition duration-500'>
            Calculate
          </button>


        </div>

      </div>
      <ToastContainer />
    </>
  );
};

export default LoanDetail;