import { getLedgerData } from '../lib/actions';
import LogTransactionModal from '../components/LogTransactionModal';

export default async function LedgerPage() {
  const { transactions } = await getLedgerData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Transaction Ledger</h1>
          <p className="text-lg text-gray-400">Every rupee tracked, from down payment to pre-EMI.</p>
        </div>
        <LogTransactionModal />
      </header>

      <div className="bg-[var(--surface)] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-black/20">
              <tr>
                <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[var(--surface)]">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-300">
                      {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        tx.type === 'bank_disbursement' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        tx.type === 'pre_emi' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                        tx.type === 'owner_direct' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        'bg-white/10 text-gray-300 border border-white/20'
                      }`}>
                        {tx.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-white tracking-tight">
                      ₹{tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-400 max-w-xs truncate">
                      {tx.notes || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center opacity-50">
                      <div className="w-16 h-16 bg-white/5 border border-white/10 text-gray-400 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                      </div>
                      <p className="text-gray-300 font-medium">No transactions found</p>
                      <p className="text-sm text-gray-500 mt-1">Start by logging your first payment.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
