"use client"
import React from 'react'
import { IoLogoGoogle } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { TiVendorMicrosoft } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn= () => {
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
    <div className='w-full  h-full flex '>
      <div className='h-full w-[50%] bg-gray-600  text-white text-[40px] font-semibold '>
        <img src='favicon.ico' className='absolute top-[125%] left-[10%] h-96 w-96 rounded-lg mix-blend-multiply' />
      </div>


      <div className='h-full w-[50%] bg-gray-900 p-36 '>
        <div className='flex flex-col gap-4 '>
          <input type='text' placeholder='Name' className='p-3 text-white bg-gray-900 border-b-2 border-white' />
          <input type='email' placeholder='Email' className='p-3  text-white bg-gray-900 border-b-2 border-white' />
          <input type='password' placeholder='Password' className='p-3  text-white bg-gray-900 border-b-2 border-white' />
          <button className='text-white bg-green-400 p-3  my-5 hover:bg-green-500' onClick={notify}>Continue</button>
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
  )
}

export default SignIn