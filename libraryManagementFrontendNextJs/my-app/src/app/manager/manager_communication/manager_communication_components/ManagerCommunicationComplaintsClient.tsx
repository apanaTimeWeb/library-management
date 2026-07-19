'use client';

import { useEffect } from 'react';
import { MessageSquareWarning, Filter } from 'lucide-react';
import { useManagerCommunicationStore } from '@/app/manager/manager_communication/manager_communication_store/manager_communication_store';
import { COMMUNICATION_STATUS_COLORS } from '@/app/manager/manager_communication/manager_communication_constants/manager_communication_constants';

export function ManagerCommunicationComplaintsClient() {
  const { complaints, stats, status, error, fetchComplaints } = useManagerCommunicationStore();

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load complaints: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Communication</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><MessageSquareWarning size={24} className="text-primary" /> Complaints Helpdesk</h1>
          <p className="text-sm text-text-secondary mt-1.5">Track and resolve student grievances and facility issues.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-warning-bg border border-warning/30 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-warning mb-1">Open Tickets</h3>
          <div className="text-2xl font-bold text-warning">
            {stats?.openComplaints || 0}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-bg-elevated/50">
          <h2 className="font-bold text-text-primary">Recent Tickets</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-border text-text-secondary rounded-lg text-sm font-medium hover:bg-bg-elevated transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Ticket</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Student</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Category & Priority</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading tickets...</td></tr>
              ) : complaints.map((tkt) => (
                <tr key={tkt.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-mono text-xs text-text-secondary">{tkt.ticketId}</span>
                      <span className="text-sm text-text-primary truncate max-w-[200px] mt-1" title={tkt.description}>{tkt.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{tkt.studentName}</span>
                      <span className="text-xs text-text-secondary">{tkt.studentId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-primary">{tkt.category}</span>
                      <span className={`text-xs mt-1 ${COMMUNICATION_STATUS_COLORS[tkt.priority]}`}>{tkt.priority}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{tkt.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${COMMUNICATION_STATUS_COLORS[tkt.status]}`}>
                      {tkt.status}
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
