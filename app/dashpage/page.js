import Link from 'next/link';
import React from 'react';
import NavBar from '../components/navbar';
const DashPage = () => {
    return (
        <div>
            <NavBar />
            <div className='flex flex-col min-h-screen w-full bg-gray-800 items-center justify-center'> 
                <div className='flex flex-col items-center justify-center py-16 px-4 w-full max-w-7xl'> 
                    <h1 className='text-white font-semibold text-2xl mb-4'>Choose Who You Are</h1>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24 w-full"> 
                        <div className='bg-gray-700 border-2 p-6 rounded-lg w-full max-w-[300px] h-auto md:h-[400px] flex flex-col justify-center items-center gap-4 hover:bg-gray-800 transition-colors duration-400'>
                            <h2 className='text-xl font-semibold'>Contractor</h2>
                            <img
                                src='https://png.pngtree.com/png-clipart/20190917/original/pngtree-construction-worker-cartoon-decorative-material-png-image_4601166.jpg'
                                alt="Contractor image"
                                className='max-h-[75%] w-auto'
                            />
                            <Link href="./contractorDashboard">
                                <button className='p-3 px-7 bg-green-500 text-white text-xl cursor-pointer rounded-xl hover:bg-green-600 transition-colors duration-500'>Click</button>
                            </Link>
                        </div>

                        <div className='bg-gray-700 border-2 p-6 rounded-lg w-full max-w-[300px] h-auto md:h-[400px] flex flex-col justify-center items-center gap-4 hover:bg-gray-800 transition-colors duration-400'>
                            <h2 className='text-xl font-semibold'>Owner</h2>
                            <img
                                src="https://i.pinimg.com/474x/50/77/2a/50772aefe8fef05f0b9a6e5c704049e0.jpg"
                                alt="Owner image"
                                className='max-h-[75%] w-auto'
                            />
                            <Link href="./ownerDashboard">
                                <button className='p-3 px-7 bg-green-500 text-white text-xl cursor-pointer rounded-xl hover:bg-green-600 transition-colors duration-500'>Click</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashPage;