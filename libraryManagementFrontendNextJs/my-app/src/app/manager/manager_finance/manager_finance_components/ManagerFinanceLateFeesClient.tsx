'use client';

import { useEffect } from 'react';
import { Clock, Check } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinanceLateFeesClient() {
  const { lateFees, status, error, fetchLateFees } = useManagerFinanceStore();

  useEffect(() => {
    fetchLateFees();
  }, [fetchLateFees]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load late fees: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><Clock size={24} className="text-warning" /> Late Fees</h1>
          <p className="text-sm text-text-secondary mt-1.5">Manage penalties for overdue payments.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Days Late</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Base Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Fine</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading late fees...</td></tr>
              ) : lateFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{fee.studentName}</span>
                      <span className="text-xs text-text-secondary">{fee.studentId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-danger font-medium">{fee.daysLate} Days</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary">₹{fee.baseAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-warning">₹{fee.fineAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[fee.status]}`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {fee.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors">Waive</button>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-success text-white rounded-md text-xs font-medium hover:bg-success/90 transition-colors">
                          Collect
                        </button>
                      </div>
                    ) : (
                      <span className="text-success inline-flex items-center gap-1 text-sm font-medium"><Check size={16} /> Resolved</span>
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
