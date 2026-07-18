'use client';
// RESPONSIBILITY: Entry page for the admin_communication module.
// DATA FLOW: Next.js Router -> page -> Components

import { useState } from 'react';
import { ChevronRight, ArrowRight, CheckCheck } from 'lucide-react';
import { ADMIN_COMMUNICATION_MOCK_NOTIFICATIONS, ADMIN_COMMUNICATION_NOTIFICATION_CATS } from '@/app/admin/admin_communication/admin_communication_constants/AdminCommunicationConstants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Notification, Category } from "./AdminCommunicationNotificationCenterClient_types";

const ICON_CLS: Record<string, string> = {
  Finance: 'bg-success/10 text-success', CRM: 'bg-primary/10 text-primary',
  Operations: 'bg-info/10 text-info',  Attendance: 'bg-warning/10 text-warning',
};

export function AdminCommunicationNotificationCenterClient() {
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
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 uppercase tracking-wider mb-1">
            Communication <ChevronRight size={12} /> Notification Center
          </p>
          <h1 className="text-text-primaryxl font-bold tracking-tight">🔔 Notification Center</h1>
          <p className="text-sm text-muted-foreground mt-1">{unread} unread notifications requiring your attention.</p>
        </div>
        <Button variant="outline" onClick={markAllRead} disabled={unread === 0} className="gap-2">
          <CheckCheck size={16} /> Mark All Read
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Top Filter Bar */}
        <div className="flex flex-wrap gap-3">
          {ADMIN_COMMUNICATION_NOTIFICATION_CATS.map(c => (
            <Button
              key={c.id}
              variant={cat === c.id ? 'default' : 'outline'}
              className="rounded-full gap-2 px-4"
              onClick={() => setCat(c.id as Category)}
            >
              <span>{c.icon}</span><span>{c.label}</span>
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <Card className="shadow-sm border-border overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <div className="text-4xl mb-4">🔔</div>
              <p className="font-medium text-foreground">All caught up! No pending notifications.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map(n => (
                <div key={n.id} className={`p-4 flex flex-col md:flex-row gap-4 transition-colors ${n.read ? 'bg-bg-pageg-card hover:bg-muted/30' : 'bg-muted/10 hover:bg-muted/20'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${ICON_CLS[n.category] || 'bg-muted text-muted-foreground'}`}>
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className={`font-bold truncate ${n.read ? 'text-muted-foreground' : 'text-foreground'}`}>{n.title}</p>
                      <Badge variant="secondary" className={`${n.priority === 'High' ? 'bg-danger/10 text-danger hover:bg-danger/20' : 'bg-warning/10 text-warning hover:bg-warning/20'} border-none font-bold tracking-wide`}>
                        {n.priority === 'High' ? '🔴 High' : '🟡 Medium'}
                      </Badge>
                      {!n.read && <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground border-none font-bold tracking-wide">New</Badge>}
                    </div>
                    <p className={`text-sm ${n.read ? 'text-muted-foreground/80' : 'text-muted-foreground'}`}>{n.description}</p>
                  </div>
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0 md:min-w-28">
                    <span className="text-xs font-semibold text-muted-foreground">{n.time}</span>
                    <Link href={n.link} className="text-xs font-semibold text-info hover:text-info/80 flex items-center gap-1 group">
                      Go to page <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
