// @ts-nocheck
'use client';
// RESPONSIBILITY: Renders the ManagerStudentsExitClient.tsx component.
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, LogOut, AlertTriangle } from 'lucide-react';
import { useManagerStudentsExit } from '@/app/manager/manager_students/manager_students_hooks/useManagerStudentsExit';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
export function ManagerStudentsExitClient() {
  const {
    search,
    setSearch,
    selected,
    setSelected,
    reason,
    setReason,
    confirmed,
    filtered,
    student,
    handleExit,
    reset,
  } = useManagerStudentsExit();

  if (confirmed && student) {
    return (
      <div className="p-6 min-h-screen">
        <div className="bg-bg-card rounded-xl border border-border p-6 max-w-[480px] my-[60px] mx-auto">
          <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-72">
            <div className="text-4xl mb-4 opacity-50">✅</div>
            <p className="text-lg font-bold text-text-primary mb-1">Exit Processed</p>
            <p className="text-sm text-text-secondary">{student.name} ({student.smartId}) has been marked as exited.</p>
            <div className="mt-[20px] flex gap-[10px]">
              <Link href={MANAGER_ROUTES.STUDENTS} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">Back to Students</Link>
              <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2" onClick={reset}>
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
          <Link href={MANAGER_ROUTES.STUDENTS} className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-4">
            <ArrowLeft size={14} /> Back to Students
          </Link>
          <h1 className="text-[22px] font-bold text-text-primary">Student Exit</h1>
          <p className="text-[13px] text-text-secondary mt-1.5">Process a student exit / de-registration from the library.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-text-primary">Select Student</h2>
          </div>
          <div className="">
            <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap mb-[16px]">
              <Search size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
              <input
                className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon"
                placeholder="Search name or Smart ID…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {filtered.map(s => (
                <button
                  key={s.smartId}
                  onClick={() => setSelected(s.smartId)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left ${selected === s.smartId ? 'bg-primary-subtle border-primary/20' : ''}`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{s.name.split(' ').map((n: string) => n[0]).join('').slice(0,2)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{s.name}</p>
                    <p className="text-xs text-text-secondary mt-0.5 truncate">{s.smartId} · {s.shift} · {s.seat}</p>
                  </div>
                  <span className={s.status === 'Active' ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success' : 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-danger-bg text-danger'}>
                    {s.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          {student && (
            <div className="bg-bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-text-primary">Exit Details</h2>
              </div>
              <div className="" className="flex flex-col gap-[14px]">
                <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <span className="text-sm font-medium text-text-secondary flex items-center">Student</span>
                  <span className="text-text-primary font-semibold">{student.name}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <span className="text-sm font-medium text-text-secondary flex items-center">Smart ID</span>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-info-bg text-info text-xs font-semibold mt-1">{student.smartId}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <span className="text-sm font-medium text-text-secondary flex items-center">Dues</span>
                  <span className={`${student.due > 0 ? 'text-danger font-bold' : 'text-success font-bold'} font-bold`}>
                    {student.due > 0 ? `⚠️ ₹${student.due} pending` : '✅ Clear'}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 mt-[8px]">
                  <label className="block text-sm font-medium text-text-secondary mb-1.5 after:content-['*'] after:ml-0.5 after:text-danger">Reason for Exit</label>
                  <ManagerSearchableDropdown
                    value={reason}
                    onChange={v => setReason(v)}
                    options={[
                      { label: 'Select reason…', value: '' },
                      { label: 'Exam completed', value: 'Exam completed' },
                      { label: 'Moved to another city', value: 'Moved to another city' },
                      { label: 'Fee non-payment', value: 'Fee non-payment' },
                      { label: 'Personal reasons', value: 'Personal reasons' },
                      { label: 'Other', value: 'Other' },
                    ]}
                  />
                </div>

                {student.due > 0 && (
                  <div className="flex items-center gap-[8px] p-[10px_12px] bg-danger-bg rounded-[8px] border border-danger/30">
                    <AlertTriangle size={14} className="text-danger shrink-0" />
                    <span className="text-[13px] text-danger">Student has pending dues of ₹{student.due}. Please collect before exit.</span>
                  </div>
                )}

                <button
                  className="bg-danger text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2 w-full justify-center"
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
            <div className="max-w-md w-full rounded-2xl p-6 relative border border-border bg-bg-card shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
                <div className="text-4xl mb-4 opacity-50">👈</div>
                <p className="text-lg font-bold text-text-primary mb-1">Select a student</p>
                <p className="text-sm text-text-secondary">Choose a student from the left panel to process their exit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
