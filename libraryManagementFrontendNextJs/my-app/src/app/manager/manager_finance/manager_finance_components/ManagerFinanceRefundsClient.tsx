'use client';

import { useEffect } from 'react';
import { DollarSign, Check, X } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinanceRefundsClient() {
  const { refunds, status, error, fetchRefunds } = useManagerFinanceStore();

  useEffect(() => {
    fetchRefunds();
  }, [fetchRefunds]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load refunds: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><DollarSign size={24} className="text-primary" /> Refunds</h1>
          <p className="text-sm text-text-secondary mt-1.5">Manage and process student refund requests.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Request ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Reason</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading refunds...</td></tr>
              ) : refunds.map((ref) => (
                <tr key={ref.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-text-primary">{ref.requestId}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{ref.studentName}</span>
                      <span className="text-xs text-text-secondary">{ref.studentId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">₹{ref.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{ref.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[ref.status]}`}>
                      {ref.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {ref.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-danger bg-danger/10 hover:bg-danger hover:text-white rounded transition-colors" title="Reject">
                          <X size={16} />
                        </button>
                        <button className="p-1.5 text-success bg-success/10 hover:bg-success hover:text-white rounded transition-colors" title="Approve">
                          <Check size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-text-secondary">Completed</span>
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
