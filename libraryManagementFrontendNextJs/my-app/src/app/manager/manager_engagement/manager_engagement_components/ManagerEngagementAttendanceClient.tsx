'use client';

// RESPONSIBILITY: Renders the Attendance UI, filtering by shift and date, and manages attendance status.
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronRight, Save, FileBarChart2, Bell, CheckCircle, Clock, Calendar, XCircle, AlertTriangle } from 'lucide-react';
import { useAttendance } from '@/app/manager/manager_engagement/manager_engagement_hooks/useAttendance';
import type { AttStatus } from '@/app/manager/manager_engagement/manager_engagement_types/manager_engagement_types';

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
    return <div className="eng-page"><div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-gray-400 rounded w-3/4"></div><div className="space-y-2"><div className="h-4 bg-gray-400 rounded"></div><div className="h-4 bg-gray-400 rounded w-5/6"></div></div></div></div></div>;
  }

  return (
    <div className="eng-page">
      {/* ── Breadcrumb ── */}
      <div className="eng-breadcrumb">
        <Link href="/manager/manager_engagement/attendance">Engagement</Link>
        <ChevronRight size={12} className="eng-breadcrumb-sep" />
        <span>Attendance</span>
      </div>

      {/* ── Page Header ── */}
      <div className="eng-page-header">
        <div className="eng-page-title-row">
          <div>
            <h1 className="eng-page-title flex items-center gap-2"><Calendar size={24}/> Daily Attendance</h1>
            <p className="eng-page-subtitle">Mark attendance for all enrolled students by shift.</p>
          </div>
          <div className="eng-page-actions">
            <Link href="/manager/manager_engagement/absentee-report" className="eng-btn eng-btn--ghost eng-btn--sm flex items-center gap-2">
              <FileBarChart2 size={14} /> Absentee Report
            </Link>
          </div>
        </div>
      </div>

      {/* ── KPI Stats ── */}
      <div className="eng-stats-row">
        <div className="eng-stat-card">
          <div className="eng-stat-label">Total Students</div>
          <div className="eng-stat-value">{filtered.length}</div>
          <div className="eng-stat-sub">{shift} shift</div>
        </div>
        <div className="eng-stat-card">
          <div className="eng-stat-label">Present</div>
          <div className="eng-stat-value eng-stat-value--success">{present}</div>
          <div className="eng-stat-sub">{filtered.length ? Math.round(present/filtered.length*100) : 0}% rate</div>
        </div>
        <div className="eng-stat-card">
          <div className="eng-stat-label">Absent</div>
          <div className="eng-stat-value eng-stat-value--danger">{absent}</div>
          <div className="eng-stat-sub">{filtered.filter(s=>s.consecutiveAbsent>=3).length} need alerts</div>
        </div>
        <div className="eng-stat-card">
          <div className="eng-stat-label">Late</div>
          <div className="eng-stat-value eng-stat-value--warning">{late}</div>
          <div className="eng-stat-sub">{marked}/{filtered.length} marked</div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="eng-card eng-card--flush eng-mb-6">
        <div className="eng-filter-row">
          <div className="eng-filter-field">
            <label className="eng-label">Date</label>
            <input type="date" className="eng-input" value={date}
              onChange={e => setFilter('date', e.target.value)} />
          </div>
          <div className="eng-filter-field">
            <label className="eng-label">Shift</label>
            <select className="eng-select eng-filter-select" value={shift}
              onChange={e => setFilter('shift', e.target.value)}>
              <option>All</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>
          <div className="eng-filter-badges">
            <span className="eng-badge eng-badge--success inline-flex items-center gap-1"><CheckCircle size={12}/> {present} Present</span>
            <span className="eng-badge eng-badge--danger inline-flex items-center gap-1"><XCircle size={12}/> {absent} Absent</span>
            <span className="eng-badge eng-badge--warning inline-flex items-center gap-1"><Clock size={12}/> {late} Late</span>
          </div>
        </div>
      </div>

      {/* ── Student List ── */}
      <div className="eng-card eng-card--flush">
        <div className="eng-att-list">
          {filtered.length === 0 ? (
            <div className="eng-empty">
              <div className="eng-empty-icon text-gray-400"><Calendar size={48} /></div>
              <p className="eng-empty-title text-mgr-text-primary">No students in this shift</p>
              <p className="eng-empty-sub text-mgr-text-secondary">Try selecting a different shift or date.</p>
            </div>
          ) : filtered.map(s => {
            const isAlert = s.consecutiveAbsent >= 3;
            const hasAlerted = alerted.has(s.id);
            return (
              <div key={s.id} className={`eng-att-row${isAlert ? ' eng-att-row--alert' : ''}`}>

                {/* Avatar */}
                <div className="eng-att-avatar">{s.initials}</div>

                {/* Info */}
                <div className="eng-att-info">
                  <div className="eng-att-name">{s.name}</div>
                  <div className="eng-att-meta">{s.smartId} · {s.shift} shift</div>
                </div>

                {/* Status buttons */}
                <div className="eng-seg-group">
                  {(['present', 'absent', 'late'] as AttStatus[]).map(st => {
                    if (st === null) return null;
                    return (
                      <button key={st} onClick={() => updateAttendanceStatus(s.id, st)}
                        className={`eng-seg-btn${s.status === st ? ` eng-seg-btn--${st}` : ''}`}>
                        {st === 'present' ? <span className="flex items-center gap-1"><CheckCircle size={12}/> Present</span>
                         : st === 'absent' ? <span className="flex items-center gap-1"><XCircle size={12}/> Absent</span>
                         : <span className="flex items-center gap-1"><Clock size={12}/> Late</span>}
                      </button>
                    )
                  })}
                </div>

                {/* Time inputs */}
                {(s.status === 'present' || s.status === 'late') && (
                  <div className="eng-time-pair">
                    <div className="eng-time-field">
                      <span className="eng-label eng-label--no-margin">In</span>
                      <input type="time" className="eng-time-input" value={s.inTime}
                        onChange={e => updateAttendanceTime(s.id, 'inTime', e.target.value)} />
                    </div>
                    {s.status === 'present' && (
                      <div className="eng-time-field">
                        <span className="eng-label eng-label--no-margin">Out</span>
                        <input type="time" className="eng-time-input" value={s.outTime}
                          onChange={e => updateAttendanceTime(s.id, 'outTime', e.target.value)} />
                      </div>
                    )}
                  </div>
                )}

                {/* Absent alert */}
                {isAlert && (
                  <div className="eng-att-alert">
                    <span className="eng-badge eng-badge--warning inline-flex items-center gap-1">
                      <AlertTriangle size={12}/> {s.consecutiveAbsent} days consecutive
                    </span>
                    {!hasAlerted ? (
                      <button onClick={() => handleAlert(s.id)} className="eng-btn eng-btn--ghost eng-btn--sm flex items-center gap-1">
                        <Bell size={12} /> Alert Parents
                      </button>
                    ) : (
                      <span className="eng-badge eng-badge--success inline-flex items-center gap-1"><CheckCircle size={12}/> Parents Alerted</span>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* ── Sticky Save Bar ── */}
      <div className="eng-save-bar">
        <p className="eng-save-bar-info">
          <strong>{marked}</strong> of <strong>{filtered.length}</strong> marked for <strong>{date}</strong>
        </p>
        <button onClick={handleSave} className="eng-btn eng-btn--primary flex items-center gap-2">
          {saved ? <><CheckCircle size={15}/> Saved!</> : <><Save size={15}/> Save Attendance</>}
        </button>
      </div>
    </div>
  );
}
