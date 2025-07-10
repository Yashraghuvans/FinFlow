import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-black py-10 px-4 text-gray-400 text-center'>
      <div className='container mx-auto'>
        <p className='text-sm sm:text-base'>&copy; {new Date().getFullYear()} FinFlow. All rights reserved.</p>
        <div className='flex justify-center space-x-6 mt-4'>
          <Link href='/privacy' className='hover:text-blue-400 transition-colors duration-200'>Privacy Policy</Link>
          <Link href='/terms' className='hover:text-blue-400 transition-colors duration-200'>Terms of Service</Link>
          <Link href='/contact' className='hover:text-blue-400 transition-colors duration-200'>Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
