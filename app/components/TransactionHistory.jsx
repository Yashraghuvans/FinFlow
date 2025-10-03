import React, { useMemo, useState } from 'react';

const TYPES = ['All', 'Owner Direct Payment', 'Bank Disbursement', 'Pre-EMI'];

function TransactionHistory({ project }) {
  const [filter, setFilter] = useState('All');
  const txns = project?.transactions || [];

  const filtered = useMemo(() => {
    if (filter === 'All') return txns;
    return txns.filter(t => t.type === filter);
  }, [txns, filter]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Transaction History</h2>
        <select className="bg-slate-800 text-gray-200 px-2 py-1 rounded" value={filter} onChange={e => setFilter(e.target.value)}>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      {filtered.length === 0 ? (
        <p className="text-gray-400">No transactions.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-300">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Invoice</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => {
                const inv = project?.invoices?.find(i => i.id === t.invoiceId);
                return (
                  <tr key={t.id} className="border-t border-gray-700 text-gray-200">
                    <td className="px-4 py-2">{new Date(t.date).toLocaleString()}</td>
                    <td className="px-4 py-2">{t.type}</td>
                    <td className="px-4 py-2">{inv ? inv.invoiceNumber : '-'}</td>
                    <td className="px-4 py-2">₹{Number(t.amount).toFixed(2)}</td>
                    <td className="px-4 py-2">{t.notes || ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;


