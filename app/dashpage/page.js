import Link from 'next/link';
import React from 'react';
import NavBar from '../components/navbar';
import Image from 'next/image';
const DashPage = () => {
    return (
        <div>
            <NavBar />
            <div className='flex h-screen w-full bg-gray-800 items-center justify-center'>
                <div className='flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center py-8 md:py-16 px-4 w-full max-w-7xl pt-16 md:pt-32'>
                    <section>
                        <div className="relative flex w-full max-w-xs flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div className="relative mx-4 -mt-6 h-32 md:h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                                <Image
                                    height={64}
                                    width={64}
                                    src="/img2.png"
                                    alt="Owner image"
                                    className='h-full w-full object-cover'
                                />
                            </div>
                            <div className="p-4 md:p-6">
                                <h5 className="mb-2 block font-sans text-lg md:text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                    Contractor
                                </h5>
                                <p className="block font-sans text-sm md:text-base font-light leading-relaxed text-inherit antialiased">
                                    Consist of all the analytics you need as a contractor.
                                </p>
                            </div>
                            <div className="p-4 md:p-6 pt-0">
                                <Link href="./contractorDashboard">
                                    <button data-ripple-light="true" type="button" className="select-none rounded-lg bg-blue-500 py-2 md:py-3 px-4 md:px-6 text-center align-middle font-sans text-xs md:text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                        Click
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="relative flex w-full max-w-xs flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div className="relative mx-4 -mt-6 h-32 md:h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                                <Image
                                    height={64}
                                    width={64}
                                    src="/img1.png"
                                    alt="Owner image"
                                    className='h-full w-full object-cover'
                                />
                            </div>
                            <div className="p-4 md:p-6">
                                <h5 className="mb-2 block font-sans text-lg md:text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                    Owner
                                </h5>
                                <p className="block font-sans text-sm md:text-base font-light leading-relaxed text-inherit antialiased">
                                Consist of all the analytics you need as a owner.
                                </p>
                            </div>
                            <div className="p-4 md:p-6 pt-0">
                                <Link href="./ownerDashboard">
                                    <button data-ripple-light="true" type="button" className="select-none rounded-lg bg-blue-500 py-2 md:py-3 px-4 md:px-6 text-center align-middle font-sans text-xs md:text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                        Click
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DashPage;