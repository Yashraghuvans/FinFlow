"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, History, TrendingUp, Settings, LogOut, Hexagon } from 'lucide-react'; 

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Ledger", href: "/ledger", icon: History },
    { name: "Scenarios", href: "/scenarios", icon: TrendingUp },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent py-2'}`}
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between'>
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="text-white group-hover:text-indigo-500 transition-colors duration-300">
            <Hexagon className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <span className='ml-3 text-xl font-bold tracking-tight text-white'>
            FinFlow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-8'>
          {navLinks.map((link) => {
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className="nav-link"
              >
                {link.name}
              </Link>
            );
          })}
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          <Link href="/signin" className="text-sm font-medium text-white hover:text-indigo-400 transition-colors">
            Sign In
          </Link>
          <Link href="/dashboard" className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-all active:scale-95">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className='text-white p-2'
          >
            {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 py-6 px-6 space-y-6 shadow-2xl'>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-lg font-medium text-gray-300 hover:text-white"
              >
                <Icon className="w-5 h-5 mr-4 opacity-50" />
                {link.name}
              </Link>
            );
          })}
          <hr className="border-white/10" />
          <Link 
            href="/signin" 
            onClick={() => setIsMenuOpen(false)}
            className="block text-lg font-medium text-white"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
