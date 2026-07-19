'use client';

import { useEffect } from 'react';
import { Shield, Plus } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinanceSecurityDepositsClient() {
  const { securityDeposits, status, error, fetchSecurityDeposits } = useManagerFinanceStore();

  useEffect(() => {
    fetchSecurityDeposits();
  }, [fetchSecurityDeposits]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load security deposits: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><Shield size={24} className="text-primary" /> Security Deposits</h1>
          <p className="text-sm text-text-secondary mt-1.5">Track and manage refundable security deposits.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
          <Plus size={16} /> Record Deposit
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Date Collected</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={5} className="p-8 text-center text-text-secondary">Loading deposits...</td></tr>
              ) : securityDeposits.map((dep) => (
                <tr key={dep.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{dep.studentName}</span>
                      <span className="text-xs text-text-secondary">{dep.studentId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">₹{dep.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{dep.dateCollected}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[dep.status]}`}>
                      {dep.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {dep.status === 'Held' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-xs font-medium text-danger hover:underline">Forfeit</button>
                        <button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-xs font-medium transition-colors">
                          Refund
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-text-secondary">Processed</span>
                    )}
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
