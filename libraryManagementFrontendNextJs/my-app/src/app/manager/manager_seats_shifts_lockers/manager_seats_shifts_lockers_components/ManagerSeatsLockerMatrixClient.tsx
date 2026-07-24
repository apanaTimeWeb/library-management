'use client';
﻿

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { User, KeyRound, LockKeyhole, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

import { useManagerSeatsLockerMatrix } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_hooks/useManagerSeatsLockerMatrix';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, ManagerSeatsSeatMatrixModalProps, ShiftData, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, SHIFTS_DATA, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';

const STATS = [
  { label: 'Total Capacity',   value: '120', border: 'bg-bg-elevated p-4 rounded-lg border border-border__border-primary', valueClass: 'bg-bg-elevated p-4 rounded-lg border border-border__value--primary' },
  { label: 'Available',        value: '42',  border: 'bg-bg-elevated p-4 rounded-lg border border-border__border-success', valueClass: 'bg-bg-elevated p-4 rounded-lg border border-border__value--success' },
  { label: 'Occupied',         value: '71',  border: 'bg-bg-elevated p-4 rounded-lg border border-border__border-danger',  valueClass: 'bg-bg-elevated p-4 rounded-lg border border-border__value--danger'  },
  { label: 'Service Required', value: '07',  border: 'bg-bg-elevated p-4 rounded-lg border border-border__border-warning', valueClass: 'bg-bg-elevated p-4 rounded-lg border border-border__value--warning' },
];

const LEGEND_ITEMS = [
  { cls: 'w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(var(--success),0.5)]', label: 'Free' },
  { cls: 'w-2.5 h-2.5 rounded-full bg-danger shadow-[0_0_8px_rgba(var(--danger),0.5)]',  label: 'Occupied' },
  { cls: 'w-2.5 h-2.5 rounded-full bg-warning shadow-[0_0_8px_rgba(var(--warning),0.5)]', label: 'Maintenance' },
];

// RESPONSIBILITY: Render locker matrix UI using mocked data
export function ManagerSeatsLockerMatrixClient() {
  const { assignTarget, setAssignTarget, lockerData, handleCellClick } = useManagerSeatsLockerMatrix();

  return (
    <>
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Locker Matrix</h1>
          <p className="text-text-secondary mt-1 text-sm">Real-time status of lockers. Click any cell to manage access or view rental history.</p>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-colors p-4">
          <div className="flex flex-wrap gap-4 items-center">
            {LEGEND_ITEMS.map(({ cls, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${cls}`} />
                <span className="text-xs text-text-secondary font-medium tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {STATS.map(({ label, value, border, valueClass }) => (
          <div key={label} className={`bg-bg-elevated p-4 rounded-lg border border-border ${border}`}>
            <span className="text-xs text-text-secondary font-medium uppercase">{label}</span>
            <span className={`bg-bg-elevated p-4 rounded-lg border border-border__value ${valueClass}`}>{value}</span>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-colors p-8 mt-6">
        <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3">
          {lockerData.map(({ uuid, id, status }, index) => (
            <button
              key={uuid || id + '-' + index}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center border font-mono text-xs md:text-sm transition-all duration-200 cursor-pointer ss-locker-cell--${status}`}
              onClick={() => handleCellClick(id, status)}
              title={status === 'Free' ? 'Available — click to assign' : status === 'Occupied' ? 'Occupied — click to view student' : 'Under Maintenance'}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-card border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-text-primary">Recent Assignments</h3>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm px-3 py-1.5 text-xs font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {ACTIVITY_DATA.map((item) => (
              <div key={item.id} className="flex gap-4 items-start pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="text-xl bg-bg-elevated p-2 rounded-full text-text-primary"><User size={20} /></div>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">{item.type} to {item.student}</p>
                    <p className="text-sm text-text-secondary mt-1">{item.date}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-text-secondary mt-1 bg-bg-elevated px-1.5 py-0.5 rounded border border-border inline-block font-mono tracking-tight">{item.locker}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden p-6 hover:border-primary/50 transition-colors border-t-4 border-t-primary bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all shadow-sm hover:shadow-md flex flex-col">
          <div>
            <h3 className="text-lg font-semibold text-text-primary text-primary border-b-primary text-base font-semibold text-text-primary flex items-center gap-2">Management Toolkit</h3>
            <p className="text-sm text-text-secondary mt-2 min-h-[40px]">Bulk manage lockers, schedule maintenance windows, or update digital lock firmware.</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm flex-1 py-2 px-3 flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-colors border border-border bg-card hover:bg-bg-elevated text-text-primary"><LockKeyhole size={15} />Bulk Reset</button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm flex-1 py-2 px-3 flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-colors border border-border bg-card hover:bg-bg-elevated text-text-primary"><Settings size={15} />Grid Config</button>
          </div>
        </div>
      </div>
    </div>
    {assignTarget && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setAssignTarget(null)}>
        <div className="bg-card w-full max-w-md md:max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
          <h2 className="text-xl font-bold text-text-primary p-6 pb-0">⚡ Assign Locker {assignTarget}</h2>
          <p className="text-text-secondary p-6 pt-2 pb-0 text-sm leading-relaxed">Locker <strong>{assignTarget}</strong> is available.</p>
          <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30">
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm" onClick={() => setAssignTarget(null)}>Cancel</button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={() => { toast.success(`Locker ${assignTarget} assigned.`); setAssignTarget(null); }}>⚡ Assign Student</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
