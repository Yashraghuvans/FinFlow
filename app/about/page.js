"use client";
import Link from 'next/link';
import React from 'react';
import NavBar from '../components/navbar';

const About = () => {
    const tech = [
        { name: 'C++', url: 'https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white' },
        { name: 'CSS3', url: 'https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white' },
        { name: 'HTML5', url: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white' },
        { name: 'JavaScript', url: 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E' },
        { name: 'TypeScript', url: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white' },
        { name: 'Vercel', url: 'https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white' },
        { name: 'React', url: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' },
        { name: 'GitHub Actions', url: 'https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white' },
        { name: 'GitHub', url: 'https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white' },
        { name: 'Git', url: 'https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white' },
    ];

    return (
        <>
            <NavBar />
            <div className="about-area pt-20 bg-black/70 min-h-screen w-full flex items-center justify-center relative text-white backdrop-blur-sm px-4 md:px-0">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex flex-col lg:flex-row flex-wrap justify-center">
                        <div className="w-full lg:w-8/12 px-4 text-white">
                            <div className="about-text pt-0 lg:pt-0 text-white text-center lg:text-left">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins">About Me</h2> <br />
                                <p className="font-ubuntu text-base sm:text-lg text-white">
                                    My name is Yash Raghuvanshi pursuing my 💻 CSE (A.I) degree at GL Bajaj Institute of Technology and Management🏫, where I learn the fundamentals and applications of artificial intelligence, data structures and algorithms, and 🚀 machine learning.<br /><br />
                                </p>
                                <h3 className="text-xl sm:text-2xl font-semibold">Skills :</h3>
                                <div className="flex flex-wrap justify-center ">
                                    {tech.map((item) => (
                                        <img
                                            key={item.name}
                                            src={item.url}
                                            alt={item.name}
                                            className="mr-2 mb-2 h-8 w-auto sm:h-10"
                                        />
                                    ))}
                                </div>
                                
                                
                                <hr className='border-b-2 border-white m-5' />
                                <div className="flex justify-center lg:justify-center gap-6 text-xl sm:text-2xl font-semibold">
                                    <Link href="https://www.linkedin.com/in/yash-raghuvanshi-a14361287">
                                        <button className='bg-blue-500 p-3 hover:bg-blue-600 transition duration-500 '>Linkedin</button>
                                    </Link>
                                    <Link href="https://github.com/Yashraghuvans">
                                    <button className='bg-black/50 p-3 hover:bg-black/80 transition duration-500 '>GitHub</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;