'use client';
// RESPONSIBILITY: Renders the ManagerSeatsShiftGapClient.tsx component UI.
import { useState } from 'react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student, BookedBlock, GapBlock } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import { Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';

const DAY_START_H = 6;
const DAY_END_H   = 23;
const TOTAL_HOURS = DAY_END_H - DAY_START_H;

const VIEW_PERIODS = ['Today', 'This Week', 'This Month'];

function pct(h: number) { return ((h - DAY_START_H) / TOTAL_HOURS) * 100; }

function fmtH(h: number) {
  const suffix  = h >= 12 ? 'PM' : 'AM';
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display}:00 ${suffix}`;
}

export function ManagerSeatsShiftGapClient() {
  const [shiftFilter, setShiftFilter] = useState('All');
  const [period, setPeriod]           = useState('Today');

  const visible = shiftFilter === 'All' ? SHIFTS_DATA : SHIFTS_DATA.filter((s: ShiftData) => s.name === shiftFilter);

  return (
    <>
      <div className="ss-page">
        <div className="ss-page-header">
          <div>
            <h1 className="ss-page-title">Shift Gap Analyzer</h1>
            <p className="ss-page-subtitle">Identify revenue-loss gaps and fill empty time slots</p>
          </div>
        </div>

        <div className="ss-filter-bar">
          <div className="ss-filter-bar__select-wrap">
            <ManagerSearchableDropdown
              value={shiftFilter}
              onChange={setShiftFilter}
              options={[
                { label: 'All SHIFTS_DATA', value: 'All' },
                ...SHIFTS_DATA.map((s: ShiftData) => ({ label: s.name, value: s.name }))
              ]}
            />
          </div>
          <div className="ss-filter-bar__select-wrap">
            <ManagerSearchableDropdown
              value={period}
              onChange={setPeriod}
              options={VIEW_PERIODS.map(p => ({ label: p, value: p }))}
            />
          </div>
        </div>

        {visible.map((shift: ShiftData) => {
          const utilPct = Math.round(((shift.occupied || 0) / (shift.capacity || 1)) * 100);
          return (
            <div key={shift.id} className="ss-gap-card">
              <div className="ss-gap-card__header">
                <div>
                  <h2 className="ss-gap-card__title">{shift.name} Shift</h2>
                  <p className="ss-gap-card__meta">{shift.occupied} / {shift.capacity} seats occupied</p>
                </div>
                <div className="ss-kpi-card ss-gap-kpi-mini">
                  <span className="ss-kpi-card__label">Utilization</span>
                  <span className="ss-gap-card__util">{utilPct}%</span>
                  <div className="ss-progress-track">
                    <div className="ss-progress-fill w-full" style={{ width: `${utilPct}%` }} />
                  </div>
                </div>
              </div>

              <div className="ss-gap-card__body">
                <div className="ss-timebar">
                  {shift.booked.map((b: BookedBlock, i: number) => (
                    <div
                      className="absolute top-0 h-full bg-success/20 border-x border-success/40 w-full"
                      style={{ left: `${pct(b.startH)}%`, width: `${pct(b.endH) - pct(b.startH)}%` }}
                      title={b.label}
                    >
                      {b.label}
                    </div>
                  ))}
                  {shift.gaps.map((g: GapBlock, i: number) => (
                    <div
                      className="absolute top-0 h-full bg-danger/20 border-x border-danger/40 cursor-pointer hover:bg-danger/30 transition-colors w-full"
                      style={{ left: `${pct(g.startH)}%`, width: `${pct(g.endH) - pct(g.startH)}%` }}
                      title={`Gap: ${fmtH(g.startH)} – ${fmtH(g.endH)}`}
                    >
                      GAP
                    </div>
                  ))}
                </div>

                <div className="ss-timebar-axis">
                  <span className="ss-text-caption">{fmtH(DAY_START_H)}</span>
                  <span className="ss-text-caption">{fmtH(Math.round((DAY_START_H + DAY_END_H) / 2))}</span>
                  <span className="ss-text-caption">{fmtH(DAY_END_H)}</span>
                </div>

                {shift.gaps.length === 0 ? (
                  <p className="ss-text-secondary ss-text-caption">No gaps detected — fully utilized.</p>
                ) : (
                  <div className="ss-gap-list">
                    {shift.gaps.map((g: GapBlock, i: number) => (
                      <div key={i} className="ss-gap-row">
                        <div className="ss-gap-row__left">
                          <span className="ss-badge ss-badge--warning">🕳️ Gap</span>
                          <div>
                            <p className="ss-gap-row__time">{fmtH(g.startH)} – {fmtH(g.endH)} · {g.seats} seats free</p>
                            <p className="ss-gap-row__loss">Est. revenue loss: ₹{g.revLoss}/day</p>
                          </div>
                        </div>
                        <button
                          className="ss-btn-primary ss-btn--sm"
                          onClick={() => toast.success(`Opening new admission pre-filled with ${shift.name} ${fmtH(g.startH)}–${fmtH(g.endH)} slot`)}
                        >
                          <Zap size={13} />Quick Fill
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
