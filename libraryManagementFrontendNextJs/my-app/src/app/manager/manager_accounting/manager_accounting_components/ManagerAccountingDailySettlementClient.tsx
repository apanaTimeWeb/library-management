'use client';

import { useEffect } from 'react';
import { Receipt, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useManagerAccountingStore } from '@/app/manager/manager_accounting/manager_accounting_store/manager_accounting_store';
import { ACCOUNTING_STATUS_COLORS } from '@/app/manager/manager_accounting/manager_accounting_constants/manager_accounting_constants';

export function ManagerAccountingDailySettlementClient() {
  const { dailySettlements, stats, status, error, fetchDailySettlements } = useManagerAccountingStore();

  useEffect(() => {
    fetchDailySettlements();
  }, [fetchDailySettlements]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load settlements: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Accounting</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><Receipt size={24} className="text-primary" /> Daily Settlement</h1>
          <p className="text-sm text-text-secondary mt-1.5">Reconcile expected system revenue against actual cash in the drawer.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`border rounded-xl p-5 shadow-sm ${stats && stats.dailySettlementDiff < 0 ? 'bg-danger-bg border-danger/30' : 'bg-success-bg border-success/30'}`}>
          <h3 className={`text-sm font-semibold mb-1 ${stats && stats.dailySettlementDiff < 0 ? 'text-danger' : 'text-success'}`}>Recent Settlement Diff</h3>
          <div className={`text-2xl font-bold flex items-center gap-2 ${stats && stats.dailySettlementDiff < 0 ? 'text-danger' : 'text-success'}`}>
            ₹{stats?.dailySettlementDiff.toLocaleString() || '0'}
            {stats && stats.dailySettlementDiff < 0 ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-bg-elevated/50">
          <h2 className="font-bold text-text-primary">Settlement Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Expected (System)</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Actual (Cash+UPI)</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Difference</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading settlements...</td></tr>
              ) : dailySettlements.map((settle) => (
                <tr key={settle.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4 font-medium text-text-primary">{settle.date}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">₹{settle.systemExpected.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-text-primary">₹{settle.totalActual.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${settle.difference < 0 ? 'text-danger' : 'text-success'}`}>
                      {settle.difference > 0 ? '+' : ''}₹{settle.difference.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ACCOUNTING_STATUS_COLORS[settle.status]}`}>
                      {settle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary text-right truncate max-w-[200px]" title={settle.notes}>
                    {settle.notes}
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
