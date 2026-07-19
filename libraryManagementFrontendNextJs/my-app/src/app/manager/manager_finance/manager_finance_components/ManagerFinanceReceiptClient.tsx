'use client';

import { FileText, Download, Printer, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { MANAGER_FINANCE_ROUTES } from '@/app/manager/manager_finance/manager_finance_url_config';

export function ManagerFinanceReceiptClient() {
  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary">Payment Receipt</h1>
          <p className="text-sm text-text-secondary mt-1.5">View and download transaction receipts.</p>
        </div>
        <div className="flex gap-3">
          <Link href={MANAGER_FINANCE_ROUTES.PAYMENTS} className="px-4 py-2 bg-transparent border border-border text-text-primary rounded-lg text-sm font-medium hover:bg-bg-elevated transition-colors">
            Back to Payments
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-border text-text-primary rounded-lg text-sm font-medium hover:border-primary/50 transition-colors">
            <Printer size={16} /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Receipt Header */}
        <div className="p-8 border-b border-border bg-bg-elevated/30 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-1">SMART LIBRARY 360</h2>
            <p className="text-sm text-text-secondary">123 Learning Avenue, Knowledge Park</p>
            <p className="text-sm text-text-secondary">contact@smartlibrary.com | +91 98765 43210</p>
          </div>
          <div className="text-right">
            <h3 className="text-xl font-bold text-text-primary mb-1 tracking-wider uppercase">Receipt</h3>
            <p className="text-sm font-mono text-text-secondary">RCPT-2024-0892</p>
            <p className="text-sm text-text-secondary mt-1">Date: 24 Oct 2024</p>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8 text-success bg-success/10 p-4 rounded-lg border border-success/20">
            <CheckCircle size={24} />
            <div>
              <p className="font-bold">Payment Successful</p>
              <p className="text-sm opacity-90">Transaction ID: TXN-001 (UPI)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Billed To</h4>
              <p className="font-bold text-text-primary text-lg">Alex Rivera</p>
              <p className="text-sm font-mono text-text-secondary mt-1">ID: LIB-001</p>
              <p className="text-sm text-text-secondary mt-1">Seat: A-12 (Morning Shift)</p>
            </div>
          </div>

          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="py-3 text-sm font-semibold text-text-primary">Description</th>
                <th className="py-3 text-sm font-semibold text-text-primary text-right w-32">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-4 text-sm text-text-secondary">Monthly Subscription Fee (Nov 2024)</td>
                <td className="py-4 text-sm font-medium text-text-primary text-right">₹1,500.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border">
                <td className="py-4 text-base font-bold text-text-primary text-right">Total Paid:</td>
                <td className="py-4 text-lg font-bold text-primary text-right">₹1,500.00</td>
              </tr>
            </tfoot>
          </table>

          <div className="text-center text-sm text-text-secondary pt-8 border-t border-border border-dashed">
            <p>Thank you for your payment!</p>
            <p className="mt-1">This is a computer generated receipt and does not require a signature.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
