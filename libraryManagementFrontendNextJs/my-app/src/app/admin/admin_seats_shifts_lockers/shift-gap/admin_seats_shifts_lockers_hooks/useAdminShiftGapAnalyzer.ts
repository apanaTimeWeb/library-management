// RESPONSIBILITY: Renders the useAdminShiftGapAnalyzer.ts component/hook.
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { ADMIN_SEATS_MOCK_SHIFT_GAPS, ADMIN_SEATS_MOCK_VIEW_PERIODS } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_shifts_lockers_utils/AdminSeatsMockData';


export interface BookedBlock { startH: number; endH: number; label: string; }
export interface GapBlock    { startH: number; endH: number; seats: number; revLoss: number; }
export interface ShiftData   { id: string; name: string; occupied: number; capacity: number; booked: BookedBlock[]; gaps: GapBlock[]; }

export const DAY_START_H = 6;
export const DAY_END_H   = 23;
export const TOTAL_HOURS = DAY_END_H - DAY_START_H;

export function pct(h: number) { 
  return ((h - DAY_START_H) / TOTAL_HOURS) * 100; 
}

export function fmtH(h: number) {
  const suffix  = h >= 12 ? 'PM' : 'AM';
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display}:00 ${suffix}`;
}

export function useAdminShiftGapAnalyzer() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shifts, setShifts] = useState<ShiftData[]>(ADMIN_SEATS_MOCK_SHIFT_GAPS as ShiftData[]);
  const [shiftFilter, setShiftFilter] = useState('All');
  const [period, setPeriod] = useState('Today');

  const visible = useMemo(() => {
    return shiftFilter === 'All' ? shifts : shifts.filter(s => s.name === shiftFilter);
  }, [shiftFilter, shifts]);

  const handleQuickFill = (shiftName: string, startH: number, endH: number) => {
    toast.success(`Opening new admission pre-filled with ${shiftName} ${fmtH(startH)}–${fmtH(endH)} slot`);
  };

  return {
    shifts,
    shiftFilter,
    setShiftFilter,
    period,
    setPeriod,
    visible,
    handleQuickFill,
    ADMIN_SEATS_MOCK_SHIFT_GAPS,
    ADMIN_SEATS_MOCK_VIEW_PERIODS
  };
}
