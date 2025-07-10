"use client";
import Link from 'next/link';
import React from 'react';
import NavBar from '../components/NavBar';

const About = () => {
    return (
        <>
            <NavBar />
            <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 to-black text-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="container mx-auto max-w-5xl bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden relative z-10 p-8 md:p-12 border border-gray-700">
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <div className="w-full lg:w-4/12 flex justify-center lg:justify-start">
                        </div>
                        <div className="w-full lg:w-8/12 text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                About Me
                            </h1>
                            <p className="font-light text-lg sm:text-xl leading-relaxed mb-8 text-gray-300">
                                I'm <strong className="font-semibold text-white">Yash Raghuvanshi</strong>, an <strong className="font-semibold text-white">iOS</strong> and <strong className="font-semibold text-white">Full-Stack Developer</strong> driven by purpose and curiosity. I specialize in building seamless mobile experiences with <strong className="font-semibold text-white">SwiftUI</strong> and scalable web apps with <strong className="font-semibold text-white">React</strong>, <strong className="font-semibold text-white">Next.js</strong>, and <strong className="font-semibold text-white">Firebase</strong>. I'm also passionate about <strong className="font-semibold text-white">AI</strong> and <strong className="font-semibold text-white">automation</strong>, with ongoing work in <strong className="font-semibold text-white">Generative AI</strong>. My work blends creativity with code to build products that truly serve users.
                                <br /><br />
                                I'm currently exploring new opportunities and collaborations. If you're building something impactful or need a developer who blends design, logic, and modern tech—let's talk!
                            </p>
                            <div className="w-full border-t border-gray-700 pt-8 mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
                                <Link href="https://www.linkedin.com/in/yash-raghuvanshi-a14361287" passHref>
                                    <button className='flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl'>
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.3 0H3.7C1.65 0 0 1.65 0 3.7v12.6C0 18.35 1.65 20 3.7 20h12.6c2.05 0 3.7-1.65 3.7-3.7V3.7C20 1.65 18.35 0 16.3 0zM6 17H3V7h3v10zm-1.5-11.5c-.83 0-1.5-.67-1.5-1.5S3.67 3.5 4.5 3.5 6 4.17 6 5s-.67 1.5-1.5 1.5zM17 17h-3v-5.5c0-1.38-.56-2.32-1.81-2.32-1.32 0-2.09.89-2.44 1.74-.13.31-.1.74-.1 1.17V17H8V7h3v1c.5-.78 1.48-1.81 3.3-1.81 2.38 0 4.2 1.57 4.2 4.95V17z"/></svg>
                                        LinkedIn
                                    </button>
                                </Link>
                                <Link href="https://github.com/Yashraghuvans" passHref>
                                    <button className='flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl'>
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.419 2.865 8.165 6.839 9.48.5.09.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.15-.111-1.458-.111-1.458.37-.253.027-.247.027-.247.407.028.62.417.62.417.362.619.95.44 1.18.336.037-.26.142-.44.258-.54-2.2-.25-4.507-1.1-4.507-4.85 0-1.07.382-1.944 1.012-2.628-.102-.25-.44-1.243.097-2.585 0 0 .825-.264 2.7-.97.79-.22 1.63-.33 2.47-.33.84 0 1.68.11 2.47.33 1.875.706 2.7.97 2.7.97.538 1.342.2 2.335.097 2.585.63.684 1.012 1.558 1.012 2.628 0 3.76-2.31 4.596-4.516 4.84.354.307.674.915.674 1.847 0 1.336-.012 2.414-.012 2.748 0 .267.18.577.688.48C17.135 18.16 20 14.419 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"/></svg>
                                        GitHub
                                    </button>
                                </Link>
                                <Link href="https://yashfolio-zeta.vercel.app/" passHref>
                                    <button className='flex items-center justify-center px-8 py-3 border border-purple-600 text-base font-medium rounded-md text-purple-300 bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl'>
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd"></path></svg>
                                        Portfolio
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;