"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; 

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Dashboard", href: "/dashpage" },
    { name: "Sign Up", href: "/signin" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[99] transition-all duration-300 ease-in-out
      ${isScrolled ? 'bg-gray-950/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className='container mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between'>
        <Link href="/" legacyBehavior>
          <a className="flex items-center group">
            <img src="favicon.ico" alt="FinFlow Logo" className='h-10 w-10 md:h-12 md:w-12 rounded-full transition-transform duration-300 group-hover:scale-110' />
            <span className='ml-3 text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300'>FinFlow</span>
          </a>
        </Link>
        <div className='hidden md:flex space-x-6 lg:space-x-8'>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} legacyBehavior>
              <a className='text-base lg:text-lg font-medium uppercase text-gray-300 hover:text-blue-400 transition-colors duration-300 relative group'>
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </Link>
          ))}
        </div>
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-white focus:outline-none'>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className='md:hidden fixed inset-0 bg-gray-950/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 animate-fade-in'>
          <button onClick={toggleMenu} className='absolute top-6 right-6 text-white focus:outline-none'>
            <X size={32} />
          </button>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} legacyBehavior>
              <a
                className='text-2xl font-bold uppercase text-gray-200 hover:text-blue-400 transition-colors duration-300'
                onClick={toggleMenu}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
