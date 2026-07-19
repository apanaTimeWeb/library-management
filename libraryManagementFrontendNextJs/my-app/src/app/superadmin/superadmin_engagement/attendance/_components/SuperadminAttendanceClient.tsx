'use client';
// RESPONSIBILITY: Renders the SuperadminAttendanceClient component.
import Link from 'next/link';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/SuperadminUrlConfig';
import { ChevronRight, Save, FileBarChart2, Bell, CheckCircle, Clock } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSuperadminAttendanceClient } from '@/app/superadmin/superadmin_engagement/attendance/_components/useSuperadminAttendanceClient';
import type { SuperadminEngagementAttStatus as AttStatus } from '@/app/superadmin/superadmin_engagement/superadmin_engagement_types/SuperadminEngagementTypes';

export function SuperadminAttendanceClient() {
  const {
    date, setDate, shift, setShift, students, saved, alerted,
    setStatus, setField, handleAlert, handleSave
  } = useSuperadminAttendanceClient();

  const filtered = shift === 'All' ? students : students.filter(s => s.shift === shift);
  const marked   = filtered.filter(s => s.status !== null).length;
  const present  = filtered.filter(s => s.status === 'present').length;
  const absent   = filtered.filter(s => s.status === 'absent').length;
  const late     = filtered.filter(s => s.status === 'late').length;

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-page animate-in fade-in duration-200 pb-24">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 text-text-secondary text-xs font-bold tracking-wide mb-6">
        <Link href={SUPERADMIN_ROUTES.ENGAGEMENT_ATTENDANCE} className="hover:text-primary transition-colors">Engagement</Link>
        <ChevronRight size={12} className="opacity-50" />
        <span className="text-text-primary">Attendance</span>
      </div>

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">ðŸ“… Daily Attendance</h1>
          <p className="text-sm text-text-secondary mt-1">Mark attendance for all enrolled students by shift.</p>
        </div>
        <Link href={SUPERADMIN_ROUTES.ENGAGEMENT_ABSENTEE_REPORT} className="flex items-center justify-center gap-2 px-4 py-2 bg-input text-text-primary text-sm font-bold rounded-md hover:bg-input/80 border border-border shadow-sm transition-all cursor-pointer">
          <FileBarChart2 size={16} /> Absentee Report
        </Link>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">Total Students</div>
          <div className="text-3xl font-extrabold text-text-primary mt-2 leading-none">{filtered.length}</div>
          <div className="text-xs text-text-secondary mt-2">{shift} shift</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">Present</div>
          <div className="text-3xl font-extrabold text-success mt-2 leading-none">{present}</div>
          <div className="text-xs text-text-secondary mt-2">{filtered.length ? Math.round(present/filtered.length*100) : 0}% rate</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">Absent</div>
          <div className="text-3xl font-extrabold text-danger mt-2 leading-none">{absent}</div>
          <div className="text-xs text-text-secondary mt-2">{filtered.filter(s=>s.consecutiveAbsent>=3).length} need alerts</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">Late</div>
          <div className="text-3xl font-extrabold text-warning mt-2 leading-none">{late}</div>
          <div className="text-xs text-text-secondary mt-2">{marked}/{filtered.length} marked</div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4 lg:gap-6">
          <div className="space-y-1.5 flex-1 max-w-xs">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Date</label>
            <input type="date" className="w-full h-10 px-3 bg-input border border-border rounded-md text-sm font-medium text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" value={date}
              onChange={e => setDate(e.target.value)} />
          </div>
          <div className="space-y-1.5 flex-1 max-w-xs">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Shift</label>
            <SuperadminSearchableDropdown
              options={[
                { label: 'All', value: 'All' },
                { label: 'Morning', value: 'Morning' },
                { label: 'Afternoon', value: 'Afternoon' },
                { label: 'Evening', value: 'Evening' }
              ]}
              value={shift}
              onChange={setShift}
            />
          </div>
          <div className="flex-1 flex flex-wrap items-center gap-2 md:justify-end pb-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded bg-success/10 text-success">{present} Present</span>
            <span className="px-2.5 py-1 text-xs font-bold rounded bg-danger/10 text-danger">{absent} Absent</span>
            <span className="px-2.5 py-1 text-xs font-bold rounded bg-warning/10 text-warning">{late} Late</span>
          </div>
        </div>
      </div>

      {/* ── Student List ── */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-4 opacity-50">ðŸ“…</div>
              <p className="text-base font-extrabold text-text-primary">No students in this shift</p>
              <p className="text-sm text-text-secondary mt-1">Try selecting a different shift or date.</p>
            </div>
          ) : filtered.map(( s ) => {
            const isAlert = s.consecutiveAbsent >= 3;
            const hasAlerted = alerted.has(s.id);
            return (
              <div key={s.id} className={`p-4 md:p-5 flex flex-col xl:flex-row xl:items-center gap-4 transition-colors hover:bg-input/30 ${isAlert ? 'bg-warning/5 border-l-4 border-l-warning' : 'border-l-4 border-l-transparent'}`}>

                {/* Left side: Avatar + Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm sm:text-base font-extrabold">
                    {s.initials}
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-text-primary">{s.name}</div>
                    <div className="text-xs text-text-secondary mt-0.5 font-medium flex items-center gap-2">
                      <span className="font-mono">{s.smartId}</span>
                      <span className="w-1 h-1 rounded-full bg-text-secondary/50" />
                      <span>{s.shift} shift</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 xl:w-auto w-full">
                  
                  {/* Status buttons */}
                  <div className="flex items-center rounded-md border border-border p-1 bg-input self-start sm:self-auto shrink-0 overflow-x-auto max-w-full">
                    {(['present', 'absent', 'late'] as AttStatus[]).map(( st ) => (
                      <button key={st} onClick={() => setStatus(s.id, st)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-sm transition-all cursor-pointer whitespace-nowrap ${
                          s.status === st 
                            ? (st === 'present' ? 'bg-success text-white shadow-sm' : st === 'absent' ? 'bg-danger text-white shadow-sm' : 'bg-warning text-white shadow-sm')
                            : 'text-text-secondary hover:text-text-primary hover:bg-white/50'
                        }`}>
                        {st === 'present' ? <><CheckCircle size={14}/> Present</>
                         : st === 'absent' ? 'âœ• Absent'
                         : <><Clock size={14}/> Late</>}
                      </button>
                    ))}
                  </div>

                  {/* Time inputs */}
                  {(s.status === 'present' || s.status === 'late') && (
                    <div className="flex items-center gap-3 animate-in fade-in zoom-in-95 shrink-0 bg-card border border-border rounded-md p-1.5 px-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-text-secondary uppercase">In</span>
                        <input type="time" className="bg-transparent text-sm font-bold text-text-primary outline-none cursor-pointer w-20" value={s.inTime}
                          onChange={e => setField(s.id, 'inTime', e.target.value)} />
                      </div>
                      {s.status === 'present' && (
                        <>
                          <div className="w-px h-4 bg-border" />
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-text-secondary uppercase">Out</span>
                            <input type="time" className="bg-transparent text-sm font-bold text-text-primary outline-none cursor-pointer w-20" value={s.outTime}
                              onChange={e => setField(s.id, 'outTime', e.target.value)} />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Absent alert */}
                  {isAlert && (
                    <div className="flex flex-col sm:items-end gap-1.5 shrink-0 animate-in fade-in">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-warning/20 text-warning-foreground border border-warning/30 flex items-center gap-1 w-fit">
                        ⚠️ {s.consecutiveAbsent} days consecutive
                      </span>
                      {!hasAlerted ? (
                        <button onClick={() => handleAlert(s.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-text-primary bg-card border border-border rounded-sm hover:bg-input transition-colors cursor-pointer shadow-sm w-fit">
                          <Bell size={12} /> Alert Parents
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-success bg-success/10 rounded-sm w-fit">
                          <CheckCircle size={12} /> Parents Alerted
                        </span>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Sticky Save Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-40 bg-card border-t border-border p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex items-center justify-between animate-in slide-in-from-bottom-full">
        <p className="text-sm text-text-secondary">
          <strong className="text-text-primary">{marked}</strong> of <strong className="text-text-primary">{filtered.length}</strong> marked for <strong className="text-text-primary font-mono">{date}</strong>
        </p>
        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-md shadow-sm hover:bg-primary/90 transition-all active:scale-95 cursor-pointer">
          {saved ? <><CheckCircle size={18}/> Saved!</> : <><Save size={18}/> Save Attendance</>}
        </button>
      </div>
    </div>
  );
}

