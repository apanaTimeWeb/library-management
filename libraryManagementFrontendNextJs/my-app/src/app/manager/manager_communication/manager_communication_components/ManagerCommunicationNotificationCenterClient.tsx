'use client';
// RESPONSIBILITY: Renders the notification center for manager alerts.
import { useState } from 'react';
import { ChevronRight, ArrowRight, CheckCheck } from 'lucide-react';
import { Notification, Category } from '@/app/manager/manager_communication/manager_communication_types/ManagerCommunicationTypes';
import { NOTIFS_DATA, NOTIF_CATEGORIES } from '@/app/manager/manager_communication/manager_communication_constants/ManagerCommunicationConstants';

// Types and constants centralized.

const CATS: { id: Category; label: string; icon: string }[] = [
  { id: 'All',        label: 'All Notifications',  icon: '🔔' },
  { id: 'Finance',    label: 'Finance',             icon: '💰' },
  { id: 'CRM',        label: 'CRM',                 icon: '📞' },
  { id: 'Operations', label: 'Operations',          icon: '🪑' },
  { id: 'Attendance', label: 'Attendance',          icon: '📅' },
  { id: 'High Only',  label: 'Priority: High Only', icon: '🔴' },
];

const ICON_CLS: Record<string, string> = {
  Finance: 'eng-notif-icon--finance', CRM: 'eng-notif-icon--crm',
  Operations: 'eng-notif-icon--ops',  Attendance: 'eng-notif-icon--attend',
};

export function ManagerCommunicationNotificationCenterClient() {
  const [cat, setCat]       = useState<Category>('All');
  const [notifs, setNotifs] = useState<Notification[]>(NOTIFS_DATA);

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
          {CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`w-auto px-[16px] py-2 rounded-[30px] eng-notif-cat${cat === c.id ? ' eng-notif-cat--active' : ''}`}>
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
                <div className={`eng-notif-icon ${ICON_CLS[n.category] || ''}`}>{n.icon}</div>
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

