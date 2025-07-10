import Link from 'next/link';
import React from 'react';
import NavBar from '../components/NavBar';
import Image from 'next/image';

const DashPage = () => {
    return (
        <div>
            <NavBar />
            <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center pt-8 md:pt-16 lg:pt-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-12 text-center leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Select Your Dashboard
                    </h1>
                    <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24 items-center justify-center w-full">
                        {/* Contractor Card */}
                        <section className="group">
                            <div className="relative flex w-full max-w-xs flex-col rounded-xl bg-gray-800 border border-gray-700 text-gray-200 shadow-xl overflow-hidden
                                transition-all duration-300 ease-in-out transform
                                hover:scale-105 hover:shadow-2xl hover:border-purple-500">

                                <div className="relative mx-4 -mt-8 h-40 md:h-48 overflow-hidden rounded-lg bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-500/40 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center p-4">
                                    <Image
                                        height={120}
                                        width={120}
                                        src="/img2.png" 
                                        alt="Contractor Icon"
                                        className='object-contain transition-transform duration-300 group-hover:scale-110'
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h5 className="mb-3 font-sans text-xl md:text-2xl font-semibold leading-snug tracking-normal text-white antialiased">
                                        Contractor Dashboard
                                    </h5>
                                    <p className="font-sans text-base md:text-lg font-light leading-relaxed text-gray-400 antialiased">
                                        Access comprehensive analytics and tools tailored for contractors to manage projects efficiently.
                                    </p>
                                </div>
                                <div className="p-6 pt-0 text-center">
                                    <Link href="/contractorDashboard">
                                        <button
                                            data-ripple-light="true"
                                            type="button"
                                            className="select-none rounded-lg bg-purple-600 py-3 md:py-4 px-6 md:px-8 text-center align-middle font-sans text-sm md:text-base font-bold uppercase text-white shadow-md shadow-purple-500/20
                                            transition-all duration-300 ease-in-out
                                            hover:shadow-lg hover:shadow-purple-500/40 hover:bg-purple-700
                                            focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none
                                            disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        >
                                            View Dashboard
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </section>

                        {/* Owner Card */}
                        <section className="group">
                            <div className="relative flex w-full max-w-xs flex-col rounded-xl bg-gray-800 border border-gray-700 text-gray-200 shadow-xl overflow-hidden
                                transition-all duration-300 ease-in-out transform
                                hover:scale-105 hover:shadow-2xl hover:border-pink-500">

                                <div className="relative mx-4 -mt-8 h-40 md:h-48 overflow-hidden rounded-lg bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-500/40 bg-gradient-to-r from-teal-600 to-teal-800 flex items-center justify-center p-4">
                                    <Image
                                        height={120}
                                        width={120}
                                        src="/img1.png" 
                                        alt="Owner Icon"
                                        className='object-contain transition-transform duration-300 group-hover:scale-110'
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h5 className="mb-3 block font-sans text-xl md:text-2xl font-semibold leading-snug tracking-normal text-white antialiased">
                                        Owner Dashboard
                                    </h5>
                                    <p className="block font-sans text-base md:text-lg font-light leading-relaxed text-gray-400 antialiased">
                                        Gain insights and manage your properties with advanced analytics as an owner.
                                    </p>
                                </div>
                                <div className="p-6 pt-0 text-center">
                                    <Link href="/ownerDashboard">
                                        <button
                                            data-ripple-light="true"
                                            type="button"
                                            className="select-none rounded-lg bg-pink-600 py-3 md:py-4 px-6 md:px-8 text-center align-middle font-sans text-sm md:text-base font-bold uppercase text-white shadow-md shadow-pink-500/20
                                            transition-all duration-300 ease-in-out
                                            hover:shadow-lg hover:shadow-pink-500/40 hover:bg-pink-700
                                            focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none
                                            disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        >
                                            View Dashboard
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashPage;