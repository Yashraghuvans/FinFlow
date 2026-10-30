'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, IndianRupee, Landmark, TrendingDown, Wallet, ArrowRight, BarChart3, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { firebaseGetDashboardData } from '../../lib/firebase-actions';

export default function UserDashboard() {
  const { user, role, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || role !== 'user')) {
      router.push('/signin');
    }
  }, [user, role, authLoading, router]);

  useEffect(() => {
    async function loadData() {
      if (user && role === 'user') {
        try {
          const dashboardData = await firebaseGetDashboardData(user.uid);
          if (!dashboardData) {
            router.push('/onboarding');
            return;
          }
          setData(dashboardData);
          setTimeout(() => setFetching(false), 600); 
        } catch (err) {
          console.error("Dashboard Load Error:", err);
          // Don't set fetching to false if there's an error to prevent crash
          // Instead, check if user has a property. If not, they might need onboarding.
          router.push('/onboarding');
        }
      }
    }
    loadData();
  }, [user, role, router]);

  if (authLoading || fetching || !data) {
    return (
      <div className="page-container py-10 sm:py-14">
        <div className="space-y-8">
          <div className="h-12 w-full max-w-md rounded-xl bg-white/5 animate-pulse" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
          <div className="h-72 rounded-xl bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  const { property, loan, recentTransactions, stats } = data;

  const cards = [
    { label: 'Bank Disbursed', value: stats.bankDisbursed, icon: Landmark, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'Owner Direct', value: stats.ownerPaid, icon: Wallet, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Pre-EMI Paid', value: stats.preEmiPaid, icon: TrendingDown, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
    { label: 'Agreement Value', value: property.agreementValue, icon: IndianRupee, color: 'text-gray-300', bg: 'bg-white/5 border-white/10' },
  ];

  return (
    <div className="page-container space-y-10 py-10 sm:py-14 lg:space-y-12">
      <header className="flex flex-col gap-6 border-b border-[color:var(--surface-border)] pb-8 animate-fade-in-up lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-indigo-400/90">
            Project overview
          </p>
          <h1 className="text-white">{property.projectName}</h1>
          <p className="max-w-xl text-[var(--muted)]">
            Builder: <span className="text-zinc-200">{property.builderName}</span>
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 lg:items-end">
          <span className="badge border-indigo-500/30 bg-indigo-500/10 text-indigo-200">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-indigo-400" aria-hidden />
            Active construction
          </span>
          <p className="text-xs text-zinc-500">
            Updated {new Date().toLocaleTimeString()}
          </p>
        </div>
      </header>

      <nav
        className="flex w-full max-w-full gap-1 overflow-x-auto rounded-xl border border-[color:var(--surface-border)] bg-black/20 p-1 sm:w-fit animate-fade-in-up delay-100"
        aria-label="Dashboard sections"
      >
        {['overview', 'ledger', 'scenarios'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-lg px-5 py-2.5 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? 'bg-white text-zinc-900'
                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && (
        <div className="space-y-12 animate-fade-in-up delay-200">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="card-interactive group p-6 sm:p-7">
                  <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-lg border ${card.bg}`}>
                    <Icon className={`h-5 w-5 ${card.color}`} aria-hidden />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{card.label}</p>
                  <p className="stat-value mt-1">
                    ₹{(card.value / 100000).toFixed(2)}<span className="ml-1 text-lg text-zinc-500">L</span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress Card */}
            <div className="lg:col-span-2 card p-10 space-y-10 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-20" />
               <div className="flex justify-between items-center">
                 <div className="space-y-1">
                   <h3 className="text-2xl font-bold text-white">Project Liquidity</h3>
                   <p className="text-gray-500">Total capital deployed against agreement value.</p>
                 </div>
                 <div className="text-5xl font-black text-indigo-400 tabular-nums">
                    {((stats.totalPaid / property.agreementValue) * 100).toFixed(1)}%
                 </div>
               </div>

               <div className="space-y-4">
                  <div className="h-4 w-full bg-white/5 rounded-full border border-white/10 overflow-hidden p-1">
                    <div 
                      style={{ width: `${(stats.totalPaid / property.agreementValue) * 100}%` }} 
                      className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-1000 ease-out"
                    />
                  </div>
                  <div className="flex justify-between text-xs font-mono text-gray-500 uppercase tracking-tighter">
                    <span>Initiated</span>
                    <span>₹{((property.agreementValue - stats.totalPaid) / 100000).toFixed(2)}L to possession</span>
                  </div>
               </div>
            </div>

            {/* Sidebar Insight */}
            <div className="space-y-8">
               <div className="card bg-indigo-600/5 border-indigo-500/20 p-8 space-y-6 relative overflow-hidden">
                  <BarChart3 className="absolute -bottom-4 -right-4 w-24 h-24 text-indigo-500/10" />
                  <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Financial Health</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Debt Utilized</span>
                      <span className="text-white font-bold">{((stats.bankDisbursed / loan?.sanctionedAmount) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Interest Accrued</span>
                      <span className="text-orange-400 font-bold">₹{stats.preEmiPaid.toLocaleString()}</span>
                    </div>
                  </div>
               </div>

               <div className="card border-white/5 p-8 flex items-start space-x-4">
                 <div className="p-2 bg-blue-500/10 rounded-lg"><Clock className="w-5 h-5 text-blue-400" /></div>
                 <div>
                   <h4 className="text-sm font-bold text-white mb-1">Upcoming Milestone</h4>
                   <p className="text-xs text-gray-500">Structure Completion due in 45 days.</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-0 overflow-hidden border-white/5">
            <div className="px-10 py-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
               <h3 className="text-xl font-bold text-white">Recent Movements</h3>
               <Link href="/ledger" className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center">
                 Ledger History <ArrowRight className="ml-2 w-4 h-4" />
               </Link>
            </div>
            <div className="divide-y divide-white/5">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx, idx) => (
                  <div key={tx.id} className="group flex items-center justify-between p-8 hover:bg-white/5 transition-all duration-300">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center font-black text-gray-600 group-hover:border-indigo-500/50 group-hover:text-white transition-all">
                        0{idx + 1}
                      </div>
                      <div>
                        <p className="font-bold text-white capitalize text-lg">{tx.type.replace('_', ' ')}</p>
                        <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-white tracking-tighter">₹{tx.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-24 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500">No activity recorded yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ledger' && (
        <div className="card p-24 text-center border-white/5 bg-transparent flex flex-col items-center space-y-8 animate-fade-in-up">
           <div className="w-24 h-24 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center">
              <Landmark className="w-10 h-10 text-indigo-400" />
           </div>
           <div className="max-w-md space-y-4">
              <h3 className="text-3xl font-bold text-white">Transparent Ledger</h3>
              <p className="text-gray-500 leading-relaxed">View every bank disbursement and personal payment in a single, unalterable timeline.</p>
           </div>
           <Link href="/ledger" className="btn-primary px-12 py-4 text-lg">Open Vault &rarr;</Link>
        </div>
      )}

      {activeTab === 'scenarios' && (
        <div className="card p-24 text-center border-white/5 bg-transparent flex flex-col items-center space-y-8 animate-fade-in-up">
           <div className="w-24 h-24 bg-orange-500/10 rounded-[2rem] flex items-center justify-center">
              <TrendingDown className="w-10 h-10 text-orange-400" />
           </div>
           <div className="max-w-md space-y-4">
              <h3 className="text-3xl font-bold text-white">Scenario Lab</h3>
              <p className="text-gray-500 leading-relaxed">Experiment with prepayments and see your &quot;Interest Saved&quot; metric grow in real-time.</p>
           </div>
           <Link href="/scenarios" className="btn-primary px-12 py-4 text-lg">Enter Lab &rarr;</Link>
        </div>
      )}

    </div>
  );
}
