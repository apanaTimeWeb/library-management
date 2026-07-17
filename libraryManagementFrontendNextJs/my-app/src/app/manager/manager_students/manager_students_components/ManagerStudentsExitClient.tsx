// RESPONSIBILITY: Renders the ManagerStudentsExitClient.tsx component.
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, LogOut, AlertTriangle } from 'lucide-react';
import { fetchStudents } from '@/app/manager/manager_students/manager_students_api/manager_students_api';
import type { Student } from '@/app/manager/manager_students/manager_students_types';

export function ManagerStudentsExitClient() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [selected, setSelected] = useState('');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    fetchStudents().then(setStudents).catch(console.error);
  }, []);

  const filtered = students.filter(s =>
    !search ||
    s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    s.smartId.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const student = students.find(s => s.smartId === selected);

  function handleExit() {
    if (!selected || !reason) return;
    setConfirmed(true);
  }

  if (confirmed && student) {
    return (
      <div className="p-6 min-h-screen">
        <div className="bg-bg-card rounded-xl border border-border p-6" style={{ maxWidth: 480, margin: '60px auto' }}>
          <div className="mgr-empty-state">
            <div className="mgr-empty-icon">✅</div>
            <p className="mgr-empty-title">Exit Processed</p>
            <p className="mgr-empty-sub">{student.name} ({student.smartId}) has been marked as exited.</p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <Link href="/manager/manager_students" className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2 mgr-btn-sm">Back to Students</Link>
              <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2 mgr-btn-sm" onClick={() => { setConfirmed(false); setSelected(''); setReason(''); }}>
                Process Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <Link href="/manager/manager_students" className="mgr-back-link">
            <ArrowLeft size={14} /> Back to Students
          </Link>
          <h1 className="text-[22px] font-bold text-text-primary">Student Exit</h1>
          <p className="p-6 min-h-screen-subtitle">Process a student exit / de-registration from the library.</p>
        </div>
      </div>

      <div className="mgr-dashboard-row2">
        <div className="bg-bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Select Student</h2>
          </div>
          <div className="">
            <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap" style={{ marginBottom: 16 }}>
              <Search size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
              <input
                className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon"
                placeholder="Search name or Smart ID…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="admin-flex-col admin-gap-8">
              {filtered.map(s => (
                <button
                  key={s.smartId}
                  onClick={() => setSelected(s.smartId)}
                  className={`mgr-idcard-student-row${selected === s.smartId ? ' mgr-idcard-student-row--active' : ''}`}
                >
                  <div className="mgr-avatar-sm">{s.name.split(' ').map((n: string) => n[0]).join('').slice(0,2)}</div>
                  <div className="mgr-idcard-student-info">
                    <p className="mgr-cell-name">{s.name}</p>
                    <p className="mgr-cell-sub">{s.smartId} · {s.shift} · {s.seat}</p>
                  </div>
                  <span className={s.status === 'Active' ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success' : 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold rounded-full px-2.5 py-0.5 text-[11px] font-semibold--danger'}>
                    {s.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-flex-col admin-gap-16">
          {student && (
            <div className="bg-bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-text-primary">Exit Details</h2>
              </div>
              <div className="" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="mgr-action-item">
                  <span className="mgr-action-label">Student</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{student.name}</span>
                </div>
                <div className="mgr-action-item">
                  <span className="mgr-action-label">Smart ID</span>
                  <span className="mgr-smartid-chip">{student.smartId}</span>
                </div>
                <div className="mgr-action-item">
                  <span className="mgr-action-label">Dues</span>
                  <span className={student.due > 0 ? 'mgr-text-danger' : 'mgr-text-success'} style={{ fontWeight: 700 }}>
                    {student.due > 0 ? `⚠️ ₹${student.due} pending` : '✅ Clear'}
                  </span>
                </div>

                <div className="mgr-form-field" style={{ marginTop: 8 }}>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5 block text-sm font-medium text-text-secondary mb-1.5-required">Reason for Exit</label>
                  <select className="mgr-select" value={reason} onChange={e => setReason(e.target.value)}>
                    <option value="">Select reason…</option>
                    <option>Exam completed</option>
                    <option>Moved to another city</option>
                    <option>Fee non-payment</option>
                    <option>Personal reasons</option>
                    <option>Other</option>
                  </select>
                </div>

                {student.due > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'var(--danger-bg)', borderRadius: 8, border: '1px solid color-mix(in srgb, var(--danger) 30%, transparent)' }}>
                    <AlertTriangle size={14} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: 'var(--danger)' }}>Student has pending dues of ₹{student.due}. Please collect before exit.</span>
                  </div>
                )}

                <button
                  className="bg-danger text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2 mgr-btn-full"
                  onClick={handleExit}
                  disabled={!reason}
                >
                  <LogOut size={14} />
                  Confirm Exit
                </button>
              </div>
            </div>
          )}

          {!student && (
            <div className="bg-bg-card rounded-xl border border-border p-6">
              <div className="mgr-empty-state">
                <div className="mgr-empty-icon">👈</div>
                <p className="mgr-empty-title">Select a student</p>
                <p className="mgr-empty-sub">Choose a student from the left panel to process their exit.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



