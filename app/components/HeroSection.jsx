import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-br from-gray-950 to-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
          Your Home Loan. <span className="text-blue-400">Simplified.</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold mt-6 mb-8 text-gray-300 animate-fade-in-up animation-delay-500">
          Navigate every step with FinFlow – For Clarity, Control, and Confidence.
        </p>
        <Link href="/dashpage" passHref>
          <button
            className="group relative inline-flex items-center justify-center px-2 py-5 text-xl font-bold text-white bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 animate-fade-in-up animation-delay-1500 overflow-hidden"
            style={{ position: "relative", zIndex: 1 }}
          >
            <span className="relative z-10 flex items-center">
              Unlock FinFlow
              <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span
              className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
              style={{
                background: "linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%)",
                opacity: 0.15,
                zIndex: 0,
              }}
            ></span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;