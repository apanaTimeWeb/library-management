'use client';

// RESPONSIBILITY: Entry page for the admin_engagement module.
// DATA FLOW: Next.js Router -> Page -> Components

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Save, FileBarChart2, Bell, CheckCircle, Clock } from 'lucide-react';
import { ADMIN_ENGAGEMENT_MOCK_ATTENDANCE } from '@/app/admin/admin_engagement/admin_engagement_constants/AdminEngagementConstants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

type AttStatus = 'present' | 'absent' | 'late' | null;

interface Student {
  id: string; smartId: string; name: string; initials: string;
  shift: string; consecutiveAbsent: number;
  status: AttStatus; inTime: string; outTime: string;
}

const today = new Date().toISOString().split('T')[0];

export function AdminEngagementAttendanceClient() {
  const [date, setDate]         = useState(today);
  const [shift, setShift]       = useState('All');
  const [students, setStudents] = useState<Student[]>(ADMIN_ENGAGEMENT_MOCK_ATTENDANCE as Student[]);
  const [saved, setSaved]       = useState(false);
  const [alerted, setAlerted]   = useState<Set<string>>(new Set());

  const filtered = shift === 'All' ? students : students.filter(s => s.shift === shift);
  const marked   = filtered.filter(s => s.status !== null).length;
  const present  = filtered.filter(s => s.status === 'present').length;
  const absent   = filtered.filter(s => s.status === 'absent').length;
  const late     = filtered.filter(s => s.status === 'late').length;

  const setStatus = (id: string, status: AttStatus) =>
    setStudents(p => p.map(s => s.id === id ? { ...s, status } : s));

  const setField = (id: string, field: 'inTime'|'outTime', val: string) =>
    setStudents(p => p.map(s => s.id === id ? { ...s, [field]: val } : s));

  const handleAlert = (id: string) => {
    setAlerted(p => new Set(p).add(id));
    toast.success('Parents alerted via SMS');
  };

  const handleSave = () => {
    setSaved(true);
    toast.success('Attendance saved');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-24 relative">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 uppercase tracking-wider mb-1">
            Engagement <ChevronRight size={12} /> Attendance
          </p>
          <h1 className="text-2xl font-bold tracking-tight">📅 Daily Attendance</h1>
          <p className="text-sm text-muted-foreground mt-1">Mark attendance for all enrolled students by shift.</p>
        </div>
        <Link href="/admin/admin_engagement/absentee-report">
          <Button variant="outline" className="gap-2">
            <FileBarChart2 size={16} /> Absentee Report
          </Button>
        </Link>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Students</p>
          <p className="text-3xl font-bold text-foreground mb-1">{filtered.length}</p>
          <p className="text-xs font-medium text-muted-foreground">{shift} shift</p>
        </Card>
        <Card className="p-4 shadow-sm border-success/20 bg-success/5">
          <p className="text-xs font-semibold text-success uppercase tracking-wider mb-1">Present</p>
          <p className="text-3xl font-bold text-success mb-1">{present}</p>
          <p className="text-xs font-medium text-success/70">{filtered.length ? Math.round(present/filtered.length*100) : 0}% rate</p>
        </Card>
        <Card className="p-4 shadow-sm border-danger/20 bg-danger/5">
          <p className="text-xs font-semibold text-danger uppercase tracking-wider mb-1">Absent</p>
          <p className="text-3xl font-bold text-danger mb-1">{absent}</p>
          <p className="text-xs font-medium text-danger/70">{filtered.filter(s=>s.consecutiveAbsent>=3).length} need alerts</p>
        </Card>
        <Card className="p-4 shadow-sm border-warning/20 bg-warning/5">
          <p className="text-xs font-semibold text-warning uppercase tracking-wider mb-1">Late</p>
          <p className="text-3xl font-bold text-warning mb-1">{late}</p>
          <p className="text-xs font-medium text-warning/70">{marked}/{filtered.length} marked</p>
        </Card>
      </div>

      {/* ── Filters ── */}
      <Card className="p-4 border-border shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col">
            <label className="text-xs mb-1 font-semibold text-muted-foreground uppercase tracking-wider">Date</label>
            <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-auto h-9" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs mb-1 font-semibold text-muted-foreground uppercase tracking-wider">Shift</label>
            <select value={shift} onChange={e => setShift(e.target.value)} className="flex h-9 w-36 items-center justify-between rounded-md border border-border bg-bg-input px-3 py-1 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option>All</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-success/10 text-success border-none font-bold">{present} Present</Badge>
          <Badge variant="secondary" className="bg-danger/10 text-danger border-none font-bold">{absent} Absent</Badge>
          <Badge variant="secondary" className="bg-warning/10 text-warning border-none font-bold">{late} Late</Badge>
        </div>
      </Card>

      {/* ── Student List ── */}
      <Card className="shadow-sm border-border overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <div className="text-4xl mb-4">📅</div>
              <p className="font-medium text-foreground mb-1 text-lg">No students in this shift</p>
              <p className="text-sm">Try selecting a different shift or date.</p>
            </div>
          ) : filtered.map(s => {
            const isAlert = s.consecutiveAbsent >= 3;
            const hasAlerted = alerted.has(s.id);
            return (
              <div key={s.id} className={`p-4 flex flex-col lg:flex-row lg:items-center gap-4 transition-colors ${isAlert ? 'bg-danger/5' : 'hover:bg-muted/30'}`}>

                {/* Avatar & Info */}
                <div className="flex items-center gap-4 flex-1 min-w-64">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {s.initials}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">{s.name}</div>
                    <div className="text-xs text-muted-foreground font-medium mt-0.5">{s.smartId} · {s.shift} shift</div>
                  </div>
                </div>

                {/* Status buttons */}
                <div className="flex items-center gap-1 bg-muted p-1 rounded-lg self-start lg:self-auto">
                  {(['present', 'absent', 'late'] as AttStatus[]).map(st => (
                    <Button 
                      key={st} 
                      size="sm"
                      variant={s.status === st ? 'default' : 'ghost'}
                      onClick={() => setStatus(s.id, st)}
                      className={`h-8 px-3 text-xs font-semibold gap-1.5 capitalize transition-all ${
                        s.status === st 
                          ? st === 'present' ? 'bg-success hover:bg-success text-white' 
                            : st === 'absent' ? 'bg-danger hover:bg-danger text-white'
                            : 'bg-warning hover:bg-warning text-white'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {st === 'present' ? <><CheckCircle size={14}/> Present</>
                       : st === 'absent' ? '✕ Absent'
                       : <><Clock size={14}/> Late</>}
                    </Button>
                  ))}
                </div>

                {/* Time inputs */}
                {(s.status === 'present' || s.status === 'late') && (
                  <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-lg border border-border self-start lg:self-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">In</span>
                      <Input type="time" value={s.inTime} onChange={e => setField(s.id, 'inTime', e.target.value)} className="h-8 w-28 text-xs bg-bg-card" />
                    </div>
                    {s.status === 'present' && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Out</span>
                        <Input type="time" value={s.outTime} onChange={e => setField(s.id, 'outTime', e.target.value)} className="h-8 w-28 text-xs bg-bg-card" />
                      </div>
                    )}
                  </div>
                )}

                {/* Absent alert */}
                {isAlert && (
                  <div className="flex items-center gap-3 self-start lg:self-auto mt-2 lg:mt-0 p-2 rounded-lg bg-danger/10 border border-danger/20">
                    <span className="text-xs font-bold text-danger flex items-center gap-1">
                      ⚠️ {s.consecutiveAbsent} days absent
                    </span>
                    {!hasAlerted ? (
                      <Button variant="outline" size="sm" onClick={() => handleAlert(s.id)} className="h-7 text-xs border-danger text-danger hover:bg-danger hover:text-white px-2 py-0 gap-1">
                        <Bell size={12} /> Alert
                      </Button>
                    ) : (
                      <Badge variant="secondary" className="bg-success/20 text-success border-none font-bold text-xs gap-1">
                        ✅ Alerted
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── Sticky Save Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-72 p-4 bg-black/60 backdrop-blur-md border-t border-border flex items-center justify-between z-50 shadow-md shadow-black/5">
        <p className="text-sm text-foreground">
          <strong className="text-primary">{marked}</strong> of <strong>{filtered.length}</strong> marked for <strong className="font-mono">{date}</strong>
        </p>
        <Button onClick={handleSave} className="gap-2 px-6 shadow-sm">
          {saved ? <><CheckCircle size={16}/> Saved!</> : <><Save size={16}/> Save Attendance</>}
        </Button>
      </div>
    </div>
  );
}
