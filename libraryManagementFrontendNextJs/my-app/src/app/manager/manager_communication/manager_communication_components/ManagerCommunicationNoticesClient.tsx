'use client';

import { useEffect } from 'react';
import { Megaphone, Plus, Trash2 } from 'lucide-react';
import { useManagerCommunicationStore } from '@/app/manager/manager_communication/manager_communication_store/manager_communication_store';
import { COMMUNICATION_STATUS_COLORS } from '@/app/manager/manager_communication/manager_communication_constants/manager_communication_constants';

export function ManagerCommunicationNoticesClient() {
  const { notices, stats, status, error, fetchNotices } = useManagerCommunicationStore();

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load notices: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Communication</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><Megaphone size={24} className="text-primary" /> Notices & Announcements</h1>
          <p className="text-sm text-text-secondary mt-1.5">Broadcast digital notices to students' dashboards.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
          <Plus size={16} /> New Notice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-text-secondary mb-1">Active Notices</h3>
          <div className="text-2xl font-bold text-text-primary">
            {stats?.activeNotices || 0}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Notice</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Posted By</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Posted Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Valid Till</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading notices...</td></tr>
              ) : notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{notice.title}</span>
                      <span className="text-sm text-text-secondary truncate max-w-[250px]">{notice.message}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary">{notice.postedBy}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{notice.postedDate}</td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">{notice.validTill}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${COMMUNICATION_STATUS_COLORS[notice.status]}`}>
                      {notice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-danger hover:underline inline-flex items-center gap-1">
                      <Trash2 size={14} /> Remove
                    </button>
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
