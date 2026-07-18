// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { User, KeyRound, LockKeyhole, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

import { useSeatsStore } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_context/manager_seats_shifts_lockers_store';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';

const STATS = [
  { label: 'Total Capacity',   value: '120', border: 'ss-kpi-card__border-primary', valueClass: 'ss-kpi-card__value--primary' },
  { label: 'Available',        value: '42',  border: 'ss-kpi-card__border-success', valueClass: 'ss-kpi-card__value--success' },
  { label: 'Occupied',         value: '71',  border: 'ss-kpi-card__border-danger',  valueClass: 'ss-kpi-card__value--danger'  },
  { label: 'Service Required', value: '07',  border: 'ss-kpi-card__border-warning', valueClass: 'ss-kpi-card__value--warning' },
];

const LEGEND_ITEMS = [
  { cls: 'ss-legend-dot--success', label: 'Free' },
  { cls: 'ss-legend-dot--danger',  label: 'Occupied' },
  { cls: 'ss-legend-dot--warning', label: 'Maintenance' },
];

// RESPONSIBILITY: Render locker matrix UI using mocked data
export function ManagerSeatsLockerMatrixClient() {
  const [assignTarget, setAssignTarget] = useState<string | null>(null);
  const { lockerData, status, fetchLockers } = useSeatsStore();

  // Fetch lockers on mount
  useEffect(() => {
    if (status === 'idle' || lockerData.length === 0) {
      fetchLockers();
    }
  }, [status, lockerData.length, fetchLockers]);

  function handleCellClick(id: string, status: string) {
    if (status === 'free')     { setAssignTarget(id); }
    if (status === 'occupied') { toast.success(`Navigating to student profile for Locker ${id}`); }
  }

  return (
    <>
    <div className="ss-page">
      <div className="ss-page-header">
        <div>
          <h1 className="ss-page-title">Locker Matrix</h1>
          <p className="ss-page-subtitle">Real-time status of lockers. Click any cell to manage access or view rental history.</p>
        </div>
        <div className="ss-card ss-card--p-sm">
          <div className="ss-legend-compact">
            {LEGEND_ITEMS.map(({ cls, label }) => (
              <div key={label} className="ss-legend-item">
                <span className={`ss-legend-dot ${cls}`} />
                <span className="ss-legend-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ss-locker-stats">
        {STATS.map(({ label, value, border, valueClass }) => (
          <div key={label} className={`ss-kpi-card ${border}`}>
            <span className="ss-kpi-card__label">{label}</span>
            <span className={`ss-kpi-card__value ${valueClass}`}>{value}</span>
          </div>
        ))}
      </div>

      <div className="ss-card ss-card--p-lg ss-locker-grid-card">
        <div className="ss-locker-grid">
          {lockerData.map(({ uuid, id, status }, index) => (
            <button
              key={uuid || id + '-' + index}
              className={`ss-locker-cell ss-locker-cell--${status}`}
              onClick={() => handleCellClick(id, status)}
              title={status === 'free' ? 'Available — click to assign' : status === 'occupied' ? 'Occupied — click to view student' : 'Under Maintenance'}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <div className="ss-locker-bottom-grid">
        <div className="ss-card">
          <div className="ss-card-header">
            <h3 className="ss-section-heading">Recent Assignments</h3>
            <button className="ss-btn-ghost ss-btn--sm">View All</button>
          </div>
          <div className="ss-activity-list">
            {ACTIVITY_DATA.map(({ icon, text, sub, id }) => (
              <div key={id} className="ss-activity-row">
                <div className="ss-activity-row__left">
                  <div className="ss-activity-icon">{icon}</div>
                  <div>
                    <p className="ss-activity-title">{text}</p>
                    <p className="ss-activity-sub">{sub}</p>
                  </div>
                </div>
                <span className="ss-activity-id ss-text-mono">{id}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ss-card ss-card--primary-accent ss-toolkit-card">
          <div>
            <h3 className="ss-section-heading ss-section-heading--primary ss-toolkit-heading">Management Toolkit</h3>
            <p className="ss-toolkit-desc">Bulk manage lockers, schedule maintenance windows, or update digital lock firmware.</p>
          </div>
          <div className="ss-toolkit-actions">
            <button className="ss-btn-primary ss-toolkit-btn"><LockKeyhole size={15} />Bulk Reset</button>
            <button className="ss-btn-ghost ss-toolkit-btn"><Settings size={15} />Grid Config</button>
          </div>
        </div>
      </div>
    </div>
    {assignTarget && (
      <div className="ss-modal-overlay" onClick={() => setAssignTarget(null)}>
        <div className="ss-modal" onClick={e => e.stopPropagation()}>
          <h2 className="ss-modal-title">⚡ Assign Locker {assignTarget}</h2>
          <p className="ss-modal-desc">Locker <strong>{assignTarget}</strong> is available.</p>
          <div className="ss-modal-footer">
            <button className="ss-btn-ghost" onClick={() => setAssignTarget(null)}>Cancel</button>
            <button className="ss-btn-primary" onClick={() => { toast.success(`Locker ${assignTarget} assigned.`); setAssignTarget(null); }}>⚡ Assign Student</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
