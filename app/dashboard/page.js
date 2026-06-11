import { getDashboardData } from '../lib/actions';
import { redirect } from 'next/navigation';
import { IndianRupee, Landmark, TrendingDown, Wallet, ArrowRight, Hexagon } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const data = await getDashboardData();

  if (!data) {
    redirect('/onboarding');
  }

  const { property, recentTransactions, stats } = data;
  const loan = property.loans?.[0];

  const cards = [
    { label: 'Bank Disbursed', value: stats.bankDisbursed, icon: Landmark, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'Owner Direct', value: stats.ownerPaid, icon: Wallet, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Pre-EMI Paid', value: stats.preEmiPaid, icon: TrendingDown, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
    { label: 'Agreement Value', value: property.agreementValue, icon: IndianRupee, color: 'text-gray-300', bg: 'bg-white/5 border-white/10' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Dashboard</h1>
          <p className="text-lg text-gray-400">Project: <span className="text-white">{property.projectName}</span></p>
        </div>
        <div className="flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-300">Phase: Pre-EMI</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="card group hover:-translate-y-1" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${card.bg} transition-colors`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <p className="text-sm font-medium text-gray-400 mb-1">{card.label}</p>
              <p className="text-3xl font-bold text-white tracking-tight">
                ₹{(card.value / 100000).toFixed(2)}<span className="text-lg text-gray-500 ml-1">L</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="card">
            <h3 className="text-xl text-white mb-6">Construction Progress</h3>
            <div className="relative pt-1">
              <div className="flex mb-3 items-center justify-between">
                <div>
                  <span className="text-xs font-bold inline-block py-1 px-3 uppercase rounded-full text-indigo-300 bg-indigo-500/20 border border-indigo-500/30">
                    Payment Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold inline-block text-white">
                    {((stats.totalPaid / property.agreementValue) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-white/5 border border-white/10">
                <div style={{ width: `${(stats.totalPaid / property.agreementValue) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-1000 ease-out"></div>
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-medium">₹{((property.agreementValue - stats.totalPaid) / 100000).toFixed(2)}L</span> remaining to be paid to {property.builderName}.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <h3 className="text-xl text-white">Recent Transactions</h3>
              <Link href="/ledger" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center transition-colors">
                View All <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            {recentTransactions.length > 0 ? (
              <div className="space-y-2">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 border ${
                        tx.type === 'bank_disbursement' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                        tx.type === 'pre_emi' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                        'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                      }`}>
                        {tx.type[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-white capitalize">{tx.type.replace('_', ' ')}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white tracking-tight">₹{tx.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                <p className="text-gray-400 mb-4">No transactions recorded yet.</p>
                <Link href="/ledger" className="btn-outline text-sm py-2 px-4">
                  Log First Payment
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Hexagon className="w-32 h-32" strokeWidth={1} />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-6 relative z-10">Loan Details</h3>
            <div className="space-y-5 text-sm relative z-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-indigo-200/60">Lender</span>
                <span className="font-bold text-white">{loan?.lender}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-indigo-200/60">Sanctioned</span>
                <span className="font-bold text-white">₹{(loan?.sanctionedAmount / 100000).toFixed(2)}L</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-indigo-200/60">Interest Rate</span>
                <span className="font-bold text-white">{loan?.interestRate}%</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-indigo-200/60">Tenure</span>
                <span className="font-bold text-white">{loan?.tenureMonths} mo</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-white mb-6">Quick Insights</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                <p className="text-gray-400 leading-relaxed">
                  Bank has disbursed <strong className="text-white">{((stats.bankDisbursed / loan?.sanctionedAmount) * 100).toFixed(1)}%</strong> of your sanctioned loan.
                </p>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_8px_rgba(251,146,60,0.8)]"></div>
                <p className="text-gray-400 leading-relaxed">
                  You've paid <strong className="text-white">₹{stats.preEmiPaid.toLocaleString()}</strong> in pre-EMI interest so far.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
