"use client"
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full z-[99] bg-black/80 backdrop-blur-sm'> 
      <div className='container mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between'> 
        <Link href="/" className="flex items-center"> 
          <img src="favicon.ico" alt="FinFlow Logo" className='h-12 w-12 rounded-full' /> 
          
        </Link>
        <div className='flex space-x-4 md:space-x-6 lg:space-x-8'>
          <Link href="/" className='text-base md:text-lg font-medium uppercase hover:text-blue-500 transition'> 
            Home
          </Link>
          <Link href="/about" className='text-base md:text-lg font-medium uppercase hover:text-blue-500 transition'>
            About
          </Link>
          <Link href='/loanDetail' className='text-base md:text-lg font-medium uppercase hover:text-blue-500 transition'>
            Features
          </Link>
          <Link href='/signin' className='text-base md:text-lg font-medium uppercase hover:text-blue-500 transition'>
            SignUp
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;