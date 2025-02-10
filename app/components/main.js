"use client"
import React from 'react'

const Main = () => {
    return (
        <div id="main" className='relative bg-black/70'>
            <div className='min-h-screen w-full relative flex flex-col items-center justify-center text-center px-4 md:px-0'> 
                <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-[130px] font-extrabold backdrop-blur-sm leading-tight"> 
                    Track. Plan. Prosper
                </h1>
                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-[35px] font-extrabold mt-4 sm:mt-6 md:mt-8 lg:mt-[10px] mb-4 sm:mb-6 md:mb-8 lg:mb-[20px] backdrop-blur-sm'> 
                    Welcome to FinFlow
                </h2>
                <p className='text-base sm:text-lg md:text-xl lg:text-[20px] font-medium w-full sm:w-3/4 md:w-2/3 lg:w-[45%] backdrop-blur-sm'> 
                    FinFlow empowers homebuyers with a streamlined platform to track loan disbursements, payments, and interest, providing crucial insights and reminders to optimize their journey.
                </p>
            </div>
        </div>
    )
}

export default Main