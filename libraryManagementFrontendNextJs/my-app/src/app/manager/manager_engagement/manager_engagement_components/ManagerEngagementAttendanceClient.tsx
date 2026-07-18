'use client';

// RESPONSIBILITY: Renders the Attendance UI, filtering by shift and date, and manages attendance status.
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronRight, Save, FileBarChart2, Bell, CheckCircle, Clock, Calendar, XCircle, AlertTriangle } from 'lucide-react';
import { useAttendance } from '@/app/manager/manager_engagement/manager_engagement_hooks/useAttendance';
import type { AttStatus } from '@/app/manager/manager_engagement/manager_engagement_types/manager_engagement_types';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
export function ManagerEngagementAttendanceClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const today = new Date().toISOString().split('T')[0];
  const date = searchParams.get('date') || today;
  const shift = searchParams.get('shift') || 'All';

  const { students, status, updateAttendanceStatus, updateAttendanceTime, saveAttendance } = useAttendance();

  const [saved, setSaved]       = useState(false);
  const [alerted, setAlerted]   = useState<Set<string>>(new Set());

  const setFilter = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, val);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filtered = shift === 'All' ? students : students.filter(s => s.shift === shift);
  const marked   = filtered.filter(s => s.status !== null).length;
  const present  = filtered.filter(s => s.status === 'present').length;
  const absent   = filtered.filter(s => s.status === 'absent').length;
  const late     = filtered.filter(s => s.status === 'late').length;

  const handleAlert = (id: string) => setAlerted(p => new Set(p).add(id));

  const handleSave = async () => {
    await saveAttendance();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (status === 'loading') {
    return <div className="p-6 min-h-screen relative pb-24"><div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-gray-400 rounded w-3/4"></div><div className="space-y-2"><div className="h-4 bg-gray-400 rounded"></div><div className="h-4 bg-gray-400 rounded w-5/6"></div></div></div></div></div>;
  }

  return (
    <div className="p-6 min-h-screen relative pb-24">
      {/* ── Breadcrumb ── */}
      <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Link href={MANAGER_ROUTES.ENGAGEMENT_ATTENDANCE}>Engagement</Link>
        <ChevronRight size={12} className="mx-1" />
        <span>Attendance</span>
      </div>

      {/* ── Page Header ── */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2"><Calendar size={24}/> Daily Attendance</h1>
            <p className="text-[13px] text-text-secondary mt-1.5">Mark attendance for all enrolled students by shift.</p>
          </div>
          <div className="flex gap-2">
            <Link href={MANAGER_ROUTES.ENGAGEMENT_ABSENTEE_REPORT} className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors flex items-center gap-2">
              <FileBarChart2 size={14} /> Absentee Report
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Total Students</div>
          <div className="text-2xl font-bold text-text-primary">{filtered.length}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">{shift} shift</div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Present</div>
          <div className="text-2xl font-bold text-success">{present}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">{filtered.length ? Math.round(present/filtered.length*100) : 0}% rate</div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Absent</div>
          <div className="text-2xl font-bold text-danger">{absent}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">{filtered.filter(s=>s.consecutiveAbsent>=3).length} need alerts</div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Late</div>
          <div className="text-2xl font-bold text-warning">{late}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">{marked}/{filtered.length} marked</div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="bg-bg-card rounded-xl border border-border mb-6 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-[13px] font-medium text-text-secondary">Date</label>
            <input type="date" className="bg-bg-input border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" value={date}
              onChange={e => setFilter('date', e.target.value)} />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-[13px] font-medium text-text-secondary">Shift</label>
            <div style={{ width: 150 }}>
              <ManagerSearchableDropdown
                value={shift}
                onChange={v => setFilter('shift', v)}
                options={[
                  { label: 'All', value: 'All' },
                  { label: 'Morning', value: 'Morning' },
                  { label: 'Afternoon', value: 'Afternoon' },
                  { label: 'Evening', value: 'Evening' },
                ]}
              />
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success inline-flex items-center gap-1"><CheckCircle size={12}/> {present} Present</span>
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-danger-bg text-danger inline-flex items-center gap-1"><XCircle size={12}/> {absent} Absent</span>
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-warning-bg text-warning inline-flex items-center gap-1"><Clock size={12}/> {late} Late</span>
          </div>
        </div>
      </div>

      {/* ── Student List ── */}
      <div className="bg-bg-card rounded-xl border border-border overflow-hidden">
        <div className="flex flex-col divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="text-gray-400 mb-4"><Calendar size={48} /></div>
              <p className="text-lg font-semibold text-text-primary mb-1">No students in this shift</p>
              <p className="text-sm text-text-secondary">Try selecting a different shift or date.</p>
            </div>
          ) : filtered.map(s => {
            const isAlert = s.consecutiveAbsent >= 3;
            const hasAlerted = alerted.has(s.id);
            return (
              <div key={s.id} className={`p-4 flex flex-col md:flex-row items-start md:items-center gap-4 hover:bg-bg-elevated transition-colors ${isAlert ? 'bg-danger-bg/30' : ''}`}>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">{s.initials}</div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-text-primary truncate">{s.name}</div>
                  <div className="text-xs text-text-secondary mt-0.5 truncate">{s.smartId} · {s.shift} shift</div>
                </div>

                {/* Status buttons */}
                <div className="flex bg-bg-input rounded-lg border border-border p-1">
                  {(['present', 'absent', 'late'] as AttStatus[]).map(st => {
                    if (st === null) return null;
                    return (
                      <button key={st} onClick={() => updateAttendanceStatus(s.id, st)}
                        className={`px-3 py-1.5 text-[11px] font-medium rounded-md text-text-secondary hover:text-text-primary transition-colors ${s.status === st ? (st === 'present' ? 'bg-success-bg text-success hover:text-success shadow-sm' : st === 'absent' ? 'bg-danger-bg text-danger hover:text-danger shadow-sm' : 'bg-warning-bg text-warning-hover hover:text-warning-hover shadow-sm') : ''}`}>
                        {st === 'present' ? <span className="flex items-center gap-1"><CheckCircle size={12}/> Present</span>
                         : st === 'absent' ? <span className="flex items-center gap-1"><XCircle size={12}/> Absent</span>
                         : <span className="flex items-center gap-1"><Clock size={12}/> Late</span>}
                      </button>
                    )
                  })}
                </div>

                {/* Time inputs */}
                {(s.status === 'present' || s.status === 'late') && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-text-secondary">In</span>
                      <input type="time" className="bg-bg-input border border-border rounded-md px-2 py-1 text-[11px] text-text-primary focus:outline-none focus:ring-1 focus:ring-primary" value={s.inTime}
                        onChange={e => updateAttendanceTime(s.id, 'inTime', e.target.value)} />
                    </div>
                    {s.status === 'present' && (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-text-secondary">Out</span>
                        <input type="time" className="bg-bg-input border border-border rounded-md px-2 py-1 text-[11px] text-text-primary focus:outline-none focus:ring-1 focus:ring-primary" value={s.outTime}
                          onChange={e => updateAttendanceTime(s.id, 'outTime', e.target.value)} />
                      </div>
                    )}
                  </div>
                )}

                {/* Absent alert */}
                {isAlert && (
                  <div className="flex items-center gap-2 ml-auto md:ml-0">
                    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-warning-bg text-warning inline-flex items-center gap-1">
                      <AlertTriangle size={12}/> {s.consecutiveAbsent} days consecutive
                    </span>
                    {!hasAlerted ? (
                      <button onClick={() => handleAlert(s.id)} className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors flex items-center gap-1">
                        <Bell size={12} /> Alert Parents
                      </button>
                    ) : (
                      <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success inline-flex items-center gap-1"><CheckCircle size={12}/> Parents Alerted</span>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* ── Sticky Save Bar ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-bg-card border border-border shadow-xl rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-8 z-40 w-11/12 max-w-2xl mx-auto justify-between">
        <p className="text-sm text-text-secondary">
          <strong>{marked}</strong> of <strong>{filtered.length}</strong> marked for <strong>{date}</strong>
        </p>
        <button onClick={handleSave} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
          {saved ? <><CheckCircle size={15}/> Saved!</> : <><Save size={15}/> Save Attendance</>}
        </button>
      </div>
    </div>
  );
}
