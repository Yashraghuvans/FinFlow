"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, History, TrendingUp, Settings, LogOut, Hexagon } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, role, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/signin';
    return role === 'contractor' ? '/dashboard/contractor' : '/dashboard/user';
  };

  // Nav links for authenticated users
  const authNavLinks = [
    { name: "Dashboard", href: getDashboardLink(), icon: LayoutDashboard },
  ];

  if (role === 'user') {
    authNavLinks.push({ name: "Ledger", href: "/ledger", icon: History });
    authNavLinks.push({ name: "Scenarios", href: "/scenarios", icon: TrendingUp });
  }

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
          {user ? (
            <>
              {authNavLinks.map((link) => {
                return (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="nav-link text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="h-4 w-px bg-white/10 mx-2"></div>
              <button onClick={handleLogout} className="text-sm font-medium text-gray-400 hover:text-red-400 flex items-center transition-colors">
                <LogOut className="w-4 h-4 mr-1.5" /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-sm font-medium text-white hover:text-indigo-400 transition-colors">
                Sign In
              </Link>
              <Link href="/signin" className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-all active:scale-95">
                Get Started
              </Link>
            </>
          )}
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
          {user ? (
            <>
              {authNavLinks.map((link) => {
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
              <button 
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="flex items-center text-lg font-medium text-red-400 w-full text-left"
              >
                <LogOut className="w-5 h-5 mr-4 opacity-70" />
                Sign Out
              </button>
            </>
          ) : (
            <Link 
              href="/signin" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-medium text-white text-center w-full bg-white/10 py-3 rounded-xl border border-white/10"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
