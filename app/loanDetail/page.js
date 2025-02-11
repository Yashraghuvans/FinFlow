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
    const [bank, setbank] = useState("");
    const [downpay, setdownpay] = useState("");


    const handleClick = () => {
        if (!principal || !rate || !time || !bank || !downpay) {
            alert("Please fill in all fields.");
            return;
        } else {
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
            <div id='main' className='min-h-screen w-full flex flex-col lg:flex-row items-center justify-center relative text-black bg-black/70 backdrop-blur-sm px-4 md:px-0'> 
                <div className='w-full lg:w-[50%] flex flex-col gap-5 justify-center items-center text-2xl text-white py-8 lg:py-0'> 
                    <img src="favicon.ico" className='h-48 w-auto lg:h-[50%] lg:w-[60%] rounded-full mix-blend-multiply' alt="Logo" /> 
                </div>
                <div className='w-full lg:w-[50%] flex flex-col items-center justify-center py-8 lg:py-0 gap-4 lg:gap-10'> 
                    <h1 className='text-white text-2xl font-semibold border-b-2 border-white'>Kindly Enter Your Loan Details</h1>
                    <input
                        type='text'
                        placeholder='Bank Name'
                        value={bank}
                        onChange={(e) => setbank(e.target.value)}
                        className='p-2 rounded-md w-full' 
                        required
                    />
                    <input
                        type='text'
                        placeholder='Location'
                        className='p-2 rounded-md w-full'
                    />
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-5 w-full px-2'> 
                        <input
                            type='number'
                            placeholder='Down Payment'
                            value={downpay}
                            onChange={(e) => setdownpay(e.target.value)}
                            className='p-2 rounded-md w-full' 
                            required
                        />
                        <input
                            type='number'
                            placeholder='Principal Amount'
                            value={principal}
                            onChange={(e) => setPrincipal(e.target.value)}
                            className='p-2 rounded-md w-full'
                            required
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-5 w-full px-2'> 
                        <input
                            type='number'
                            placeholder='Interest Rate (%)'
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className='p-2 rounded-md w-full' 
                            required
                        />
                        <input
                            type='number'
                            placeholder='Time Period (years)'
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className='p-2 rounded-md w-full' 
                            required
                        />
                    </div>

                    <button onClick={handleClick} className='p-3 w-full sm:w-[55%] bg-green-600 rounded-md text-[20px] text-white hover:bg-green-700 transition duration-500'>
                        Calculate
                    </button>


                </div>

            </div>
            <ToastContainer />
        </>
    );
};

export default LoanDetail;