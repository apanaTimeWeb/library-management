'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { IndianRupee, FileText, Download, Mail, Plus } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { MANAGER_FINANCE_ROUTES } from '@/app/manager/manager_finance/manager_finance_url_config';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinanceInvoiceClient() {
  const { invoices, status, error, fetchInvoices } = useManagerFinanceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load invoices: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary">Invoices</h1>
          <p className="text-sm text-text-secondary mt-1.5">Manage billing records and track unpaid dues.</p>
        </div>
        <div className="flex gap-3">
          <Link href={MANAGER_FINANCE_ROUTES.PAYMENTS} className="px-4 py-2 bg-transparent border border-border text-text-primary rounded-lg text-sm font-medium hover:bg-bg-elevated transition-colors">
            Transactions
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
            <Plus size={16} /> Generate Invoice
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-bg-elevated/50">
          <h2 className="font-bold text-text-primary flex items-center gap-2">
            <FileText size={18} className="text-text-secondary" /> Invoice History
          </h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="w-full sm:w-auto px-3 py-1.5 bg-input border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50">
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Invoice No</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading invoices...</td></tr>
              ) : invoices.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">No invoices found.</td></tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-page transition-colors group">
                    <td className="px-6 py-4"><span className="font-mono text-sm font-semibold text-primary">{inv.invoiceNumber}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-text-primary">{inv.studentName}</span>
                        <span className="text-xs text-text-secondary">{inv.studentId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-text-primary flex items-center">
                        <IndianRupee size={14} className="mr-0.5" />{inv.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{inv.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-block ${STATUS_COLORS[inv.status]}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors" title="Download PDF">
                          <Download size={16} />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors" title="Send Reminder">
                          <Mail size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
