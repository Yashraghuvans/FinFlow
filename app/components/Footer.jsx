import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-black py-10 px-4 text-gray-400 text-center'>
      <div className='container mx-auto'>
        <p className='text-sm sm:text-base'>&copy; {new Date().getFullYear()} Yash Raghuvanshi. All rights reserved.</p>
        <div className='flex justify-center space-x-6 mt-4'>
          <Link href='/about' className='hover:text-blue-400 transition-colors duration-200'>About</Link>
          <Link href='/signin' className='hover:text-blue-400 transition-colors duration-200'>Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
