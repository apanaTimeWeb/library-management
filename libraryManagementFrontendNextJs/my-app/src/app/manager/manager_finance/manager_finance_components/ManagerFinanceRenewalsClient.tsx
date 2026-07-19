'use client';

import { useEffect } from 'react';
import { RotateCcw, AlertTriangle, MessageSquare } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinanceRenewalsClient() {
  const { renewals, status, error, fetchRenewals } = useManagerFinanceStore();

  useEffect(() => {
    fetchRenewals();
  }, [fetchRenewals]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load renewals: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
        <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><RotateCcw size={24} className="text-primary" /> Renewals</h1>
        <p className="text-sm text-text-secondary mt-1.5">Track upcoming renewals and retain students.</p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Due Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={5} className="p-8 text-center text-text-secondary">Loading renewals...</td></tr>
              ) : renewals.map((ren) => (
                <tr key={ren.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{ren.studentName}</span>
                      <span className="text-xs text-text-secondary">{ren.studentId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-primary">{ren.dueDate}</span>
                    <br/>
                    <span className={`text-xs font-medium ${ren.daysLeft < 0 ? 'text-danger' : 'text-warning'}`}>
                      {ren.daysLeft < 0 ? `Overdue by ${Math.abs(ren.daysLeft)} days` : `Due in ${ren.daysLeft} days`}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">₹{ren.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[ren.status]}`}>
                      {ren.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="flex items-center gap-1 ml-auto px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-xs font-medium transition-colors">
                      <MessageSquare size={14} /> Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
