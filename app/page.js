import React from 'react';

const Main = () => {
  return (
    <>
      <div className='h-[145px] gap-[50px] w-full flex items-center px-[150px] justify-start fixed z-[99]'>
        <img src="favicon.ico" alt="FinFlow Logo" className='h-[75px] rounded-[50px]' /> 
        <h4 className='uppercase font-medium'>Home</h4>
        <h4 className='uppercase font-medium'>About</h4>
        <h4 className='uppercase font-medium'>Features</h4>
        <h4 className='uppercase font-medium'>Login</h4>
      </div>
      <div id="main" className='relative bg-black/70 '>
        <div className='h-screen w-full relative flex flex-col items-center justify-center text-center '>
          <h1 className="relative text-[130px] font-extrabold backdrop-blur-sm "> 
            Track. Plan. Prosper
          </h1>
          <h2 className='text-[35px] font-extrabold mt-[10px] mb-[20px] backdrop-blur-sm'>Welcome to FinFlow</h2>
          <p className='text-[20px] font-medium w-[45%] backdrop-blur-sm'>FinFlow empowers homebuyers with a streamlined platform to track loan disbursements, payments, and interest, providing crucial insights and reminders to optimize their journey.</p>
        </div>
        
      </div>
    </>
  );
};

export default Main;