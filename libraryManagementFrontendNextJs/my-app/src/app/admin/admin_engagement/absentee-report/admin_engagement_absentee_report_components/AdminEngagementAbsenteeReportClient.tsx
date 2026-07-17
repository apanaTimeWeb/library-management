'use client';

// RESPONSIBILITY: Entry page for the admin_engagement module.
// DATA FLOW: Next.js Router -> Page -> Components

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Send, Mail, Phone, AlertCircle } from 'lucide-react';
import { ADMIN_ENGAGEMENT_MOCK_ABSENTEES } from '@/app/admin/admin_engagement/admin_engagement_constants/AdminEngagementConstants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

interface AbsenteeRow {
  id: string; name: string; initials: string; smartId: string;
  shift: string; daysAbsent: number; lastSeen: string;
  parentPhone: string; parentEmail: string; notified: boolean;
}

export function AdminEngagementAbsenteeReportClient() {
  const [threshold, setThreshold] = useState('3');
  const [shift, setShift]         = useState('All');
  const [rows, setRows]           = useState<AbsenteeRow[]>(ADMIN_ENGAGEMENT_MOCK_ABSENTEES as AbsenteeRow[]);

  const filtered = rows.filter(r => {
    const thr = threshold === 'all' ? 0 : parseInt(threshold);
    return r.daysAbsent >= thr && (shift === 'All' || r.shift === shift);
  });

  const critical  = filtered.filter(r => r.daysAbsent >= 7);
  const moderate  = filtered.filter(r => r.daysAbsent >= 3 && r.daysAbsent < 7);

  const notify = (id: string) => {
    setRows(p => p.map(r => r.id === id ? { ...r, notified: true } : r));
    toast.success('Alert sent to parent successfully');
  };

  const notifyAll = () => {
    const targets = filtered.filter(r => !r.notified);
    if (!targets.length) {
      toast.success('All parents already notified');
      return;
    }
    setRows(p => p.map(r => filtered.find(f=>f.id===r.id) ? { ...r, notified:true } : r));
    toast.success(`Bulk alerts sent to ${targets.length} parents`);
  };

  const badgeClass = (d: number) => d >= 7 ? 'bg-danger/10 text-danger hover:bg-danger/20' : 'bg-warning/10 text-warning hover:bg-warning/20';
  const rowClass = (d: number) => d >= 7 ? 'bg-danger/5 hover:bg-danger/10' : d >= 3 ? 'bg-warning/5 hover:bg-warning/10' : 'hover:bg-muted/30';
  
  return (
    <div className="space-y-6 pb-10">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 uppercase tracking-wider mb-1">
            Engagement <ChevronRight size={12} /> Absentee Report
          </p>
          <h1 className="text-2xl font-bold tracking-tight">📋 Absentee Report</h1>
          <p className="text-sm text-muted-foreground mt-1">Students with consecutive absences requiring attention.</p>
        </div>
        <Button onClick={notifyAll} className="gap-2">
          <Send size={16} /> Bulk Alert Parents
        </Button>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Absentees</p>
          <p className="text-3xl font-bold text-foreground mb-1">{filtered.length}</p>
          <p className="text-xs font-medium text-muted-foreground">above {threshold === 'all' ? '0' : threshold} day threshold</p>
        </Card>
        <Card className="p-4 shadow-sm border-danger/20 bg-danger/5">
          <p className="text-xs font-semibold text-danger uppercase tracking-wider mb-1">Critical (7+ days)</p>
          <p className="text-3xl font-bold text-danger mb-1">{critical.length}</p>
          <p className="text-xs font-medium text-danger/70">Immediate action needed</p>
        </Card>
        <Card className="p-4 shadow-sm border-warning/20 bg-warning/5">
          <p className="text-xs font-semibold text-warning uppercase tracking-wider mb-1">Moderate (3–6 days)</p>
          <p className="text-3xl font-bold text-warning mb-1">{moderate.length}</p>
          <p className="text-xs font-medium text-warning/70">Monitoring required</p>
        </Card>
        <Card className="p-4 shadow-sm border-success/20 bg-success/5">
          <p className="text-xs font-semibold text-success uppercase tracking-wider mb-1">Parents Notified</p>
          <p className="text-3xl font-bold text-success mb-1">{filtered.filter(r=>r.notified).length}</p>
          <p className="text-xs font-medium text-success/70">of {filtered.length} total</p>
        </Card>
      </div>

      {/* ── Filters ── */}
      <Card className="p-4 border-border shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col">
            <label className="text-xs mb-1 font-semibold text-muted-foreground uppercase tracking-wider">Days Threshold</label>
            <select value={threshold} onChange={e => setThreshold(e.target.value)} className="flex h-9 w-44 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="3">3+ Days</option>
              <option value="5">5+ Days</option>
              <option value="7">7+ Days (Critical)</option>
              <option value="all">Show All</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs mb-1 font-semibold text-muted-foreground uppercase tracking-wider">Shift</label>
            <select value={shift} onChange={e => setShift(e.target.value)} className="flex h-9 w-36 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option>All</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-danger/10 text-danger border-none font-bold">{critical.length} critical</Badge>
          <Badge variant="secondary" className="bg-warning/10 text-warning border-none font-bold">{moderate.length} moderate</Badge>
          <Badge variant="secondary" className="bg-success/10 text-success border-none font-bold">{filtered.filter(r=>r.notified).length} notified</Badge>
        </div>
      </Card>

      {/* ── Table ── */}
      <Card className="overflow-x-auto shadow-sm border-border">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <div className="text-4xl mb-4">🎉</div>
            <p className="font-medium text-foreground mb-1 text-lg">No absentees above threshold!</p>
            <p className="text-sm">All students have great attendance above the selected threshold.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Smart ID</th>
                <th className="py-3 px-4">Shift</th>
                <th className="py-3 px-4">Days Absent</th>
                <th className="py-3 px-4">Last Seen</th>
                <th className="py-3 px-4">Parent Contact</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr key={r.id} className={`transition-colors ${rowClass(r.daysAbsent)}`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {r.initials}
                      </div>
                      <span className="font-bold text-foreground">{r.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono font-medium text-muted-foreground">{r.smartId}</td>
                  <td className="py-4 px-4">
                    <Badge variant="outline" className="font-medium bg-background">{r.shift}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="secondary" className={`${badgeClass(r.daysAbsent)} border-none font-bold tracking-wide px-3 py-1 text-sm`}>
                      {r.daysAbsent} days
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground font-medium">{r.lastSeen}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <Phone size={12} className="text-muted-foreground" /> {r.parentPhone}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail size={12} className="text-muted-foreground" /> {r.parentEmail}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center">
                      {r.notified ? (
                        <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20 border-none font-bold gap-1">
                          ✅ Notified
                        </Badge>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => notify(r.id)} className="h-8 text-primary hover:text-primary hover:bg-primary/10 gap-1 font-semibold">
                          <Send size={14} /> Alert
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
