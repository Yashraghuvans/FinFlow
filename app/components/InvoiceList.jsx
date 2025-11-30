import React, { useState } from 'react';
import Link from 'next/link';
import { addTransaction, generateId, saveProject } from '../lib/api/projectTrackerApi';
import { toast } from 'react-toastify';
import { FileText, Calendar, DollarSign, CheckCircle, AlertCircle, Clock, CreditCard, Building2 } from 'lucide-react';

function InvoiceList({ project, onProjectChange }) {
  const invoices = project?.invoices || [];
  const [expandedInvoice, setExpandedInvoice] = useState(null);

  async function handleLogPayment(invoice) {
    const amountStr = prompt('Enter payment amount (₹):', String(invoice.amount));
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (!amount || amount <= 0) return;
    const type = prompt("Enter payment type: 'Owner Direct Payment' or 'Bank Disbursement'", 'Owner Direct Payment');
    if (type !== 'Owner Direct Payment' && type !== 'Bank Disbursement') return;
    
    try {
      const txn = {
        id: generateId('txn'),
        invoiceId: invoice.id,
        type,
        amount,
        date: new Date().toISOString(),
        notes: ''
      };
      const updated = await addTransaction(txn);
      toast.success('Payment logged and synced!');
      onProjectChange?.(updated);
    } catch (error) {
      toast.error('Failed to log payment');
      console.error(error);
    }
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

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Paid':
        return { 
          icon: CheckCircle, 
          bgClass: 'bg-success-500/10 border-success-500/30 text-success-400',
          dotClass: 'bg-success-500'
        };
      case 'Overdue':
        return { 
          icon: AlertCircle, 
          bgClass: 'bg-error-500/10 border-error-500/30 text-error-400',
          dotClass: 'bg-error-500'
        };
      case 'Partially Paid':
        return { 
          icon: Clock, 
          bgClass: 'bg-warning-500/10 border-warning-500/30 text-warning-400',
          dotClass: 'bg-warning-500'
        };
      default:
        return { 
          icon: FileText, 
          bgClass: 'bg-primary-500/10 border-primary-500/30 text-primary-400',
          dotClass: 'bg-primary-500'
        };
    }
  };

  const calculateProgress = (paid, total) => {
    return Math.min(100, Math.round((paid / total) * 100));
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Invoices</h2>
            <p className="text-sm text-slate-400">{invoices.length} invoice{invoices.length !== 1 ? 's' : ''} total</p>
          </div>
        </div>
        <button 
          className="btn-secondary text-sm flex items-center gap-2" 
          onClick={markOverdueIfNeeded}
        >
          <Clock className="w-4 h-4" />
          Refresh Status
        </button>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400 text-lg">No invoices yet</p>
          <p className="text-slate-500 text-sm mt-1">Invoices will appear here once the contractor submits them</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Invoice Details
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Milestone
                </th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Invoice Amount
                </th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Amount Paid
                </th>
                <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Payment Progress
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {invoices.map(inv => {
                const milestone = project.milestones.find(m => m.id === inv.milestoneId);
                const paid = (project.transactions || [])
                  .filter(t => t.invoiceId === inv.id && (t.type === 'Owner Direct Payment' || t.type === 'Bank Disbursement'))
                  .reduce((s, t) => s + (Number(t.amount) || 0), 0);
                const balance = Number(inv.amount) - paid;
                const progress = calculateProgress(paid, inv.amount);
                const statusConfig = getStatusConfig(inv.status);
                const StatusIcon = statusConfig.icon;
                const dueDate = new Date(inv.dueDate);
                const issuedDate = inv.issuedDate ? new Date(inv.issuedDate) : null;
                const daysUntilDue = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));

                return (
                  <tr 
                    key={inv.id} 
                    className="hover:bg-slate-700/30 transition-colors duration-150"
                  >
                    {/* Invoice Details */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{inv.invoiceNumber}</span>
                        </div>
                        {issuedDate && (
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar className="w-3 h-3" />
                            <span>Issued: {issuedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>Due: {dueDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          {daysUntilDue > 0 && daysUntilDue <= 7 && inv.status !== 'Paid' && (
                            <span className="ml-1 text-warning-400">({daysUntilDue}d left)</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Milestone */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-white font-medium">{milestone?.name || '-'}</span>
                        <span className="text-xs text-slate-400">{milestone?.percentageOfCost}% of project</span>
                      </div>
                    </td>

                    {/* Invoice Amount */}
                    <td className="px-4 py-4 text-right">
                      <div className="flex flex-col gap-1 items-end">
                        <span className="text-white font-semibold text-base">₹{Number(inv.amount).toLocaleString('en-IN')}</span>
                        {inv.gstAmount && (
                          <span className="text-xs text-slate-400">+GST ₹{Number(inv.gstAmount).toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </td>

                    {/* Amount Paid */}
                    <td className="px-4 py-4 text-right">
                      <span className="text-success-400 font-semibold text-base">₹{paid.toLocaleString('en-IN')}</span>
                    </td>

                    {/* Balance */}
                    <td className="px-4 py-4 text-right">
                      <span className={`font-semibold text-base ${balance > 0 ? 'text-warning-400' : 'text-slate-500'}`}>
                        ₹{balance.toLocaleString('en-IN')}
                      </span>
                    </td>

                    {/* Payment Progress */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              progress === 100 ? 'bg-success-500' : 
                              progress >= 50 ? 'bg-primary-500' : 
                              'bg-warning-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-300">{progress}%</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${statusConfig.bgClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotClass} animate-pulse`} />
                          <StatusIcon className="w-3.5 h-3.5" />
                          {inv.status}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {inv.status !== 'Paid' && (
                          <>
                            <button 
                              className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 hover:bg-slate-600"
                              onClick={() => handleLogPayment(inv)}
                              title="Log Payment"
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                              Log Payment
                            </button>
                            <Link 
                              href={`/pay/${inv.id}`} 
                              className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5"
                              title="Pay Online"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              Pay Online
                            </Link>
                          </>
                        )}
                        {inv.status === 'Paid' && (
                          <span className="text-xs text-success-400 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Footer */}
      {invoices.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-1">Total Invoiced</div>
              <div className="text-lg font-bold text-white">
                ₹{invoices.reduce((sum, inv) => sum + Number(inv.amount), 0).toLocaleString('en-IN')}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-1">Total Paid</div>
              <div className="text-lg font-bold text-success-400">
                ₹{invoices.reduce((sum, inv) => {
                  const paid = (project.transactions || [])
                    .filter(t => t.invoiceId === inv.id && (t.type === 'Owner Direct Payment' || t.type === 'Bank Disbursement'))
                    .reduce((s, t) => s + Number(t.amount), 0);
                  return sum + paid;
                }, 0).toLocaleString('en-IN')}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-1">Outstanding</div>
              <div className="text-lg font-bold text-warning-400">
                ₹{invoices.reduce((sum, inv) => {
                  const paid = (project.transactions || [])
                    .filter(t => t.invoiceId === inv.id && (t.type === 'Owner Direct Payment' || t.type === 'Bank Disbursement'))
                    .reduce((s, t) => s + Number(t.amount), 0);
                  return sum + (Number(inv.amount) - paid);
                }, 0).toLocaleString('en-IN')}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-xs text-slate-400 mb-1">Paid Invoices</div>
              <div className="text-lg font-bold text-primary-400">
                {invoices.filter(inv => inv.status === 'Paid').length} / {invoices.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceList;


