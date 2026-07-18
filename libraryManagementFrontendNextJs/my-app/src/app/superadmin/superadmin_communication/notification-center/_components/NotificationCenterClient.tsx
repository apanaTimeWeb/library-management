// RESPONSIBILITY: Renders the NotificationCenterClient component.
'use client';

import React from 'react';
import { ChevronRight, ArrowRight, CheckCheck, DollarSign, Phone, Handshake, Armchair, Calendar, Clock, Lock, Bell, AlertCircle, Circle } from 'lucide-react';
import { useNotificationCenterClient } from '@/app/superadmin/superadmin_communication/notification-center/_components/useNotificationCenterClient';
import type { SuperadminCommunicationNotification as Notification } from '@/app/superadmin/superadmin_communication/superadmin_communication_types/SuperadminCommunicationTypes';



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
  Finance: 'bg-success/10 text-success', 
  CRM: 'bg-info/10 text-info',
  Operations: 'bg-warning/10 text-warning',  
  Attendance: 'bg-primary/10 text-primary',
};

export type Category = 'All'|'System'|'Billing'|'Security'|'Updates';

export function NotificationCenterClient() {
  const { cat, setCat, filtered, unread, markAllRead } = useNotificationCenterClient();

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-bg-page animate-in fade-in duration-200">
      {/* ── Page Header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-[12px] font-bold tracking-wide mb-6">
          <span className="hover:text-primary transition-colors cursor-pointer">Communication</span>
          <ChevronRight size={12} className="opacity-50" />
          <span className="text-text-primary">Notification Center</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-extrabold text-text-primary tracking-tight flex items-center gap-3">
              <Bell size={28} className="text-primary" /> Notification Center
            </h1>
            <p className="text-[14px] text-text-secondary mt-1"><strong className="text-primary">{unread}</strong> unread notifications requiring your attention.</p>
          </div>
          <button onClick={markAllRead} className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-text-secondary hover:text-text-primary bg-card hover:bg-input border border-border rounded-[var(--radius-md)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm" disabled={unread === 0}>
            <CheckCheck size={16} /> Mark All Read
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 max-w-5xl">
        {/* Top Filter Bar */}
        <div className="flex flex-wrap gap-3">
          {CATS.map(( c ) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`flex items-center gap-2 px-4 py-2 text-[13px] font-bold rounded-full transition-all cursor-pointer ${
                cat === c.id 
                  ? 'bg-primary text-primary-foreground shadow-sm scale-105' 
                  : 'bg-card text-text-secondary hover:bg-input border border-border hover:border-border/80'
              }`}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="bg-card border border-border rounded-[var(--radius-xl)] shadow-sm overflow-hidden flex flex-col">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-center text-text-secondary">
              <div className="h-24 w-24 rounded-full bg-input/50 flex items-center justify-center mb-6">
                <Bell size={48} className="opacity-50 text-primary"/>
              </div>
              <p className="text-[18px] font-extrabold text-text-primary">All caught up!</p>
              <p className="text-[14px] mt-2">No pending notifications in this category.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map(( n: Notification ) => (
                <div key={n.id} className={`flex flex-col sm:flex-row sm:items-start gap-4 p-5 transition-colors hover:bg-input/30 ${n.read ? 'opacity-70 grayscale-[20%]' : 'bg-primary/[0.02]'}`}>
                  <div className={`h-12 w-12 shrink-0 rounded-full flex items-center justify-center ${ICON_CLS[n.category] || 'bg-muted text-text-secondary'}`}>
                    {ICON_MAP[n.icon] || <Bell size={20}/>}
                  </div>
                  
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <p className={`text-[15px] font-extrabold truncate ${n.read ? 'text-text-primary' : 'text-primary'}`}>{n.title}</p>
                      
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1 ${n.priority === 'High' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'}`}>
                        <Circle size={8} fill="currentColor" /> {n.priority}
                      </span>
                      
                      {!n.read && <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-primary text-primary-foreground animate-pulse shadow-sm">New</span>}
                    </div>
                    
                    <p className="text-[14px] text-text-secondary leading-relaxed mb-3">{n.description}</p>
                    
                    <div className="flex items-center gap-4 text-[12px] font-bold">
                      <span className="text-text-secondary/70">{n.time}</span>
                      <a href={n.link} className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors hover:underline underline-offset-4">
                        Go to page <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
