'use client';
// RESPONSIBILITY: Entry page for the admin_communication module.
// DATA FLOW: Next.js Router -> Page -> Components

import { useState } from 'react';
import { ChevronRight, ArrowRight, CheckCheck } from 'lucide-react';
import { ADMIN_COMMUNICATION_MOCK_NOTIFICATIONS, ADMIN_COMMUNICATION_NOTIFICATION_CATS } from '@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants';

type Category = 'All' | 'Finance' | 'CRM' | 'Operations' | 'Attendance' | 'High Only';

interface Notification {
  id: string; category: 'Finance' | 'CRM' | 'Operations' | 'Attendance';
  icon: string; title: string; description: string;
  time: string; priority: 'High' | 'Medium'; link: string; read: boolean;
}



const ICON_CLS: Record<string, string> = {
  Finance: 'eng-notif-icon--finance', CRM: 'eng-notif-icon--crm',
  Operations: 'eng-notif-icon--ops',  Attendance: 'eng-notif-icon--attend',
};

export default function NotificationCenterPage() {
  const [cat, setCat]       = useState<Category>('All');
  const [notifs, setNotifs] = useState<Notification[]>(ADMIN_COMMUNICATION_MOCK_NOTIFICATIONS as Notification[]);

  const filtered = notifs.filter(n => {
    if (cat === 'All')       return true;
    if (cat === 'High Only') return n.priority === 'High';
    return n.category === cat;
  });

  const unread = notifs.filter(n => !n.read).length;
  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="eng-page">
      <div className="mb-8">
        <div className="eng-breadcrumb">
          <span>Communication</span><ChevronRight size={12} /><span>Notification Center</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="eng-page-title">🔔 Notification Center</h1>
            <p className="eng-page-subtitle">{unread} unread notifications requiring your attention.</p>
          </div>
          <button onClick={markAllRead} className="eng-btn-ghost" disabled={unread === 0}>
            <CheckCheck size={16} /> Mark All Read
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Top Filter Bar */}
        <div className="eng-notif-topbar flex flex-wrap gap-3">
          {ADMIN_COMMUNICATION_NOTIFICATION_CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`eng-notif-cat${cat === c.id ? ' eng-notif-cat--active' : ''}`}
              style={{ width: 'auto', padding: '8px 16px', borderRadius: '30px' }}>
              <span>{c.icon}</span><span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="eng-card eng-card--flush">
          {filtered.length === 0 ? (
            <div className="eng-empty">
              <div className="eng-empty__icon">🔔</div>
              <p className="eng-empty__title">All caught up! No pending notifications.</p>
            </div>
          ) : (
            filtered.map(n => (
              <div key={n.id} className={`eng-notif-item${n.read ? ' eng-notif-read' : ''}`}>
                <div className={`eng-notif-icon ${ICON_CLS[n.category]}`}>{n.icon}</div>
                <div className="eng-flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="eng-notif-title">{n.title}</p>
                    <span className={`eng-badge ${n.priority === 'High' ? 'eng-badge--danger' : 'eng-badge--warning'}`}>
                      {n.priority === 'High' ? '🔴 High' : '🟡 Medium'}
                    </span>
                    {!n.read && <span className="eng-badge eng-badge--primary">New</span>}
                  </div>
                  <p className="eng-notif-desc">{n.description}</p>
                </div>
                <div className="eng-notif-meta">
                  <span className="eng-notif-time">{n.time}</span>
                  <a href={n.link} className="eng-notif-link">
                    Go to page <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

