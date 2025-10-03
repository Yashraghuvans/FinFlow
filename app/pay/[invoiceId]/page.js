"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavBar from '../../components/navbar';
import { addTransaction, generateId, getProject } from '../../lib/api/projectTrackerApi';

export default function DummyPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { invoiceId } = params || {};
  const [project, setProject] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const p = await getProject();
      setProject(p);
      const inv = p?.invoices?.find(i => i.id === invoiceId);
      setInvoice(inv || null);
      setAmount(inv ? String(inv.amount) : '');
      setLoading(false);
    })();
  }, [invoiceId]);

  function formatCard(num) {
    return (num || '')
      .replace(/[^0-9]/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  async function handlePay(e) {
    e.preventDefault();
    if (!project || !invoice) return;
    const expValid = expiryMonth && expiryYear;
    const cvvValid = /^(\d{3,4})$/.test(cvv);
    const cardValid = card.replace(/\s/g, '').length >= 12;
    if (!expValid || !cvvValid || !cardValid) return;
    await addTransaction({
      id: generateId('txn'),
      invoiceId: invoice.id,
      type: 'Owner Direct Payment',
      amount: Number(amount) || 0,
      date: new Date().toISOString(),
      notes: 'Dummy card payment',
    });
    router.push('/ownerDashboard');
  }

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavBar />
      <div className="pt-24 pb-8">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="card overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-indigo-600 px-6 py-4">
              <h1 className="text-xl md:text-2xl font-semibold text-white">Pay Invoice</h1>
              {invoice && (
                <div className="text-slate-100/90 text-sm mt-1">Invoice #{invoice.invoiceNumber}</div>
              )}
            </div>
            <div className="p-6 md:p-8">
              {invoice ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <form onSubmit={handlePay} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Cardholder Name</label>
                          <input className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 w-full" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Card Number</label>
                          <input
                            className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 w-full tracking-widest"
                            placeholder="4111 1111 1111 1111"
                            value={card}
                            onChange={e => setCard(formatCard(e.target.value))}
                            inputMode="numeric"
                            autoComplete="cc-number"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Expiry</label>
                          <div className="grid grid-cols-2 gap-3">
                            <select
                              className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 focus:border-primary-500 focus:ring-primary-500 w-full"
                              value={expiryMonth}
                              onChange={e => setExpiryMonth(e.target.value)}
                              required
                            >
                              <option value="" disabled>Month</option>
                              {Array.from({length:12}).map((_,i)=>{
                                const v = String(i+1).padStart(2,'0');
                                return <option key={v} value={v}>{v}</option>
                              })}
                            </select>
                            <select
                              className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 focus:border-primary-500 focus:ring-primary-500 w-full"
                              value={expiryYear}
                              onChange={e => setExpiryYear(e.target.value)}
                              required
                            >
                              <option value="" disabled>Year</option>
                              {Array.from({length: 12}).map((_,i)=>{
                                const y = new Date().getFullYear()+i;
                                return <option key={y} value={y}>{y}</option>
                              })}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">CVV</label>
                          <input
                            className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 w-full"
                            placeholder="123"
                            value={cvv}
                            onChange={e => setCvv(e.target.value.replace(/[^0-9]/g,'').slice(0,4))}
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-300 mb-2">Amount</label>
                          <input type="number" min="0" step="0.01" className="form-input bg-slate-800/80 border border-slate-700 text-gray-200 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500 w-full" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary w-full">Pay Now</button>
                      <p className="text-xs text-gray-400 text-center">This is a dummy payment page for demonstration only.</p>
                    </form>
                  </div>
                  <div>
                    <div className="p-4 bg-slate-800 rounded border border-slate-700">
                      <h3 className="text-white font-semibold mb-3">Invoice Summary</h3>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <div className="flex items-center justify-between"><span>Invoice #</span><span className="text-white">{invoice.invoiceNumber}</span></div>
                        <div className="flex items-center justify-between"><span>Amount Due</span><span className="text-white">₹{Number(invoice.amount).toLocaleString()}</span></div>
                        <div className="flex items-center justify-between"><span>Due Date</span><span className="text-white">{new Date(invoice.dueDate).toLocaleDateString()}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">Invoice not found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


