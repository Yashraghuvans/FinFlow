'use client';

import { useState } from 'react';
import { addTransaction } from '../lib/actions';
import { X, ArrowRight } from 'lucide-react';

export default function LogTransactionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await addTransaction(data);
      setIsOpen(false);
    } catch (err) {
      alert('Error logging transaction');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn-primary py-2 px-5 text-sm"
      >
        + Log Transaction
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          <div className="bg-[var(--surface)] border border-white/10 rounded-3xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
            
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Log Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Transaction Type</label>
                <select name="type" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [color-scheme:dark]">
                  <option value="bank_disbursement">Bank Disbursement</option>
                  <option value="owner_direct">Owner Direct Payment</option>
                  <option value="pre_emi">Pre-EMI Interest</option>
                  <option value="down_payment">Down Payment</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Amount (₹)</label>
                <input name="amount" type="number" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono placeholder:text-gray-700" placeholder="50000" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Date</label>
                <input name="date" type="date" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all [color-scheme:dark]" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Notes (Optional)</label>
                <textarea name="notes" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-700" rows="2" placeholder="Reference number or description..."></textarea>
              </div>
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-primary group"
                >
                  {loading ? 'Saving...' : 'Save Record'}
                  {!loading && <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
