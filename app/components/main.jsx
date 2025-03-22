"use client"
import Link from 'next/link'
import React from 'react'

const Main = () => {
    return (
        <>
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
                    <div className='flex justify-center items-center p-5'>
                        <Link href='/dashpage'>
                            <button className='bg-green-500 text-xl text-white p-3 rounded-lg'>Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='w-full h-screen bg-gray-700 flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center'>
                    <section className='flex flex-col p-4 justify-center items-center'>
                        <h1 className='text-6xl font-semibold text-center'><span className='text-8xl'>O</span>ur <span className='text-8xl'>V</span>ision</h1>
                        <p className='text-lg p-4 text-center'>
                            Our vision is to empower individuals and businesses with the financial clarity and control they need to achieve their goals. We strive to be the leading platform for seamless loan and payment management, transforming complex financial data into actionable insights.
                        </p>
                    </section>
                    <section className='flex flex-col p-4 justify-center items-center'>
                        <h1 className='text-6xl font-semibold text-center'><span className='text-8xl'>O</span>ur<span className='text-8xl'> P</span>urpose</h1>
                        <p className='text-lg p-4 text-center'>
                            Our mission is to provide you with a powerful tool to streamline and simplify your financial journey. This application allows you to effortlessly monitor loan disbursements, manage payments to builders, and track interest accruals in real-time. With customizable weekly or monthly reminders, you'll never miss an update, ensuring your financial records are always accurate. Visualize your financial landscape through insightful trends, outstanding balance reports, and interest growth charts. Our app empowers you to make informed decisions and optimize your payments for maximum financial efficiency.
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Main