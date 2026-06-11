'use client';

import Link from 'next/link';
import { Hexagon, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  const handleSignIn = (e) => {
    e.preventDefault();
    // Simulate auth & redirect
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[var(--surface)] border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative z-10 animate-fade-in-up">
        
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white">
            <Hexagon className="w-8 h-8" strokeWidth={1.5} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white text-center mb-2">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Sign in to access your property ledger</p>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              defaultValue="user@example.com"
              required 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" 
              placeholder="you@example.com" 
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
              <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot?</Link>
            </div>
            <input 
              type="password" 
              defaultValue="password123"
              required 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600" 
              placeholder="••••••••" 
            />
          </div>

          <button type="submit" className="w-full btn-primary mt-4 flex justify-between items-center group">
            Sign In 
            <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <Link href="/onboarding" className="text-white hover:underline font-medium">Create project</Link>
        </p>

      </div>
    </div>
  );
}
