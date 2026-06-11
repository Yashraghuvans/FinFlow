'use client';

import { useEffect, useState } from 'react';
import { firebaseGetScenarios } from '../lib/firebase-actions';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ScenariosPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [scenarios, setScenarios] = useState([]);
  const [loanId, setLoanId] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function loadScenarios() {
      if (user) {
        try {
          const data = await firebaseGetScenarios(user.uid);
          setScenarios(data.scenarios);
          setLoanId(data.loanId);
        } catch (err) {
          console.error(err);
        } finally {
          setFetching(false);
        }
      }
    }
    loadScenarios();
  }, [user]);

  if (authLoading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Forecasting Scenarios</h1>
          <p className="text-lg text-gray-400">Model prepayments, rate changes, and payoff strategies.</p>
        </div>
        <button className="btn-primary py-2 px-5 text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled={!loanId}>
          + New Scenario
        </button>
      </header>

      {scenarios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <div key={s.id} className="card hover:-translate-y-1" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-white leading-tight">{s.name}</h3>
                <span className="px-2 py-1 rounded bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                  {s.type.replace('_', ' ')}
                </span>
              </div>
              <div className="text-sm space-y-3 text-gray-400 mt-6 border-t border-white/5 pt-4">
                <div>
                  <strong className="block text-gray-300 mb-1 text-xs uppercase tracking-wider">Inputs</strong>
                  <p className="font-mono text-xs">{s.inputs}</p>
                </div>
                <div>
                  <strong className="block text-gray-300 mb-1 text-xs uppercase tracking-wider">Outputs</strong>
                  <p className="font-mono text-xs text-white">{s.outputs}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-16 text-center border-dashed border-white/10 bg-transparent flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 border border-white/10 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <p className="text-gray-300 font-medium mb-4 text-lg">You haven't created any scenarios yet.</p>
          {loanId ? (
            <button className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
              Create your first prepayment scenario &rarr;
            </button>
          ) : (
            <p className="text-sm text-error bg-error/10 px-3 py-1 rounded-full border border-error/20">Please complete the property setup first.</p>
          )}
        </div>
      )}
    </div>
  );
}
