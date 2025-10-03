"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, BarChart3, UserPlus, LogOut, User } from 'lucide-react'; 

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

  const [auth, setAuth] = useState(null);
  useEffect(() => {
    try { setAuth(JSON.parse(localStorage.getItem('finflow_auth'))); } catch { setAuth(null); }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('finflow_auth');
    setAuth(null);
    window.location.href = '/signin';
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    // remove generic dashboard link
    { name: auth?.role === 'OWNER' ? 'Owner Dashboard' : auth?.role === 'CONTRACTOR' ? 'Contractor Dashboard' : 'Sign In', href: auth?.role === 'OWNER' ? '/ownerDashboard' : auth?.role === 'CONTRACTOR' ? '/contractorDashboard' : '/signin', icon: auth?.role ? BarChart3 : UserPlus },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[99] transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50' : 'bg-transparent'}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className='container mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between'>
        {/* Logo */}
        <Link href="/" className="flex items-center group focus-ring">
          <div className="relative">
            <img 
              src="favicon.ico" 
              alt="FinFlow Logo" 
              className='h-10 w-10 md:h-12 md:w-12 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg' 
            />
            <div className="absolute inset-0 rounded-xl bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className='ml-3 text-xl md:text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300'>
            FinFlow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-1 lg:space-x-2'>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.href} className="nav-link focus-ring">
                <span className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200">
                  <Icon className="w-4 h-4 mr-2" />
                  {link.name}
                </span>
              </Link>
            );
          })}
          {auth && (
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-slate-700">
              <div className="flex items-center text-slate-300 text-sm">
                <User className="w-4 h-4 mr-2" />
                {auth.role}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors duration-200 focus-ring"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button 
            onClick={toggleMenu} 
            className='text-white focus-ring p-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200'
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className='md:hidden fixed inset-0 bg-slate-900/98 backdrop-blur-lg flex flex-col items-center justify-center space-y-6 animate-fade-in z-50'>
          <button 
            onClick={toggleMenu} 
            className='absolute top-6 right-6 text-white focus-ring p-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200'
            aria-label="Close navigation menu"
          >
            <X size={28} />
          </button>
          
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.href}>
                <button
                  className='flex items-center text-2xl font-semibold text-slate-200 hover:text-primary-400 transition-all duration-300 focus-ring p-4 rounded-lg hover:bg-slate-800/50 transform hover:scale-105'
                  onClick={toggleMenu}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-6 h-6 mr-3" />
                  {link.name}
                </button>
              </Link>
            );
          })}
          {auth && (
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex items-center justify-center text-slate-300 text-lg mb-4">
                <User className="w-5 h-5 mr-2" />
                {auth.role}
              </div>
              <button
                onClick={() => { handleLogout(); toggleMenu(); }}
                className='flex items-center text-xl font-semibold text-red-400 hover:text-red-300 transition-all duration-300 focus-ring p-4 rounded-lg hover:bg-red-600/20 transform hover:scale-105'
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
