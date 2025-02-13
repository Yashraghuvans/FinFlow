"use client";
import React from 'react';
import { IoLogoGoogle } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { TiVendorMicrosoft } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../components/navbar';
import Link from 'next/link';

const SignIn = () => {
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
            <div className='w-full min-h-screen flex flex-col lg:flex-row'> 
                <div className='w-full lg:w-[50%] bg-gray-600 text-white text-4xl sm:text-5xl md:text-6xl font-semibold flex items-center justify-center'>
                    <img src='favicon.ico' className='h-48 w-48 sm:h-72 sm:w-72 md:h-96 md:w-96 rounded-lg mix-blend-multiply' alt="Logo" /> 
                </div>

                <div className='w-full lg:w-[50%] bg-gray-900 p-4 sm:p-8 md:p-12 lg:p-36 flex items-center justify-center'>  
                    <div className='w-full max-w-md flex flex-col gap-4'> 
                        <input type='text' placeholder='Name' className='p-3 text-white bg-gray-900 border-b-2 border-white w-full' /> 
                        <input type='email' placeholder='Email' className='p-3 text-white bg-gray-900 border-b-2 border-white w-full' /> 
                        <input type='password' placeholder='Password' className='p-3 text-white bg-gray-900 border-b-2 border-white w-full' /> 
                        <Link href='/dashboard'>
                            <button className='text-white bg-green-500 p-3 w-full my-5 hover:bg-green-600 transition duration-600' onClick={notify}>Continue</button> 
                        </Link>
                        <h3 className='text-white text-xl text-center'>OR</h3>
                        <hr className='border-b-2 border-white' />
                        <div className='flex justify-center gap-5 text-white text-3xl'>
                            <div><IoLogoGoogle /></div>
                            <div><FaFacebook /></div>
                            <div><TiVendorMicrosoft /></div>
                            <div><FaXTwitter /></div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default SignIn;