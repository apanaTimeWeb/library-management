'use client';

import { useEffect } from 'react';
import { History, Filter, Search } from 'lucide-react';
import { useManagerCommunicationStore } from '@/app/manager/manager_communication/manager_communication_store/manager_communication_store';
import { COMMUNICATION_STATUS_COLORS } from '@/app/manager/manager_communication/manager_communication_constants/manager_communication_constants';

export function ManagerCommunicationWhatsappLogsClient() {
  const { whatsappLogs, stats, status, error, fetchWhatsAppLogs } = useManagerCommunicationStore();

  useEffect(() => {
    fetchWhatsAppLogs();
  }, [fetchWhatsAppLogs]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load logs: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Communication</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><History size={24} className="text-[#25D366]" /> WhatsApp Logs</h1>
          <p className="text-sm text-text-secondary mt-1.5">Detailed history of automated WhatsApp messages sent to students.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-text-secondary mb-1">Total Messages Sent</h3>
          <div className="text-2xl font-bold text-text-primary">
            {stats?.whatsappMessagesSent.toLocaleString() || 0}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-bg-elevated/50">
          <div className="relative w-full max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input type="text" placeholder="Search logs..." className="w-full pl-9 pr-4 py-2 bg-page border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-border text-text-secondary rounded-lg text-sm font-medium hover:bg-bg-elevated transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Student Info</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Template Used</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Date Sent</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={4} className="p-8 text-center text-text-secondary">Loading logs...</td></tr>
              ) : whatsappLogs.map((log) => (
                <tr key={log.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{log.studentName}</span>
                      <span className="text-xs text-text-secondary font-mono mt-0.5">{log.phoneNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-text-primary">{log.templateUsed}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{log.sentDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${COMMUNICATION_STATUS_COLORS[log.status]}`}>
                      {log.status}
                    </span>
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
