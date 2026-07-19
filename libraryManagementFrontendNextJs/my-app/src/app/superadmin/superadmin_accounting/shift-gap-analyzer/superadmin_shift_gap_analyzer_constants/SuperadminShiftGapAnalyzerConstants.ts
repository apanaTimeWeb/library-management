// RESPONSIBILITY: Renders or handles logic for SuperadminShiftGapAnalyzerConstants.ts.
import type { SuperadminShiftGap, SuperadminDayGap } from '@/app/superadmin/superadmin_accounting/shift-gap-analyzer/superadmin_shift_gap_analyzer_types/SuperadminShiftGapAnalyzerTypes';

export const SUPERADMIN_SHIFT_GAPS_MOCK: SuperadminShiftGap[] = [
  { shift: 'Morning (6AMâ€“2PM)',   totalSeats: 40, occupied: 34, vacant: 6,  occupancyPct: 85, avgGapDays: 12, revenueLoss: 3600  },
  { shift: 'Afternoon (2PMâ€“9PM)', totalSeats: 40, occupied: 28, vacant: 12, occupancyPct: 70, avgGapDays: 18, revenueLoss: 7200  },
  { shift: 'Night (9PMâ€“6AM)',     totalSeats: 30, occupied: 18, vacant: 12, occupancyPct: 60, avgGapDays: 24, revenueLoss: 8640  },
  { shift: '24-Hour',             totalSeats: 20, occupied: 19, vacant: 1,  occupancyPct: 95, avgGapDays: 5,  revenueLoss: 600   },
];

export const SUPERADMIN_DAY_GAPS_MOCK: SuperadminDayGap[] = [
  { date: '2026-04-10', shift: 'Afternoon', seatNo: 'B-11', gapDays: 22, loss: 1100 },
  { date: '2026-04-09', shift: 'Night',     seatNo: 'C-07', gapDays: 18, loss: 900  },
  { date: '2026-04-08', shift: 'Morning',   seatNo: 'A-04', gapDays: 14, loss: 700  },
  { date: '2026-04-07', shift: 'Night',     seatNo: 'C-12', gapDays: 30, loss: 1500 },
  { date: '2026-04-06', shift: 'Afternoon', seatNo: 'B-03', gapDays: 9,  loss: 450  },
];

