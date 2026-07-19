'use client';
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';

// RESPONSIBILITY: Renders the ManagerSeatsShiftGapClient.tsx component UI.
import { useState } from 'react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student, BookedBlock, GapBlock } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
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
  const [shiftFilter, setShiftFilter] = useUrlState('shiftFilter', 'All' as string);
  const [period, setPeriod] = useUrlState('period', 'Today' as string);

  const visible = shiftFilter === 'All' ? SHIFTS_DATA : SHIFTS_DATA.filter((s: ShiftData) => s.name === shiftFilter);

  return (
    <>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Shift Gap Analyzer</h1>
            <p className="text-text-secondary mt-1 text-sm">Identify revenue-loss gaps and fill empty time slots</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-1 rounded-xl bg-bg-elevated inline-flex w-fit">
          <div className="w-full md:w-64 relative">
            <ManagerSearchableDropdown
              value={shiftFilter}
              onChange={setShiftFilter}
              options={[
                { label: 'All SHIFTS_DATA', value: 'All' },
                ...SHIFTS_DATA.map((s: ShiftData) => ({ label: s.name, value: s.name }))
              ]}
            />
          </div>
          <div className="w-full md:w-64 relative">
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
            <div key={shift.id} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
              <div className="p-5 flex justify-between items-start border-b border-border bg-bg-elevated/30">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">{shift.name} Shift</h2>
                  <p className="text-text-secondary text-sm">{shift.occupied} / {shift.capacity} seats occupied</p>
                </div>
                <div className="bg-bg-elevated p-4 rounded-lg border border-border p-3 flex items-center justify-between border-none bg-bg-base/50 mt-4">
                  <span className="text-xs text-text-secondary font-medium uppercase">Utilization</span>
                  <span className="text-sm font-bold text-text-primary ml-2">{utilPct}%</span>
                  <div className="h-1.5 w-24 bg-border rounded-full ml-auto">
                    <div className="h-full bg-primary rounded-full transition-all w-full" style={{ width: `${utilPct}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="relative h-12 bg-bg-elevated rounded-lg border border-border overflow-hidden">
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

                <div className="flex justify-between mt-2 px-1">
                  <span className="text-xs text-text-secondary font-medium tracking-wide uppercase">{fmtH(DAY_START_H)}</span>
                  <span className="text-xs text-text-secondary font-medium tracking-wide uppercase">{fmtH(Math.round((DAY_START_H + DAY_END_H) / 2))}</span>
                  <span className="text-xs text-text-secondary font-medium tracking-wide uppercase">{fmtH(DAY_END_H)}</span>
                </div>

                {shift.gaps.length === 0 ? (
                  <p className="text-text-secondary text-xs text-text-secondary font-medium tracking-wide uppercase">No gaps detected — fully utilized.</p>
                ) : (
                  <div className="space-y-3 mt-6">
                    {shift.gaps.map((g: GapBlock, i: number) => (
                      <div key={i} className="p-4 rounded-lg border border-border bg-bg-elevated flex justify-between items-center hover:border-warning/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit bg-warning/15 text-warning border border-warning/20">🕳️ Gap</span>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{fmtH(g.startH)} – {fmtH(g.endH)} · {g.seats} seats free</p>
                            <p className="text-xs text-danger mt-1">Est. revenue loss: ₹{g.revLoss}/day</p>
                          </div>
                        </div>
                        <button
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-xs"
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

