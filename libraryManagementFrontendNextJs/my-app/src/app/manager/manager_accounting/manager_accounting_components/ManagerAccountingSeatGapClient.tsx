'use client';

import { useEffect } from 'react';
import { LayoutGrid, AlertTriangle } from 'lucide-react';
import { useManagerAccountingStore } from '@/app/manager/manager_accounting/manager_accounting_store/manager_accounting_store';

export function ManagerAccountingSeatGapClient() {
  const { seatGaps, status, error, fetchSeatGaps } = useManagerAccountingStore();

  useEffect(() => {
    fetchSeatGaps();
  }, [fetchSeatGaps]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load seat gaps: {error}</div>;
  }

  const totalLostRevenue = seatGaps.reduce((acc, curr) => acc + curr.potentialLostRevenue, 0);

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Accounting</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><LayoutGrid size={24} className="text-primary" /> Seat Gap Report</h1>
          <p className="text-sm text-text-secondary mt-1.5">Analyze unsold inventory and visualize lost revenue across shifts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-danger-bg border border-danger/30 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-danger mb-1 flex items-center gap-2">
            <AlertTriangle size={16} /> Total Potential Lost Revenue
          </h3>
          <div className="text-2xl font-bold text-danger mt-2">
            ₹{totalLostRevenue.toLocaleString()}
          </div>
          <p className="text-xs text-danger mt-1">Based on current empty seats</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-bg-elevated/50">
          <h2 className="font-bold text-text-primary">Shift-wise Analysis</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Shift Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Total Seats</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Occupied</th>
                <th className="px-6 py-3 text-xs font-semibold text-danger uppercase">Empty (Gap)</th>
                <th className="px-6 py-3 text-xs font-semibold text-danger uppercase text-right">Lost Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading seat gaps...</td></tr>
              ) : seatGaps.map((gap) => (
                <tr key={gap.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4 text-sm text-text-secondary">{gap.date}</td>
                  <td className="px-6 py-4 font-medium text-text-primary">{gap.shiftName}</td>
                  <td className="px-6 py-4 text-sm text-text-primary">{gap.totalSeats}</td>
                  <td className="px-6 py-4 text-sm font-bold text-success">{gap.occupiedSeats}</td>
                  <td className="px-6 py-4 text-sm font-bold text-danger">{gap.emptySeats}</td>
                  <td className="px-6 py-4 text-sm font-bold text-danger text-right">₹{gap.potentialLostRevenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
