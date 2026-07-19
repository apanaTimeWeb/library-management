'use client';

import { useEffect } from 'react';
import { BellRing, Send } from 'lucide-react';
import { useManagerCommunicationStore } from '@/app/manager/manager_communication/manager_communication_store/manager_communication_store';
import { COMMUNICATION_STATUS_COLORS } from '@/app/manager/manager_communication/manager_communication_constants/manager_communication_constants';

export function ManagerCommunicationNotificationCenterClient() {
  const { notifications, stats, status, error, fetchNotifications } = useManagerCommunicationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load notifications: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Communication</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><BellRing size={24} className="text-primary" /> Notification Center</h1>
          <p className="text-sm text-text-secondary mt-1.5">Broadcast push notifications to the student app.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
          <Send size={16} /> Send Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-text-secondary mb-1">Total Broadcasts Sent</h3>
          <div className="text-2xl font-bold text-text-primary">
            {stats?.notificationsSent.toLocaleString() || 0}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-bg-elevated/50">
          <h2 className="font-bold text-text-primary">Broadcast History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Notification</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Target Audience</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Sent By</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status & Reach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={5} className="p-8 text-center text-text-secondary">Loading history...</td></tr>
              ) : notifications.map((notif) => (
                <tr key={notif.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{notif.title}</span>
                      <span className="text-sm text-text-secondary truncate max-w-[250px]">{notif.message}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">{notif.targetAudience}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{notif.sentBy}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{notif.sentDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${COMMUNICATION_STATUS_COLORS[notif.status]}`}>
                        {notif.status}
                      </span>
                      <span className="text-xs text-text-secondary">Delivered to {notif.deliveredCount} users</span>
                    </div>
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
