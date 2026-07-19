'use client';
// RESPONSIBILITY: Renders the ManagerStudentsIdCardClient.tsx component.
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Printer, MessageSquare, IdCard, CheckCircle2 } from 'lucide-react';
import type { Student } from '@/app/manager/manager_students/manager_students_types';
import ManagerStudentsIdCard from '@/app/manager/manager_students/manager_students_components/ManagerStudentsIdCard';
import { useManagerStudentsIdCard } from '@/app/manager/manager_students/manager_students_hooks/useManagerStudentsIdCard';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
export function ManagerStudentsIdCardClient() {
  const {
    search,
    setSearch,
    selectedId,
    setSelectedId,
    filtered,
    selected,
    cardData,
    handleSendWhatsApp,
    handlePrint,
  } = useManagerStudentsIdCard();

  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <Link href={MANAGER_ROUTES.STUDENTS} className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-4">
            <ArrowLeft size={14} /> Back to Students
          </Link>
          <h1 className="text-xl font-bold text-text-primary">ID Card Generator</h1>
          <p className="text-sm text-text-secondary mt-1.5">Search â†’ click student â†’ preview â†’ print or send via WhatsApp</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT — selector */}
        <div>
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-text-primary">
                <IdCard size={16} className="inline mr-[6px] align-middle" />
                Select Student
              </h2>
              {selected && (
                <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-success-bg text-success">
                  <CheckCircle2 size={11} /> {selected.name}
                </span>
              )}
            </div>
            <div className="">
              <div className="w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap mb-[14px]">
                <Search size={14} className="w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
                <input
                  className="w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon"
                  placeholder="Search name, Smart ID, phone…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="mt-4 max-h-96 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-48">
                    <div className="text-4xl mb-4 opacity-50">ðŸ”</div>
                    <p className="text-lg font-bold text-text-primary mb-1">No students found</p>
                  </div>
                )}
                {filtered.map((s: Student) => {
                  const initials = s.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
                  return (
                    <button
                      key={s.smartId}
                      onClick={() => setSelectedId(s.smartId)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left ${s.smartId === selectedId ? 'bg-primary-subtle border-primary/20' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{initials}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate">{s.name}</p>
                        <p className="text-xs text-text-secondary mt-0.5 truncate">{s.smartId} Â· {s.shift} Â· Seat {s.seat}</p>
                      </div>
                      <span className={
                        s.status === 'Active'    ? 'rounded-full px-2.5 py-0.5 text-xs font-semibold bg-success-bg text-success' :
                        s.status === 'Suspended' ? 'rounded-full px-2.5 py-0.5 text-xs font-semibold bg-warning-bg text-warning' :
                                                   'rounded-full px-2.5 py-0.5 text-xs font-semibold bg-danger-bg text-danger'
                      }>{s.status}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {selected && cardData && (
            <div className="bg-card rounded-xl border border-border p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-text-primary">Actions</h2>
              </div>
              <div className="flex flex-col gap-3">
                <button className="bg-success text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-colors inline-flex items-center gap-2 w-full justify-center shadow-sm" onClick={handleSendWhatsApp}>
                  <MessageSquare size={16} />
                  Send ID Card via WhatsApp
                </button>
                <button
                  className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2"
                  onClick={handlePrint}
                 
                >
                  <Printer size={15} />
                  Print ID Card (Thermal)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — preview */}
        <div className="flex flex-col items-center justify-center bg-page border border-dashed border-border rounded-xl p-8 sticky top-24">
          {cardData ? (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-6">
                Preview — {selected?.name}
              </p>
              <ManagerStudentsIdCard data={cardData} />
              <p className="text-xs text-text-secondary mt-6 text-center max-w-72">
                Use buttons on the left to print (80mm thermal) or send via WhatsApp
              </p>
            </>
          ) : (
            <div className="bg-card rounded-xl border border-border p-6 w-full max-w-sm">
              <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-48">
                <div className="text-4xl mb-4 opacity-50">ðŸªª</div>
                <p className="text-lg font-bold text-text-primary mb-1">No student selected</p>
                <p className="text-sm text-text-secondary">Search and click a student to preview their ID card.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


