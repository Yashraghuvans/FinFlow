'use client';

import { useState, useEffect } from 'react';
import { firebaseSetupPropertyAndLoan } from '../lib/firebase-actions';
import { useRouter } from 'next/navigation';
import { Hexagon, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await firebaseSetupPropertyAndLoan(user.uid, data);
      toast.success("Project initialized!");
      router.push('/dashboard/user');
    } catch (err) {
      console.error(err);
      toast.error('Failed to setup property.');
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Subtle background effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-2xl w-full bg-[var(--surface)] border border-white/5 p-8 md:p-12 rounded-[2rem] shadow-2xl relative z-10 animate-fade-in-up">
        
        <div className="mb-10 border-b border-white/5 pb-8">
          <Hexagon className="w-10 h-10 text-indigo-500 mb-6" strokeWidth={1.5} />
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Project Setup
          </h2>
          <p className="text-gray-400">
            Define your property basics and loan parameters to initialize the ledger.
          </p>
        </div>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest opacity-80">01 / Property</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Project Name</label>
                <input name="projectName" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-700" placeholder="e.g. Prestige Falcon City" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Builder Name</label>
                <input name="builderName" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-700" placeholder="e.g. Prestige Group" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Agreement Value (₹)</label>
              <input name="agreementValue" type="number" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-700 font-mono" placeholder="8500000" />
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest opacity-80">02 / Loan details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Lender (Bank)</label>
                <input name="lender" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-700" placeholder="e.g. HDFC Bank" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Sanctioned Amount (₹)</label>
                <input name="sanctionedAmount" type="number" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-700 font-mono" placeholder="7000000" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Interest Rate (%)</label>
                <input name="interestRate" type="number" step="0.01" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-700 font-mono" placeholder="8.5" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Tenure (Months)</label>
                <input name="tenureMonths" type="number" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-700 font-mono" placeholder="240" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Sanction Date</label>
              <input name="sanctionDate" type="date" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [color-scheme:dark]" />
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <button type="submit" disabled={loading} className="w-full btn-primary group">
              {loading ? 'Initializing Ledger...' : 'Complete Setup'}
              {!loading && <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
