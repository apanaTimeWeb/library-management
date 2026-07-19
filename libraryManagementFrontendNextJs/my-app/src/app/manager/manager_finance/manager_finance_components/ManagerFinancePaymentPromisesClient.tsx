'use client';

import { useEffect } from 'react';
import { Handshake, CalendarClock } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinancePaymentPromisesClient() {
  const { paymentPromises, status, error, fetchPaymentPromises } = useManagerFinanceStore();

  useEffect(() => {
    fetchPaymentPromises();
  }, [fetchPaymentPromises]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load payment promises: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><Handshake size={24} className="text-primary" /> Payment Promises</h1>
          <p className="text-sm text-text-secondary mt-1.5">Track extended payment deadlines requested by students.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Promised Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Promised Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={5} className="p-8 text-center text-text-secondary">Loading promises...</td></tr>
              ) : paymentPromises.map((promise) => (
                <tr key={promise.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{promise.studentName}</span>
                      <span className="text-xs text-text-secondary">{promise.studentId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">₹{promise.promisedAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-primary flex items-center gap-1.5">
                      <CalendarClock size={14} className="text-text-secondary" /> {promise.promisedDate}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[promise.status]}`}>
                      {promise.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {promise.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 border border-border text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-md text-xs font-medium transition-colors">
                          Remind
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-text-secondary">Closed</span>
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
