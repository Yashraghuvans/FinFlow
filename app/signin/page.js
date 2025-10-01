"use client";
import React, { useState } from 'react';
import { IoLogoGoogle } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../components/navbar';
import Link from 'next/link';
import Image from 'next/image';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const notify = () => toast.success('Signed in successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });

    async function handleSignIn(e) {
        e.preventDefault();
        const lower = (username || '').toLowerCase();
        if (lower === 'owner' && password === 'owner') {
            localStorage.setItem('finflow_auth', JSON.stringify({ user: 'owner', role: 'OWNER' }));
            const { seedDummyProject } = await import('../lib/api/projectTrackerApi');
            await seedDummyProject();
            notify();
            window.location.href = '/ownerDashboard';
        } else if (lower === 'contractor' && password === 'contractor') {
            localStorage.setItem('finflow_auth', JSON.stringify({ user: 'contractor', role: 'CONTRACTOR' }));
            const { seedDummyProject } = await import('../lib/api/projectTrackerApi');
            await seedDummyProject();
            notify();
            window.location.href = '/contractorDashboard';
        } else {
            toast.error('Invalid credentials', { position: 'top-center', theme: 'dark' });
        }
    }

    function quickFill(role) {
        if (role === 'OWNER') {
            setUsername('owner');
            setPassword('owner');
        } else if (role === 'CONTRACTOR') {
            setUsername('contractor');
            setPassword('contractor');
        }
    }

    return (
        <>
            <NavBar />
            <div
                className="w-full min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-950 to-black text-white"
                style={{ paddingTop: '64px' }}
            >
                <div className="relative w-full lg:w-1/2 flex items-center justify-center px-4 py-8 lg:px-12 lg:py-0">
                    <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    </div>
                    <div className="relative z-10 text-center flex flex-col items-center">
                        <Image
                            src='/favicon.ico'
                            alt="FinFlow Logo"
                            width={140}
                            height={140}
                            className='rounded-full shadow-2xl mb-4 md:mb-6 transform transition-transform duration-500 hover:scale-105'
                        />
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Welcome to FinFlow
                        </h1>
                        <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-300 max-w-md">
                            Your trusted platform for crystal-clear home loan insights.
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 sm:px-6 md:px-10 lg:px-16">
                    <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700 flex flex-col gap-5">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-white">Sign In</h2>
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div className="relative">
                                <input
                                    type='text'
                                    placeholder='Username'
                                    className='peer p-4 w-full bg-transparent border-b-2 border-primary-600 focus:border-purple-500 outline-none text-white text-base md:text-lg transition-all duration-300'
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type='password'
                                    placeholder='Password'
                                    className='peer p-4 w-full bg-transparent border-b-2 border-primary-600 focus:border-purple-500 outline-none text-white text-base md:text-lg transition-all duration-300'
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className='relative inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group overflow-hidden'
                                type="submit"
                            >
                                Sign In
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </button>
                        </form>
                        <div className="p-4 bg-slate-800/70 rounded-lg border border-slate-700">
                            <div className="text-sm text-gray-300 mb-3">Demo credentials</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-400 mb-3">
                                <div className="space-y-1">
                                    <div className="text-gray-300">Owner</div>
                                    <div>Username: <span className="text-white">owner</span></div>
                                    <div>Password: <span className="text-white">owner</span></div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-gray-300">Contractor</div>
                                    <div>Username: <span className="text-white">contractor</span></div>
                                    <div>Password: <span className="text-white">contractor</span></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button type="button" onClick={() => quickFill('OWNER')} className="btn btn-secondary">Fill Owner</button>
                                <button type="button" onClick={() => quickFill('CONTRACTOR')} className="btn btn-secondary">Fill Contractor</button>
                            </div>
                        </div>
                        <div className='flex items-center my-2'>
                            <hr className='flex-grow border-t border-gray-700' />
                            <span className='px-3 text-gray-400 text-base'>Or continue with</span>
                            <hr className='flex-grow border-t border-gray-700' />
                        </div>
                        <div className='flex justify-center gap-3 text-white text-2xl md:text-3xl mt-1'>
                            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300 shadow-md">
                                <IoLogoGoogle />
                            </button>
                            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300 shadow-md">
                                <FaFacebookF />
                            </button>
                            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300 shadow-md">
                                <FaMicrosoft />
                            </button>
                            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300 shadow-md">
                                <FaXTwitter />
                            </button>
                        </div>
                        <p className="text-center text-gray-400 text-sm mt-4">
                            Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Log In</Link>
                        </p>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default SignIn;