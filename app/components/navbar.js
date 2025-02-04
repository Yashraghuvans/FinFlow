"use client"
import Link from 'next/link';
import React from 'react';


const NavBar = () => {
  return (
    <div className='h-[145px] gap-[50px] w-full flex items-center px-[150px] justify-start fixed z-[99]'>
      <img src="favicon.ico" alt="FinFlow Logo" className='h-[75px] rounded-[50px]' />
      <h4 className='uppercase font-medium'>Home</h4>
      <h4 className='uppercase font-medium'>About</h4>
      <h4 className='uppercase font-medium'>
        <Link href='/loanDetail'>Features</Link>
      </h4>
      <h4 className='uppercase font-medium'>
      <Link href='/signin'>SignUp</Link>
      </h4>
    </div>
  );
};

export default NavBar;