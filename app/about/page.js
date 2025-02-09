"use client";
import Link from 'next/link';
import React from 'react';
const About = () => {
    const tech = [
        { name: 'C', url: 'https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white' },
        { name: 'C++', url: 'https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white' },
        { name: 'CSS3', url: 'https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white' },
        { name: 'HTML5', url: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white' },
        { name: 'JavaScript', url: 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E' },
        { name: 'Java', url: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white' },
        { name: 'Python', url: 'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54' },
        { name: 'Swift', url: 'https://img.shields.io/badge/swift-F54A2A?style=for-the-badge&logo=swift&logoColor=white' },
        { name: 'TypeScript', url: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white' },
        { name: 'Windows Terminal', url: 'https://img.shields.io/badge/Windows%20Terminal-%234D4D4D.svg?style=for-the-badge&logo=windows-terminal&logoColor=white' },
        { name: 'Bash Script', url: 'https://img.shields.io/badge/bash_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white' },
        { name: 'Google Cloud', url: 'https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white' },
        { name: 'Vercel', url: 'https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white' },
        { name: 'Anaconda', url: 'https://img.shields.io/badge/Anaconda-%2344A833.svg?style=for-the-badge&logo=anaconda&logoColor=white' },
        { name: 'React', url: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' },
        { name: 'MySQL', url: 'https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white' },
        { name: 'Canva', url: 'https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white' },
        { name: 'Matplotlib', url: 'https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black' },
        { name: 'NumPy', url: 'https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white' },
        { name: 'Pandas', url: 'https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white' },
        { name: 'GitHub Actions', url: 'https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white' },
        { name: 'GitHub', url: 'https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white' },
        { name: 'Git', url: 'https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white' },
    ];

    return (
        <>
            <div className="about-area pt-20 bg-black/70 h-screen w-screen flex items-center justify-center absolute text-white backdrop-blur-sm">
                <div className="container mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/12 px-4">
                            <div className="about-img relative">
                                <img
                                    src="favicon.ico"
                                    alt="About Image"
                                    width={400}
                                    height={400}
                                    className="w-full"
                                />
                                <div className="absolute right-0 top-1/4 border-9 border-white/50 w-full h-full"></div>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 lg:pl-16 px-4 text-white">
                            <div className="about-text pt-20 lg:pt-0 text-white">
                                <h2 className="text-5xl font-poppins">About Me</h2> <br />
                                <p className="font-ubuntu text-base text-white">
                                    My name is Yash Raghuvanshi pursuing my 💻 CSE (A.I) degree at GL Bajaj Institute of Technology and Management🏫, where I learn the fundamentals and applications of artificial intelligence, data structures and algorithms, and 🚀 machine learning.<br />
                                    <br />
                                </p>
                                <h3 className="text-xl font-semibold">Skills :</h3>
                                <div className="flex flex-wrap">
                                    {tech.map((item) => (
                                        <img
                                            key={item.name}
                                            src={item.url}
                                            alt={item.name}
                                            width={60}
                                            height={25}
                                            className="mr-2 mb-2"
                                        />
                                    ))}
                                </div>
                                I am always eager to learn new things and explore the ever-evolving world of technology. My goal is to become a proficient and versatile software engineer who can contribute to the advancement and improvement of society.
                                <br />
                                <Link href="https://www.linkedin.com/in/yash-raghuvanshi-a14361287">
                                    <button className='bg-green-500 p-3 left-[35%] relative m-3 hover:bg-green-600 transition duration-500'>Let's connect</button>
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