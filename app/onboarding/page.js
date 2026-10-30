'use client';

import { useState, useEffect } from 'react';
import { firebaseSetupPropertyAndLoan } from '../lib/firebase-actions';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
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
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="page-shell relative flex min-h-[calc(100vh-var(--nav-height))] items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.1)_0%,_transparent_50%)]" aria-hidden />

      <div className="card w-full max-w-2xl animate-fade-in-up p-8 md:p-10">
        <div className="mb-8 border-b border-[color:var(--surface-border)] pb-8">
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-lg font-semibold text-indigo-300">
            F
          </span>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Project setup
          </h1>
          <p className="mt-2 text-[var(--muted)]">
            Define your property and loan details to initialize the ledger.
          </p>
        </div>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest opacity-80">01 / Property</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Project Name</label>
                <input name="projectName" required className="input-field" placeholder="e.g. Prestige Falcon City" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Builder Name</label>
                <input name="builderName" required className="input-field" placeholder="e.g. Prestige Group" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Agreement Value (₹)</label>
              <input name="agreementValue" type="number" required className="input-field font-mono" placeholder="8500000" />
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest opacity-80">02 / Loan details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Lender (Bank)</label>
                <input name="lender" required className="input-field" placeholder="e.g. HDFC Bank" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Sanctioned Amount (₹)</label>
                <input name="sanctionedAmount" type="number" required className="input-field font-mono" placeholder="7000000" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Interest Rate (%)</label>
                <input name="interestRate" type="number" step="0.01" required className="input-field font-mono" placeholder="8.5" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Tenure (Months)</label>
                <input name="tenureMonths" type="number" required className="input-field font-mono" placeholder="240" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wide">Sanction Date</label>
              <input name="sanctionDate" type="date" required className="input-field [color-scheme:dark]" />
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
