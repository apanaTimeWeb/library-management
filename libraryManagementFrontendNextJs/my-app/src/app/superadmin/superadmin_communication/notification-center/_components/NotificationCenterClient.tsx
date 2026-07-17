'use client';

import { useState } from 'react';
import { ChevronRight, ArrowRight, CheckCheck, DollarSign, Phone, Handshake, Armchair, Calendar, Clock, Lock, Bell, AlertCircle, Circle } from 'lucide-react';

import { SUPERADMIN_COMMUNICATION_MOCK_NOTIFICATIONS } from '@superadmin/superadmin_communication/superadmin_communication_data/SuperadminCommunicationMockData';

type Category = 'All' | 'Finance' | 'CRM' | 'Operations' | 'Attendance' | 'High Only';

interface Notification {
  id: string; category: 'Finance' | 'CRM' | 'Operations' | 'Attendance';
  icon: string; title: string; description: string;
  time: string; priority: 'High' | 'Medium'; link: string; read: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign size={20}/>,
  Phone: <Phone size={20}/>,
  Handshake: <Handshake size={20}/>,
  Armchair: <Armchair size={20}/>,
  Calendar: <Calendar size={20}/>,
  Clock: <Clock size={20}/>,
  Lock: <Lock size={20}/>,
};



const CATS: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: 'All',        label: 'All Notifications',  icon: <Bell size={16}/> },
  { id: 'Finance',    label: 'Finance',             icon: <DollarSign size={16}/> },
  { id: 'CRM',        label: 'CRM',                 icon: <Phone size={16}/> },
  { id: 'Operations', label: 'Operations',          icon: <Armchair size={16}/> },
  { id: 'Attendance', label: 'Attendance',          icon: <Calendar size={16}/> },
  { id: 'High Only',  label: 'Priority: High Only', icon: <AlertCircle size={16}/> },
];

const ICON_CLS: Record<string, string> = {
  Finance: 'eng-notif-icon--finance', CRM: 'eng-notif-icon--crm',
  Operations: 'eng-notif-icon--ops',  Attendance: 'eng-notif-icon--attend',
};

export function NotificationCenterClient() {
  const [cat, setCat]       = useState<Category>('All');
  const [notifs, setNotifs] = useState<Notification[]>(SUPERADMIN_COMMUNICATION_MOCK_NOTIFICATIONS as Notification[]);

  const filtered = notifs.filter(n => {
    if (cat === 'All')       return true;
    if (cat === 'High Only') return n.priority === 'High';
    return n.category === cat;
  });

  const unread = notifs.filter(n => !n.read).length;
  const markAllRead = () => setNotifs(prev => prev.map(( n: Notification ) => ({ ...n, read: true })));

  return (
    <div className="eng-page">
      <div className="mb-8">
        <div className="eng-breadcrumb">
          <span>Communication</span><ChevronRight size={12} /><span>Notification Center</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="eng-page-title flex items-center gap-2"><Bell size={24} /> Notification Center</h1>
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
          {CATS.map(( c: typeof CATS[number] ) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`eng-notif-cat${cat === c.id ? ' eng-notif-cat--active' : ''}`}
              style={{ width: 'auto', padding: '8px 16px', borderRadius: '30px' }}>
              <span className="flex items-center gap-2">{c.icon} {c.label}</span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="eng-card eng-card--flush">
          {filtered.length === 0 ? (
            <div className="eng-empty">
              <div className="eng-empty__icon"><Bell size={48} className="mx-auto text-text-disabled"/></div>
              <p className="eng-empty__title">All caught up! No pending notifications.</p>
            </div>
          ) : (
            filtered.map(( n: Notification ) => (
              <div key={n.id} className={`eng-notif-item${n.read ? ' eng-notif-read' : ''}`}>
                <div className={`eng-notif-icon ${ICON_CLS[n.category]}`}>{ICON_MAP[n.icon]}</div>
                <div className="eng-flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="eng-notif-title">{n.title}</p>
                    <span className={`eng-badge ${n.priority === 'High' ? 'eng-badge--danger' : 'eng-badge--warning'} flex items-center gap-1`}>
                      {n.priority === 'High' ? <><Circle size={10} fill="currentColor" /> High</> : <><Circle size={10} fill="currentColor" /> Medium</>}
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
