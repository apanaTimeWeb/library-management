'use client';

import { useEffect, useState } from 'react';
import { Ban, Settings2, PlayCircle, StopCircle } from 'lucide-react';
import { useManagerFinanceStore } from '@/app/manager/manager_finance/manager_finance_store/manager_finance_store';
import { STATUS_COLORS } from '@/app/manager/manager_finance/manager_finance_constants/manager_finance_constants';

export function ManagerFinanceAutoSuspendClient() {
  const { autoSuspendLogs, status, error, fetchAutoSuspendLogs } = useManagerFinanceStore();
  const [autoSuspendEnabled, setAutoSuspendEnabled] = useState(true);

  useEffect(() => {
    fetchAutoSuspendLogs();
  }, [fetchAutoSuspendLogs]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load auto-suspend logs: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><Ban size={24} className="text-danger" /> Auto-Suspend</h1>
          <p className="text-sm text-text-secondary mt-1.5">Configure and monitor automated account suspensions for unpaid dues.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-bg-elevated text-text-primary rounded-lg text-sm font-medium hover:border-primary transition-colors">
            <Settings2 size={16} /> Configure Rules
          </button>
          <button 
            onClick={() => setAutoSuspendEnabled(!autoSuspendEnabled)}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors ${autoSuspendEnabled ? 'bg-danger hover:bg-danger/90' : 'bg-success hover:bg-success/90'}`}
          >
            {autoSuspendEnabled ? <><StopCircle size={16} /> Disable Engine</> : <><PlayCircle size={16} /> Enable Engine</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-text-secondary mb-1">Engine Status</h3>
          <div className="text-lg font-bold flex items-center gap-2 mt-2">
            {autoSuspendEnabled ? (
              <span className="flex items-center text-success"><span className="w-2.5 h-2.5 bg-success rounded-full mr-2 animate-pulse" /> Active</span>
            ) : (
              <span className="flex items-center text-text-secondary"><span className="w-2.5 h-2.5 bg-text-secondary rounded-full mr-2" /> Paused</span>
            )}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm md:col-span-2">
          <h3 className="text-sm font-semibold text-text-secondary mb-2">Current Rule Set</h3>
          <p className="text-sm text-text-primary font-medium">
            Suspend access if <span className="text-danger">Monthly Subscription</span> is unpaid for <span className="text-danger">7 days</span> past the due date.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-bg-elevated/50">
          <h2 className="font-bold text-text-primary">Recent Enforcement Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Reason</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={5} className="p-8 text-center text-text-secondary">Loading logs...</td></tr>
              ) : autoSuspendLogs.map((log) => (
                <tr key={log.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{log.studentName}</span>
                      <span className="text-xs text-text-secondary">{log.studentId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{log.suspendDate}</td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">{log.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[log.status]}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {log.status === 'Suspended' ? (
                      <button className="px-3 py-1.5 bg-success/10 text-success hover:bg-success hover:text-white rounded-md text-xs font-medium transition-colors">
                        Reinstate
                      </button>
                    ) : (
                      <span className="text-xs text-text-secondary">Resolved</span>
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
