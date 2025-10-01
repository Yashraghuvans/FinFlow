import React from 'react';
import Link from 'next/link';
import { addTransaction, generateId, saveProject } from '../lib/api/projectTrackerApi';

function InvoiceList({ project, onProjectChange }) {
  const invoices = project?.invoices || [];

  async function handleLogPayment(invoice) {
    const amountStr = prompt('Enter payment amount (₹):', String(invoice.amount));
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (!amount || amount <= 0) return;
    const type = prompt("Enter payment type: 'Owner Direct Payment' or 'Bank Disbursement'", 'Owner Direct Payment');
    if (type !== 'Owner Direct Payment' && type !== 'Bank Disbursement') return;
    const txn = {
      id: generateId('txn'),
      invoiceId: invoice.id,
      type,
      amount,
      date: new Date().toISOString(),
      notes: ''
    };
    const updated = await addTransaction(txn);
    onProjectChange?.(updated);
  }

  async function markOverdueIfNeeded() {
    const now = new Date();
    const updated = { ...project, invoices: invoices.map(inv => {
      const due = new Date(inv.dueDate);
      if (inv.status !== 'Paid' && due < now) {
        return { ...inv, status: inv.status === 'Partially Paid' ? 'Partially Paid' : 'Overdue' };
      }
      return inv;
    }) };
    await saveProject(updated);
    onProjectChange?.(updated);
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Invoices</h2>
        <button className="btn btn-secondary" onClick={markOverdueIfNeeded}>Refresh Status</button>
      </div>
      {invoices.length === 0 ? (
        <p className="text-gray-400">No invoices yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-gray-300">
                <th className="px-4 py-2 text-left">Invoice #</th>
                <th className="px-4 py-2 text-left">Milestone</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Paid</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => {
                const milestone = project.milestones.find(m => m.id === inv.milestoneId);
                const paid = (project.transactions || [])
                  .filter(t => t.invoiceId === inv.id && (t.type === 'Owner Direct Payment' || t.type === 'Bank Disbursement'))
                  .reduce((s, t) => s + (Number(t.amount) || 0), 0);
                const badgeClass = inv.status === 'Paid' ? 'bg-green-600' : inv.status === 'Overdue' ? 'bg-red-600' : inv.status === 'Partially Paid' ? 'bg-yellow-600' : 'bg-slate-600';
                return (
                  <tr key={inv.id} className="border-t border-gray-700 text-gray-200">
                    <td className="px-4 py-2">{inv.invoiceNumber}</td>
                    <td className="px-4 py-2">{milestone?.name || '-'}</td>
                    <td className="px-4 py-2">₹{Number(inv.amount).toFixed(2)}</td>
                    <td className="px-4 py-2">₹{paid.toFixed(2)}</td>
                    <td className="px-4 py-2">{new Date(inv.dueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2"><span className={`px-2 py-1 rounded text-xs text-white ${badgeClass}`}>{inv.status}</span></td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <button className="btn btn-secondary" onClick={() => handleLogPayment(inv)}>Log Payment</button>
                        <Link href={`/pay/${inv.id}`} className="btn btn-primary">Pay Online</Link>
                      </div>
                    </td>
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

export default InvoiceList;


