'use client';

import { useEffect } from 'react';
import { Wrench, Calendar, Plus } from 'lucide-react';
import { useManagerAccountingStore } from '@/app/manager/manager_accounting/manager_accounting_store/manager_accounting_store';
import { ACCOUNTING_STATUS_COLORS } from '@/app/manager/manager_accounting/manager_accounting_constants/manager_accounting_constants';

export function ManagerAccountingAssetMaintenanceClient() {
  const { assetMaintenance, stats, status, error, fetchAssetMaintenance } = useManagerAccountingStore();

  useEffect(() => {
    fetchAssetMaintenance();
  }, [fetchAssetMaintenance]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load asset maintenance: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Accounting</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><Wrench size={24} className="text-primary" /> Asset Maintenance</h1>
          <p className="text-sm text-text-secondary mt-1.5">Schedule and track servicing for physical assets.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
          <Plus size={16} /> Schedule Maintenance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-text-secondary mb-1 flex items-center gap-2"><Calendar size={16} /> Pending Tasks</h3>
          <div className="text-2xl font-bold text-text-primary mt-2">
            {stats?.pendingMaintenance || 0}
          </div>
          <p className="text-xs text-text-secondary mt-1">Requires attention</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Asset</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Task</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Scheduled Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Est. Cost</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Assigned To</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={7} className="p-8 text-center text-text-secondary">Loading maintenance tasks...</td></tr>
              ) : assetMaintenance.map((task) => (
                <tr key={task.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{task.assetName}</span>
                      <span className="text-xs font-mono text-text-secondary">{task.assetId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary">{task.taskDescription}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{task.scheduledDate}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-text-primary">₹{task.estimatedCost.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{task.assignedTo}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ACCOUNTING_STATUS_COLORS[task.status]}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-primary hover:underline">Update</button>
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
