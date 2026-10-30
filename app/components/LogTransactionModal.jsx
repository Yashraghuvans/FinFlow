'use client';

import { useState } from 'react';
import { firebaseAddTransaction } from '../lib/firebase-actions';
import { X, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function LogTransactionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await firebaseAddTransaction(user.uid, data);
      toast.success("Transaction logged!");
      setIsOpen(false);
      // Refresh to show updated data
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      toast.error('Error logging transaction');
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
        <div className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="log-tx-title">
          <div className="card relative w-full max-w-md p-6 sm:p-8">
            <button type="button" onClick={() => setIsOpen(false)} className="absolute right-5 top-5 rounded-lg p-1 text-zinc-400 transition-colors hover:text-white" aria-label="Close">
              <X className="h-5 w-5" />
            </button>

            <h2 id="log-tx-title" className="mb-6 text-xl font-semibold text-white">Log transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Transaction Type</label>
                <select name="type" required className="input-field [color-scheme:dark]">
                  <option value="bank_disbursement">Bank Disbursement</option>
                  <option value="owner_direct">Owner Direct Payment</option>
                  <option value="pre_emi">Pre-EMI Interest</option>
                  <option value="down_payment">Down Payment</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Amount (₹)</label>
                <input name="amount" type="number" required className="input-field font-mono tabular-nums" placeholder="50000" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Date</label>
                <input name="date" type="date" required className="input-field [color-scheme:dark]" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Notes (Optional)</label>
                <textarea name="notes" className="input-field min-h-[80px] resize-y" rows="2" placeholder="Reference number or description..."></textarea>
              </div>
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-primary group disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (
                    <>
                      Save Record
                      <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
