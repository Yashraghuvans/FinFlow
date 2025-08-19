import Link from 'next/link';
import React from 'react';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
          Your Home Loan.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
            Simplified.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold mt-8 mb-12 text-slate-300 animate-fade-in-up animation-delay-300 max-w-4xl mx-auto leading-relaxed">
          Navigate every step with FinFlow – For Clarity, Control, and Confidence.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in-up animation-delay-500">
          <div className="flex items-center space-x-2 text-slate-300">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            <span className="text-sm font-medium">Smart Analytics</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Shield className="w-5 h-5 text-success-400" />
            <span className="text-sm font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <Zap className="w-5 h-5 text-warning-400" />
            <span className="text-sm font-medium">Real-time Updates</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up animation-delay-700">
          <Link href="/dashpage" passHref>
            <button
              className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-primary-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus-ring overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Unlock FinFlow
                <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span
                className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-500 to-purple-500 opacity-0 group-hover:opacity-100"
              ></span>
            </button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 animate-fade-in-up animation-delay-1000">
          <p className="text-slate-400 text-sm font-medium mb-4">Trusted by thousands of users</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="w-16 h-8 bg-slate-700 rounded animate-pulse"></div>
            <div className="w-16 h-8 bg-slate-700 rounded animate-pulse animation-delay-200"></div>
            <div className="w-16 h-8 bg-slate-700 rounded animate-pulse animation-delay-400"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;